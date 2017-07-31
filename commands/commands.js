exports.run = (msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords, date, richEmbed) => {
  let helpFile = require('./help.js');
  let stopFile = require('./stop.js');
  let deleteFile = require('./delete.js');
  let goFile = require('./go.js');

  helpFile.run(msg, cmd, richEmbed);
  stopFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords, date);
  deleteFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords);
  goFile.run(msg, cmd, subcmd, admin, stopWord, deleteWord, stoppedWords, deletedWords);
}
