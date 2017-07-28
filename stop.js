const Discord = require('discord.js');
const logger = require('winston');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const TOKEN = 'MzQwNDA0NzU3NjQ4NzY5MDI1.DFyCKA.VYBbTMSAb0Ee1qB9Cg_WjBPk15g';

const bot = new Discord.Client({
  token: TOKEN,
  autorun: true
});

const channel = new Discord.Channel();

bot.on('ready', (evt) => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.user.username + ' - ' + bot.user.id);
});

bot.on('message', (msg) => {
  string = msg.content
  if (string.toLowerCase().indexOf('kek') !== -1 || string.toLowerCase().indexOf('kèk') !== -1) {
    const date = new Date().toString();
    msg.channel.send(date);
    msg.reply('IT\'S TIME TO STOP.');
    msg.channel.send('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
  } else {
    return;
  }
});

bot.login(TOKEN);
