exports.run = (msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords) => {
  if (cmd === 'go') {
    if (!admin) {
      msg.reply('you can\'t use this command.');
    } else if (admin && typeof subcmd !== 'undefined') {
      if (stopWord !== -1 || deleteWord !== -1) {
        stoppedWords.splice(stopWord, 1);
        deletedWords.splice(deleteWord, 1);
        msg.channel.send('`' + subcmd + '`' + ' will no longer be stopped or deleted.');
      } else {
        msg.channel.send('`' + subcmd + '`' + ' was not on the list of stopped or deleted words.');
      }
    } else {
      msg.reply('what do you want to unstop?');
    }
  }
}
