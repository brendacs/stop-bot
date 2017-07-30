exports.run = (msg, cmd, subcmd, stoppedWords, deletedWords, date) => {
  const admin = msg.member.hasPermission('ADMINISTRATOR');
  let stopWord = stoppedWords.indexOf(subcmd);
  let deleteWord = deletedWords.indexOf(subcmd);
  if (cmd === 'stop') {
    if (!subcmd) {
      msg.channel.send(date);
      msg.channel.send('IT\'S TIME TO STOP.');
    } else if (subcmd === 'video') {
      msg.channel.send('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
    } else if (subcmd === 'list') {
      msg.channel.send('These words are currently being stopped: `' + stoppedWords.join(', ') + '`');
    } else if (typeof subcmd !== 'undefined') {
      if (admin) {
        if (stopWord !== -1) {
          msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to stop.');
        } else if (deleteWord !== -1) {
          msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to delete.');
        } else {
          stoppedWords.push(subcmd.toLowerCase());
          msg.channel.send('`' + subcmd + '`' + ' will now be stopped.');
        }
      } else if (!admin) {
        msg.reply('you can\'t use this command.');
      }
    } else return;
  } else if (cmd === 'go') {
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
  } else if (cmd === 'delete') {
    if (!admin) {
      msg.reply('you can\'t use this command.');
    } else if (subcmd === 'list') {
      msg.channel.send('These words are currently being deleted: `' + deletedWords.join(', ') + '`')
    } else if (admin && typeof subcmd !== 'undefined') {
      if (deleteWord !== -1) {
        msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to delete.');
      } else if (stopWord !== -1) {
        msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to stop.');
      } else {
        deletedWords.push(subcmd.toLowerCase());
        msg.channel.send('`' + subcmd + '`' + ' will be deleted every time it appears.');
      }
    } else {
      msg.reply('what do you want to delete?');
    }
  } else {
    return;
  }
}
