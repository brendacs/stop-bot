'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _goFish = require('./goFish.js');

var _goFish2 = _interopRequireDefault(_goFish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const goCmd = (msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, fishList, richEmbed) => {
  if (cmd === 'go') {
    if (subcmd === 'fish' || subcmd === 'inv') {
      (0, _goFish2.default)(msg, cmd, subcmd, fishList, richEmbed);
    } else if (!admin && subcmd !== 'fish' && subcmd !== 'inv') {
      msg.reply('you can\'t use this command.');
    } else if (admin && typeof subcmd !== 'undefined') {
      if (stopWord !== -1) {
        stoppedWords.splice(stopWord, 1);
        msg.channel.send('`' + subcmd + '`' + ' will no longer be stopped.');
      } else if (deleteWord !== -1) {
        deletedWords.splice(deleteWord, 1);
        msg.channel.send('`' + subcmd + '`' + ' will no longer be deleted.');
      } else {
        msg.channel.send('`' + subcmd + '`' + ' was not on the list of stopped or deleted words.');
      }
    } else {
      msg.reply('what do you want to unstop?');
    }
  }
};

exports.default = goCmd;