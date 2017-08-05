'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _help = require('./help/help.js');

var _help2 = _interopRequireDefault(_help);

var _info = require('./info.js');

var _info2 = _interopRequireDefault(_info);

var _stop = require('./stop.js');

var _stop2 = _interopRequireDefault(_stop);

var _delete = require('./delete.js');

var _delete2 = _interopRequireDefault(_delete);

var _go = require('./go/go.js');

var _go2 = _interopRequireDefault(_go);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commands = (bot, msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, wordList, fishList) => {
  const richEmbed = new _discord2.default.RichEmbed();

  const stopWord = stoppedWords.indexOf(subcmd);
  const deleteWord = deletedWords.indexOf(subcmd);

  (0, _help2.default)(msg, cmd, richEmbed);
  (0, _info2.default)(bot, msg, cmd, richEmbed);
  (0, _stop2.default)(msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord);
  (0, _delete2.default)(msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord);
  (0, _go2.default)(msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, fishList, richEmbed);
};

exports.default = commands;