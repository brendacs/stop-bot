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
  const date = new Date().toString();
  let admin = msg.member.hasPermission('ADMINISTRATOR')

  if (msg.toString().substring(0, 1) === '!') {
    const args = msg.toString().substring(1).split(' ');
    const cmd = args[0];
    const subcmd = args[1];
    if (cmd === 'stop') {
      msg.channel.send(date);
      msg.channel.send('IT\'S TIME TO STOP.');
      if (subcmd === 'video') {
        msg.channel.send('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
      } else if (typeof subcmd !== 'undefined') {
        msg.channel.send('`' + subcmd + '`' + 'will now be stopped.')
      } else {
        return;
      }
    } else if (cmd === 'go') {
      if (!admin) {
        msg.reply('you can\'t use this command.');
      } else if (admin && typeof subcmd !== 'undefined') {
        msg.channel.send('`' + subcmd + '`' + ' will no longer be stopped.');
      } else {
        msg.reply('what do you want to unstop?');
      }
    } else {
      return;
    }
  } else if (string.toLowerCase().indexOf('kek') !== -1 || string.toLowerCase().indexOf('kèk') !== -1) {
    msg.channel.send(date);
    msg.reply('IT\'S TIME TO STOP.');
  } else {
    return;
  }
});

bot.login(TOKEN);
