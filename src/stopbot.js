import Discord from 'discord.js';
import logger from 'winston';
import request from 'superagent';
import auth from '../auth.json';
import messageHandler from './messageHandler.js';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const TOKEN = auth.token;
const DBOT_TOKEN = auth.dbot_token;

const bot = new Discord.Client({
  token: TOKEN,
  autorun: true
});

bot.on('ready', (evt) => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.user.username + ' - ' + bot.user.id);

  // Server count for discord bot list
  request.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
    .set('Authorization', DBOT_TOKEN)
    .send({server_count: bot.guilds.size})
    .end(err => {
      if (err) return console.error(err);
      console.log("Success!");
    });

  bot.user.setPresence({status: 'online', game: {name: '!go fish | !help'}});
});

messageHandler(bot);

bot.login(TOKEN);