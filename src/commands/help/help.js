import helpList from './helpList.js';

const helpCmd = (msg, cmd, richEmbed) => {
  const embed = richEmbed
    .setColor('#ff0000')
    .setDescription(
`${helpList.headings.general} ${helpList.commands.general}
${helpList.headings.stop} ${helpList.commands.stop}
${helpList.headings.delete} ${helpList.commands.delete}
${helpList.headings.go} ${helpList.commands.go}
For more information, visit the [Stop Bot GitHub](https://github.com/brendacs/stop-bot)`)
    
  if (cmd === 'help') {
    msg.channel.send({embed});
  } else {
    return;
  }
}

export default helpCmd;
