exports.run = (msg, cmd, subcmd, admin, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, bot, date) => {
  if (cmd === 'stop') {
    if (!subcmd) {
      msg.channel.send(date);
      msg.channel.send('IT\'S TIME TO STOP.');
    } else if (subcmd === 'video') {
      msg.channel.send('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
    } else if (subcmd === 'list') {
      if (stoppedWords !== 0) {
        msg.channel.send('These words are currently being stopped: `' + stoppedWords.join(', ') + '`');
      } else {
        msg.channel.send('There are no words on the stop list.');
      }
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
  }
}
