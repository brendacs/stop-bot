exports.run = (msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords, date, richEmbed) => {
  const helpFile = require('./help.js');
  const stopFile = require('./stop.js');
  const deleteFile = require('./delete.js');
  const goFile = require('./go.js');

  helpFile.run(msg, cmd, richEmbed);
  stopFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords, date);
  deleteFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords);
  goFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords);
}
