import Discord from 'discord.js';
import helpCmd from './help/help.js';
import getInfo from './info.js';
import stopCmd from './stop.js';
import deleteCmd from './delete.js';
import goCmd from './go/go.js';

const commands = (bot, msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, wordList, fishList) => {
  const richEmbed = new Discord.RichEmbed();

  const stopWord = stoppedWords.indexOf(subcmd);
  const deleteWord = deletedWords.indexOf(subcmd);

  helpCmd(msg, cmd, richEmbed);
  getInfo(bot, msg, cmd, richEmbed);
  stopCmd(msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord);
  deleteCmd(msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord);
  goCmd(msg, cmd, subcmd, admin, mod, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, fishList, richEmbed);
}

export default commands;
