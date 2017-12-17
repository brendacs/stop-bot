const deleteCmd = (stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted) => {
  if (subcmd === 'list') {
    if (deleteList.length !== 0) {
      msg.channel.send('These words are currently being deleted: `' + deleteList.join(', ') + '`')
    } else {
      msg.channel.send('There are no words on the delete list.')
    }
  } else if (!isNaN(subcmd)) {
    let limit = parseInt(subcmd) + 1;
    msg.channel.fetchMessages({limit: limit})
      .then((latestMessages) => {
        msg.channel.bulkDelete(latestMessages);
      })
      .catch(err => console.log(err));
  } else if (subcmd && isNaN(subcmd)) {
    if (admin) {
      if (isDeleted) {
        msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to delete.');
      } else if (isStopped) {
        msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to stop.');
      } else {
        stopClient.query(`UPDATE word_lists SET deletelist = deletelist || '{${subcmd.toLowerCase()}}' WHERE serverid=${thisGuild}`);
        msg.channel.send('`' + subcmd + '`' + ' will be deleted every time it appears.');
      }
    } else if (!admin) {
      msg.reply('you can\'t use this command.');
    }
  } else {
    return;
  }
}

export default deleteCmd;
