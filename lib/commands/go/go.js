'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _goFish = require('./goFish.js');

var _goFish2 = _interopRequireDefault(_goFish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let nextAllowedCapture = 0;

const goCmd = (msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, fishList, richEmbed) => {
  const coolDownMinutes = 3;
  const coolDownSeconds = coolDownMinutes * 60;
  const coolDownMs = coolDownSeconds * 1000;

  if (cmd === 'go') {
    if (subcmd === 'fish' || subcmd === 'inv') {
      let now = Date.now();
      if (nextAllowedCapture <= now) {
        (0, _goFish2.default)(msg, cmd, subcmd, fishList, richEmbed);
        nextAllowedCapture = msg.createdTimestamp + coolDownMs;
      } else {
        msg.channel.send('Your fishing rod is broken. It will require ' + Math.floor((nextAllowedCapture - Date.now()) / 1000) + ' more seconds to repair.');
      }
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