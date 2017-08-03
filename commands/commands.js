exports.run = (msg, cmd, subcmd, admin, thisGuild, stoppedWords, deletedWords, fishList, bot, date, richEmbed) => {
  const helpFile = require('./help.js');
  const infoFile = require('./info.js');
  const stopFile = require('./stop.js');
  const deleteFile = require('./delete.js');
  const goFile = require('./go.js');

  const stopWord = stoppedWords.indexOf(subcmd);
  const deleteWord = deletedWords.indexOf(subcmd);

  helpFile.run(msg, cmd, richEmbed);
  infoFile.run(msg, cmd, bot, richEmbed);
  stopFile.run(msg, cmd, subcmd, admin, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, bot, date);
  deleteFile.run(msg, cmd, subcmd, admin, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, bot);
  goFile.run(msg, cmd, subcmd, admin, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, fishList, bot, richEmbed);
}
