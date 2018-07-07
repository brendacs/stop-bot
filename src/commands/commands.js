import helpCmd from './help/help';
import getInfo from './info';
import getUpdates from './updates';
import stopCmd from './stop';
import deleteCmd from './delete';
import goCmd from './go/go';
import setInit from './set/set';
import resetCmd from './reset';

const commands = (bot, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, stopList, deleteList) => {
  let isStopped;
  let isDeleted;

  if (stopList.indexOf(subcmd) !== -1) {
    isStopped = true;
  } else {
    isStopped = false;
  }

  if (deleteList.indexOf(subcmd) !== -1) {
    isDeleted = true;
  } else {
    isDeleted = false;
  }

  if (cmd === 'help' || cmd === 'dmhelp') helpCmd(msg, cmd);
  else if (cmd === 'info') getInfo(bot, msg, cmd);
  else if (cmd === 'updates') getUpdates(msg, cmd);
  else if (cmd === 'stop') stopCmd(msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted);
  else if (cmd === 'delete') deleteCmd(msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted);
  else if (cmd === 'go')  goCmd(msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted);
  else if (cmd === 'set') setInit(msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild);
  else if (cmd === 'reset') resetCmd(msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild);
}

export default commands;
