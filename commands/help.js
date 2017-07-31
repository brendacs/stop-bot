exports.run = (msg, cmd, richEmbed) => {
  const help = require('./help.json');
  if (cmd === 'help') {
    msg.channel.send({
      embed: richEmbed.setColor('#ff0000').setDescription(
        help.headings.general + help.general + '\n' + help.headings.stop + help.stop + '\n' + help.headings.delete + help.delete + '\n' + help.headings.go + help.go)
    });
  } else {
    return;
  }
}
