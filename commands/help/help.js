exports.run = (msg, cmd, richEmbed) => {
  const help = require('./help.json');
  const embed = richEmbed
    .setColor('#ff0000')
    .setDescription(
`${help.headings.general} ${help.general}
${help.headings.stop} ${help.stop}
${help.headings.delete} ${help.delete}
${help.headings.go} ${help.go}
For more information, visit the [Stop Bot GitHub](https://github.com/brendacs/stop-bot)`)
    
  if (cmd === 'help') {
    msg.channel.send({embed});
  } else {
    return;
  }
}
