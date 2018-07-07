import Discord from 'discord.js';
import helpCmd from './help/help';
import getInfo from './info';
import getUpdates from './updates';
import stopCmd from './stop';
import deleteCmd from './delete';
import goCmd from './go/go';
import setInit from './set/set';
import resetCmd from './reset';

const commands = (bot, stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, stopList, deleteList) => {
  const richEmbed = new Discord.RichEmbed();

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

  if (cmd === 'help' || cmd === 'dmhelp') helpCmd(msg, cmd, richEmbed);
  else if (cmd === 'info') getInfo(bot, msg, cmd, richEmbed);
  else if (cmd === 'updates') getUpdates(bot, msg, cmd, richEmbed);
  else if (cmd === 'stop') stopCmd(stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted, richEmbed);
  else if (cmd === 'delete') deleteCmd(stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted, richEmbed);
  else if (cmd === 'go')  goCmd(stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted, richEmbed);
  else if (cmd === 'set') setInit(stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, richEmbed);
  else if (cmd === 'reset') resetCmd(stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, richEmbed);
}

export default commands;
