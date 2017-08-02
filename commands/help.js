exports.run = (msg, cmd, richEmbed) => {
  const help = require('./help.json');
  const embed = richEmbed
    .setColor('#ff0000')
    .setDescription(help.headings.general + help.general + '\n' + help.headings.stop + help.stop + '\n' + help.headings.delete + help.delete + '\n' + help.headings.go + help.go)
    .addBlankField(true)
    .addField('Anything else', 'For more information, visit the [Stop Bot GitHub](https://github.com/brendacs/stop-bot)')
  if (cmd === 'help') {
    msg.channel.send({embed});
  } else {
    return;
  }
}
