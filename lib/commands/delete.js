'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const deleteCmd = (msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord) => {
  if (cmd === 'delete') {
    if (subcmd === 'list') {
      if (deletedWords.length !== 0) {
        msg.channel.send('These words are currently being deleted: `' + deletedWords.join(', ') + '`');
      } else {
        msg.channel.send('There are no words on the delete list.');
      }
    } else if (!isNaN(subcmd)) {
      let limit = parseInt(subcmd) + 1;
      msg.channel.fetchMessages({ limit: limit }).then(latestMessages => {
        msg.channel.bulkDelete(latestMessages);
      });
    } else if (subcmd && isNaN(subcmd)) {
      if (admin) {
        if (deleteWord !== -1) {
          msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to delete.');
        } else if (stopWord !== -1) {
          msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to stop.');
        } else {
          deletedWords.push(subcmd.toLowerCase());
          msg.channel.send('`' + subcmd + '`' + ' will be deleted every time it appears.');
        }
      } else if (!admin) {
        msg.reply('you can\'t use this command.');
      }
    } else {
      return;
    }
  }
};

exports.default = deleteCmd;