'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _goFish = require('./goFish.js');

var _goFish2 = _interopRequireDefault(_goFish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let nextAllowedFishCapture = 0;
let nextAllowedInvOpen = 0;
let allowedFishTimes = {};
let allowedInvTimes = {};

const goCmd = (msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, fishList, richEmbed) => {
  const coolDownMinutesFish = 3 * 60 * 1000;
  const coolDownMinutesInv = 0.25 * 60 * 1000;

  if (cmd === 'go') {
    if (subcmd === 'fish') {
      if (!allowedFishTimes[msg.author.id] || allowedFishTimes[msg.author.id] <= Date.now()) {
        (0, _goFish2.default)(msg, cmd, subcmd, fishList, richEmbed);
        nextAllowedFishCapture = msg.createdTimestamp + coolDownMinutesFish;
        allowedFishTimes[msg.author.id] = nextAllowedFishCapture;
      } else {
        msg.channel.send('Your fishing rod is broken. It will require ' + Math.floor((allowedFishTimes[msg.author.id] - Date.now()) / 1000) + ' more seconds to repair.');
      }
    } else if (subcmd === 'inv') {
      if (!allowedInvTimes[msg.author.id] || allowedInvTimes[msg.author.id] <= Date.now()) {
        (0, _goFish2.default)(msg, cmd, subcmd, fishList, richEmbed);
        nextAllowedInvOpen = msg.createdTimestamp + coolDownMinutesInv;
        allowedInvTimes[msg.author.id] = nextAllowedInvOpen;
      } else {
        msg.channel.send('Your inventory is heavy. You will require ' + Math.floor((allowedInvTimes[msg.author.id] - Date.now()) / 1000) + ' more seconds to rest.');
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