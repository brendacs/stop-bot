const stopCmd = (stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted) => {
  if (!subcmd) {
    msg.channel.send(new Date().toString());
    msg.channel.send('IT\'S TIME TO STOP.');
  } else if (subcmd === 'video') {
    msg.channel.send('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
  } else if (subcmd === 'list') {
    if (stopList.length !== 0) {
      msg.channel.send('These words are currently being stopped: `' + stopList.join(', ') + '`');
    } else {
      msg.channel.send('There are no words on the stop list.');
    }
  } else if (typeof subcmd !== 'undefined') {
    if (admin) {
      if (isStopped) {
        msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to stop.');
      } else if (isDeleted) {
        msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to delete.');
      } else {
        stopClient.query(`UPDATE word_lists SET stoplist = stoplist || '{${subcmd.toLowerCase()}}' WHERE serverid=${thisGuild}`);
        msg.channel.send('`' + subcmd + '`' + ' will now be stopped.');
      }
    } else if (!admin) {
      msg.reply('you can\'t use this command.');
    }
  } else return;
}

export default stopCmd;
