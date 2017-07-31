const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const commandFile = require('./commands/commands.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const TOKEN = auth.token;

const bot = new Discord.Client({
  token: TOKEN,
  autorun: true
});

const channel = new Discord.Channel();
const richEmbed = new Discord.RichEmbed();

bot.on('ready', (evt) => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.user.username + ' - ' + bot.user.id);
});

const date = new Date().toString();
let stoppedWords = new Array();
let deletedWords = new Array();

bot.on('message', (msg) => {
  string = msg.content

  if (msg.toString().substring(0, 1) === '!') {
    const args = msg.toString().substring(1).split(' ');
    const cmd = args[0];
    const subcmd = args[1];
    const admin = msg.member.hasPermission('ADMINISTRATOR');
    let stopWord = stoppedWords.indexOf(subcmd);
    let deleteWord = deletedWords.indexOf(subcmd);

    try {
      commandFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords, bot, date, richEmbed);
    } catch(err) {
      console.log(err);
    }

  } else {
    if (msg.author.bot) return;
    else {
      for (let i = 0; i <= stoppedWords.length; i++) {
        if (string.toString().toLowerCase().indexOf(stoppedWords[i]) !== -1) {
          msg.channel.send(date);
          msg.reply('IT\'S TIME TO STOP.');
        }
      }
      for (let i = 0; i <= deletedWords.length; i++) {
        if (string.toString().toLowerCase().indexOf(deletedWords[i]) !== -1) {
          msg.delete(1000);
          msg.channel.send('Detected something horrible. Deleted.');
        }
      }

    }
  }
});

bot.login(TOKEN);
