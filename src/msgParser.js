import {cmds} from './constants';
import commands from './commands/commands';
import {
  getPrefix,
  getStopMessage,
  getDeleteMessage
} from './utils/settings';

const msgParser = (bot, msg, stopList, deleteList) => {
  let args, cmd, subcmd, thirdcmd;
  let mentionsNum = msg.mentions.users.array().length;

  getPrefix(msg).then(prefix => {
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
      commands(bot, msg, cmd, subcmd, thirdcmd, stopList, deleteList);
    } else {
      // check messages beginning with exclamation marks and are not commands
      checkMessage(msg, stopList, deleteList);
    }
  });
};

const checkMessage = (msg, stopList, deleteList) => {
  const string = msg.content;
  for (let i = 0; i < stopList.length; i++) {
    if (string.toString().toLowerCase().indexOf(stopList[i]) !== -1) {
      getStopMessage(msg).then(stopMessage => {
        msg.reply(stopMessage);
      });
      return; // prevents sending multiple warnings if multiple words in one msg
    }
  }
  for (let i = 0; i < deleteList.length; i++) {
    if (string.toString().toLowerCase().indexOf(deleteList[i]) !== -1) {
      getDeleteMessage(msg).then(deleteMessage => {
        msg.delete();
        msg.reply(deleteMessage);
      });
      return;
    }
  }
};

export default msgParser;
