exports.run = (msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords, bot, date, richEmbed) => {
  const helpFile = require('./help.js');
  const infoFile = require('./info.js');
  const stopFile = require('./stop.js');
  const deleteFile = require('./delete.js');
  const goFile = require('./go.js');

  helpFile.run(msg, cmd, richEmbed);
  infoFile.run(msg, cmd, bot, richEmbed);
  stopFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords, date);
  deleteFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords);
  goFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords);
}
