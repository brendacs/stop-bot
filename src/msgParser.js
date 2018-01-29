import commands from './commands/commands.js';
import {
  getPrefix,
  getStopMessage,
  getDeleteMessage
} from './getSettings.js';

const msgParser = (bot, stopClient, msg, admin, mod, thisGuild, stopList, deleteList) => {
  const cmds = ['help', 'info', 'updates', 'stop', 'delete', 'go', 'set'];

  let args, cmd, subcmd, thirdcmd;

  let mentions = msg.mentions.users;
  let mentionsNum = msg.mentions.users.array().length;

  getPrefix(stopClient, msg).then(prefix => {
    if (msg.toString().substring(0, 1) === prefix) { // if prefix is used
      args = msg.toString().substring(1).split(' ');
      cmd = args[0];
      // only join into strings to be added to lists if command is "stop" or "delete", and does not mention a user
      subcmd = ((cmd === 'stop' || cmd === 'delete') && mentionsNum === 0) ? [...args].slice(1).join(', ') : args[1];
      thirdcmd = [...args].slice(2).join(' ');
    } else if (msg.mentions.users.has(bot.user.id)) { // if bot is mentioned
      args = msg.toString().split(' ').join(' ');
      cmd = args[1];
      // only join into strings to be added to lists if command is "stop" or "delete", and does not mention a user
      subcmd = ((cmd === 'stop' || cmd === 'delete') && mentionsNum === 0) ? [...args].slice(2).join(', ') : args[2];
      thirdcmd = [...args].slice(3).join(' ');
    }

    if (cmd !== undefined && stopList && deleteList && cmds.indexOf(cmd) !== -1) {
      commands(bot, stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, stopList, deleteList);
    } else {
      // check messages beginning with exclamation marks and are not commands
      checkMessage(stopClient, msg, stopList, deleteList);
    }
  });
}

const checkMessage = (stopClient, msg, stopList, deleteList) => {
  const string = msg.content;
  for (let i = 0; i < stopList.length; i++) {
    if (string.toString().toLowerCase().indexOf(stopList[i]) !== -1) {
      getStopMessage(stopClient, msg).then(stopMessage => {
        msg.reply(stopMessage);
        return; // prevents bot from sending multiple messages if multiple words in one msg
      });
    }
  }
  for (let i = 0; i < deleteList.length; i++) {
    if (string.toString().toLowerCase().indexOf(deleteList[i]) !== -1) {
      getDeleteMessage(stopClient, msg).then(deleteMessage => {
        msg.delete();
        msg.reply(deleteMessage);
        return;
      });
    }
  }
}

export default msgParser;
