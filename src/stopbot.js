import Discord from 'discord.js';
import logger from 'winston';
import request from 'superagent';
import auth from '../auth.json';
import messageHandler from './messageHandler.js';
import express from 'express'
import pg from 'pg'
import format from 'pg-format'

const app = express()
const PGUSER = 'brendazhang'
const PGDATABASE = 'stopbot_db'
const emptyList = '{}'

const config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

const pool = new pg.Pool(config);
let stopClient;

pool.connect(function (err, client, done) {
  if (err) console.log(err);
  app.listen(5432, function () {
    console.log('listening on 5432')
  });
  stopClient = client
  
  // trial query
  const emptyStopListQuery = format('SELECT * from word_lists WHERE stoplist = %L', emptyList)
  stopClient.query(emptyStopListQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result.rows[0])
  });
})

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const TOKEN = auth.token;
const DBOT_TOKEN = auth.dbot_token;
const PWBOT_TOKEN = auth.pwbot_token;

const bot = new Discord.Client({
  token: TOKEN,
  autorun: true
});

bot.on('ready', (evt) => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.user.username + ' - ' + bot.user.id);

  // Server count for discord bot lists
  request.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
    .set('Authorization', DBOT_TOKEN)
    .send({server_count: bot.guilds.size})
    .end(err => {
      if (err) return console.error(err);
      console.log("Success (dbot)!");
    });

  request.post(`https://bots.discord.pw/api/bots/${bot.user.id}/stats`)
    .set('Authorization', PWBOT_TOKEN)
    .send({server_count: bot.guilds.size})
    .end(err => {
      if (err) return console.error(err);
      console.log("Success (pwbot)!");
    });

  bot.user.setPresence({status: 'online', game: {name: '!go fish | !help'}});
});

messageHandler(bot);

bot.login(TOKEN);
