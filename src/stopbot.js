import Discord from 'discord.js';
import logger from 'winston';
import request from 'superagent';
import auth from '../auth.json';
import messageHandler from './messageHandler';
import express from 'express';
import { stopClient } from './constants';

const app = express();

stopClient.connect()
  .then(client => {
    console.log('Connected to DB')
  })
  .catch(err => {
    console.log('Error connecting: ', err.message, err.stack)
  });

app.listen(5430, () => {
  console.log('Server started');
});

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const TOKEN = auth.testing_token;
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

  bot.user.setPresence({status: 'online', game: {name: `!help | ${bot.guilds.size} servers`, type: 0}});
});

messageHandler(bot);

bot.login(TOKEN);
