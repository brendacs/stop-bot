import commands from './commands/commands.js';

const msgParser = (bot, stopClient, msg, admin, mod, thisGuild, stopList, deleteList) => {
  const string = msg.content;
  const cmds = ['help', 'info', 'stop', 'delete', 'go'];

  const checkMessage = () => {
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

  if (msg.toString().substring(0, 1) === 't') { // if prefix is used
    const args = msg.toString().substring(1).split(' ');
    const cmd = args[0];
    const subcmd = args[1];
    if (stopList && deleteList && cmds.indexOf(cmd) !== -1) {
      commands(bot, stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList);
    } else {
      // check messages beginning with exclamation marks and are not commands
      checkMessage();
    }
  } else if (msg.mentions.users.has('340404757648769025')) { // if bot is mentioned
    const args = msg.toString().split(' ');
    const cmd = args[1];
    const subcmd = args[2];
    if (stopList && deleteList && cmds.indexOf(cmd) !== -1) {
      commands(bot, stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList);
    }
  } else {
    checkMessage();
  }
}

export default msgParser
