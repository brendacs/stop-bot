const Discord = require('discord.js');
const commandFile = require('./commands/commands.js');
const fs = require('fs');

exports.run = (bot) => {
  const channel = new Discord.Channel();
  const richEmbed = new Discord.RichEmbed();
  const date = new Date().toString();
  let wordList = JSON.parse(fs.readFileSync('./data/wordList.json', 'utf8'));
  let fishList = JSON.parse(fs.readFileSync('./data/fishList.json', 'utf8'));

  const writeToFile = (file, script) => {
    fs.writeFile(file, JSON.stringify(script), (err) => {
      if (err) console.log(err);
    });
  }

  bot.on('message', (msg) => {
    string = msg.content;
    const thisGuild = msg.guild.id;
    const admin = msg.member.hasPermission('ADMINISTRATOR');
    const mod = msg.member.hasPermission('MANAGE_MESSAGES');

    // Initialize word lists for server
    if (!wordList[thisGuild]) {
      wordList[thisGuild] = {
        stopList: [],
        deleteList: []
      }
    }
    // Initialize fish inventory for user
    if (!fishList[msg.author.id]) {
      fishList[msg.author.id] = {
        fish: 0,
        cake: 0,
        fishPole: 0,
        tropical: 0,
        blowfish: 0,
        cuteWhale: 0,
        blueWhale: 0,
        dolphin: 0,
        octopus: 0,
        unicorn: 0
      }
    }

    let stoppedWords = wordList[thisGuild].stopList;
    let deletedWords = wordList[thisGuild].deleteList;

    if (msg.toString().substring(0, 1) === '!') {
      const args = msg.toString().substring(1).split(' ');
      const cmd = args[0];
      const subcmd = args[1];
      if (wordList[thisGuild]) {
        commandFile.run(msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, fishList, bot, date, richEmbed);
        writeToFile('./data/wordList.json', wordList);
        writeToFile('./data/fishList.json', fishList);
      }
    } else if (msg.mentions.users.has('340404757648769025')) {
      const args = msg.toString().split(' ');
      const cmd = args[1];
      const subcmd = args[2];
      if (wordList[thisGuild]) {
        commandFile.run(msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, fishList, bot, date, richEmbed);
        writeToFile('./data/wordList.json', wordList);
        writeToFile('./data/fishList.json', fishList);
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
