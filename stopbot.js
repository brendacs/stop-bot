const Discord = require('discord.js');
const logger = require('winston');
const request = require('superagent');
const auth = require('./auth.json');
const commandFile = require('./commands/commands.js');
const fs = require('fs');

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

const channel = new Discord.Channel();
const richEmbed = new Discord.RichEmbed();
const guild = new Discord.Guild();
const thisGuild = guild.id;

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

const date = new Date().toString();
let wordList = JSON.parse(fs.readFileSync('./data/wordList.json', 'utf8'));

bot.on('message', (msg) => {
  string = msg.content;
  const thisGuild = msg.guild.id;

  if (!wordList[thisGuild]) {
    wordList[thisGuild] = {
      stopList: [],
      deleteList: []
    }
  }

  let stoppedWords = wordList[thisGuild].stopList;
  let deletedWords = wordList[thisGuild].deleteList;

  if (msg.toString().substring(0, 1) === '!') {
    const args = msg.toString().substring(1).split(' ');
    const cmd = args[0];
    const subcmd = args[1];
    const admin = msg.member.hasPermission('ADMINISTRATOR');
    const mod = msg.member.hasPermission('MANAGE_MESSAGES');

    if (wordList[thisGuild]) {
      commandFile.run(msg, cmd, subcmd, admin, thisGuild, stoppedWords, deletedWords, bot, date, richEmbed);
      fs.writeFile('./data/wordList.json', JSON.stringify(wordList), (err) => {
        if (err) console.log(err);
      });
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
