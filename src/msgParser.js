import commands from './commands/commands.js';

const getPrefix = (bot, stopClient, msg, admin, mod, thisGuild, stopList, deleteList) => {
  const prefixQuery = `SELECT prefix FROM server_settings WHERE serverid='${msg.guild.id}'`;
  stopClient.query(prefixQuery)
    .then(result => {
      const defaultPrefix = '!';
      let prefix = result.rows[0]['prefix'] !== '' ? result.rows[0]['prefix'] : defaultPrefix;
      msgParser(bot, stopClient, msg, admin, mod, thisGuild, stopList, deleteList, prefix);
    })
    .catch(err => console.log(err));
}

const msgParser = (bot, stopClient, msg, admin, mod, thisGuild, stopList, deleteList, prefix) => {
  const cmds = ['help', 'info', 'updates', 'stop', 'delete', 'go', 'set'];

  let args, cmd, subcmd, thirdcmd;

  if (msg.toString().substring(0, 1) === prefix) { // if prefix is used
    args = msg.toString().substring(1).split(' ');
    cmd = args[0];
    subcmd = (cmd === 'stop' || cmd === 'delete') ? [...args].slice(1).join(', ') : args[1];
    thirdcmd = args[2];
  } else if (msg.mentions.users.has(bot.user.id)) { // if bot is mentioned
    args = msg.toString().split(' ');
    cmd = args[1];
    subcmd = (cmd === 'stop' || cmd === 'delete') ? [...args].slice(2).join(', ') : args[2];
    thirdcmd = args[3];
  }

  if (cmd !== undefined && stopList && deleteList && cmds.indexOf(cmd) !== -1) {
    commands(bot, stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, stopList, deleteList);
  } else {
    // check messages beginning with exclamation marks and are not commands
    checkMessage(msg, stopList, deleteList);
  }
}

const checkMessage = (msg, stopList, deleteList) => {
  const string = msg.content;
  for (let i = 0; i < stopList.length; i++) {
    if (string.toString().toLowerCase().indexOf(stopList[i]) !== -1) {
      msg.channel.send(new Date().toString());
      msg.reply('IT\'S TIME TO STOP.');
      return; // prevents bot from sending multiple messages if multiple words in one msg
    }
  }
  for (let i = 0; i < deleteList.length; i++) {
    if (string.toString().toLowerCase().indexOf(deleteList[i]) !== -1) {
      msg.delete(1000);
      msg.channel.send('Detected something horrible. Deleted.');
      return;
    }
  }
}

export default getPrefix;
