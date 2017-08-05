'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commands = require('./commands/commands.js');

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messageHandler = bot => {
  const channel = new _discord2.default.Channel();
  const richEmbed = new _discord2.default.RichEmbed();

  let wordList = JSON.parse(_fs2.default.readFileSync('./data/wordList.json', 'utf8'));
  let fishList = JSON.parse(_fs2.default.readFileSync('./data/fishList.json', 'utf8'));

  const writeToFile = (file, script) => {
    _fs2.default.writeFile(file, JSON.stringify(script), err => {
      if (err) console.log(err);
    });
  };

  bot.on('message', msg => {
    const string = msg.content;
    const thisGuild = msg.guild.id;
    const admin = msg.member.hasPermission('ADMINISTRATOR');
    const mod = msg.member.hasPermission('MANAGE_MESSAGES');

    // Initialize word lists for server
    if (!wordList[thisGuild]) {
      wordList[thisGuild] = {
        stopList: [],
        deleteList: []
      };
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
      };
    }

    let stoppedWords = wordList[thisGuild].stopList;
    let deletedWords = wordList[thisGuild].deleteList;

    if (msg.toString().substring(0, 1) === '!') {
      const args = msg.toString().substring(1).split(' ');
      const cmd = args[0];
      const subcmd = args[1];
      if (wordList[thisGuild]) {
        (0, _commands2.default)(bot, msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, wordList, fishList);
        writeToFile('./data/wordList.json', wordList);
        writeToFile('./data/fishList.json', fishList);
      }
    } else if (msg.mentions.users.has('340404757648769025')) {
      const args = msg.toString().split(' ');
      const cmd = args[1];
      const subcmd = args[2];
      if (wordList[thisGuild]) {
        (0, _commands2.default)(bot, msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, wordList, fishList);
        writeToFile('./data/wordList.json', wordList);
        writeToFile('./data/fishList.json', fishList);
      }
    } else {
      if (msg.author.bot) return;else {
        for (let i = 0; i <= stoppedWords.length; i++) {
          if (string.toString().toLowerCase().indexOf(stoppedWords[i]) !== -1) {
            msg.channel.send(new Date().toString());
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
};

exports.default = messageHandler;