'use strict';

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _auth = require('../auth.json');

var _auth2 = _interopRequireDefault(_auth);

var _messageHandler = require('./messageHandler.js');

var _messageHandler2 = _interopRequireDefault(_messageHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configure logger settings
_winston2.default.remove(_winston2.default.transports.Console);
_winston2.default.add(_winston2.default.transports.Console, {
  colorize: true
});
_winston2.default.level = 'debug';

const TOKEN = _auth2.default.token;
const DBOT_TOKEN = _auth2.default.dbot_token;
const PWBOT_TOKEN = _auth2.default.pwbot_token;

const bot = new _discord2.default.Client({
  token: TOKEN,
  autorun: true
});

bot.on('ready', evt => {
  _winston2.default.info('Connected');
  _winston2.default.info('Logged in as: ');
  _winston2.default.info(bot.user.username + ' - ' + bot.user.id);

  // Server count for discord bot lists
  _superagent2.default.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`).set('Authorization', DBOT_TOKEN).send({ server_count: bot.guilds.size }).end(err => {
    if (err) return console.error(err);
    console.log("Success (dbot)!");
  });

  _superagent2.default.post(`https://bots.discord.pw/api/bots/${bot.user.id}/stats`).set('Authorization', PWBOT_TOKEN).send({ server_count: bot.guilds.size }).end(err => {
    if (err) return console.error(err);
    console.log("Success (pwbot)!");
  });

  bot.user.setPresence({ status: 'online', game: { name: '!go fish | !help' } });
});

(0, _messageHandler2.default)(bot);

bot.login(TOKEN);