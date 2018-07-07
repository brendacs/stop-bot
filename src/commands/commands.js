import helpCmd from './help/help';
import getInfo from './info';
import getUpdates from './updates';
import stopCmd from './stop';
import deleteCmd from './delete';
import goCmd from './go/go';
import setInit from './set/set';
import resetCmd from './reset';
import { isOnStopList, isOnDeleteList } from '../utils/checkLists';

const commands = (bot, msg, cmd, subcmd, thirdcmd, thisGuild, stopList, deleteList) => {
  let isStopped = isOnStopList(stopList, subcmd);
  let isDeleted = isOnDeleteList(deleteList, subcmd);

  if (cmd === 'help' || cmd === 'dmhelp') helpCmd(msg, cmd);
  else if (cmd === 'info') getInfo(bot, msg, cmd);
  else if (cmd === 'updates') getUpdates(msg, cmd);
  else if (cmd === 'stop') stopCmd(msg, cmd, subcmd, thisGuild, stopList, deleteList, isStopped, isDeleted);
  else if (cmd === 'delete') deleteCmd(msg, cmd, subcmd, thirdcmd, thisGuild, stopList, deleteList, isStopped, isDeleted);
  else if (cmd === 'go')  goCmd(msg, cmd, subcmd, thisGuild, stopList, deleteList, isStopped, isDeleted);
  else if (cmd === 'set') setInit(msg, cmd, subcmd, thirdcmd, thisGuild);
  else if (cmd === 'reset') resetCmd(msg, cmd, subcmd, thirdcmd, thisGuild);
}

export default commands;
