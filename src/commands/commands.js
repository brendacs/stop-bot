import Discord from 'discord.js';
import helpCmd from './help/help.js';
import getInfo from './info.js';
import getUpdates from './updates.js';
import stopCmd from './stop.js';
import deleteCmd from './delete.js';
import goCmd from './go/go.js';
import setInit from './set/set.js';

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

  if (cmd === 'help') helpCmd(msg, cmd, richEmbed);
  else if (cmd === 'info') getInfo(bot, msg, cmd, richEmbed);
  else if (cmd === 'updates') getUpdates(bot, msg, cmd, richEmbed);
  else if (cmd === 'stop') stopCmd(stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted);
  else if (cmd === 'delete') deleteCmd(stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted);
  else if (cmd === 'go')  goCmd(stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted, richEmbed);
  else if (cmd === 'set') setInit(stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, richEmbed);
}

export default commands;
