import Discord from 'discord.js';
import helpCmd from './help/help.js';
import getInfo from './info.js';
import stopCmd from './stop.js';
import deleteCmd from './delete.js';
import goCmd from './go/go.js';

const commands = (bot, stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList) => {
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

  helpCmd(msg, cmd, richEmbed);
  getInfo(bot, msg, cmd, richEmbed);
  stopCmd(stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted);
  deleteCmd(stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted);
  goCmd(stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted, richEmbed);
}

export default commands;
