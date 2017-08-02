const Discord = require('discord.js');
const logger = require('winston');
const request = require('superagent');
const auth = require('./auth.json');
const messageHandler = require('./messageHandler.js')

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
});

messageHandler.run(bot);

bot.login(TOKEN);
