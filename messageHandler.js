const Discord = require('discord.js');
const commandFile = require('./commands/commands.js');
const fs = require('fs');

exports.run = (bot) => {
  const channel = new Discord.Channel();
  const richEmbed = new Discord.RichEmbed();
  const date = new Date().toString();
  let wordList = JSON.parse(fs.readFileSync('./data/wordList.json', 'utf8'));

  const writeToFile = () => {
    fs.writeFile('./data/wordList.json', JSON.stringify(wordList), (err) => {
      if (err) console.log(err);
    });
  }

  bot.on('message', (msg) => {
    string = msg.content;
    const thisGuild = msg.guild.id;
    const admin = msg.member.hasPermission('ADMINISTRATOR');
    const mod = msg.member.hasPermission('MANAGE_MESSAGES');

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
      if (wordList[thisGuild]) {
        commandFile.run(msg, cmd, subcmd, admin, thisGuild, stoppedWords, deletedWords, bot, date, richEmbed);
        writeToFile();
      }
    } else if (msg.mentions.users.has('340404757648769025')) {
      const args = msg.toString().split(' ');
      const cmd = args[1];
      const subcmd = args[2];
      if (wordList[thisGuild]) {
        commandFile.run(msg, cmd, subcmd, admin, thisGuild, stoppedWords, deletedWords, bot, date, richEmbed);
        writeToFile();
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
}
