'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpList = require('./helpList.js');

var _helpList2 = _interopRequireDefault(_helpList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const helpCmd = (msg, cmd, richEmbed) => {
  const embed = richEmbed.setColor('#ff0000').setDescription(`${_helpList2.default.headings.general} ${_helpList2.default.commands.general}
${_helpList2.default.headings.stop} ${_helpList2.default.commands.stop}
${_helpList2.default.headings.delete} ${_helpList2.default.commands.delete}
${_helpList2.default.headings.go} ${_helpList2.default.commands.go}
For more information, visit the [Stop Bot GitHub](https://github.com/brendacs/stop-bot).
To give feedback and contribute, join the [Stop Discord Server](https://discord.gg/HwkMkKh).`);

  if (cmd === 'help') {
    msg.channel.send({ embed });
  } else {
    return;
  }
};

exports.default = helpCmd;