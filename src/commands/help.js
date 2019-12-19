import {getStrings, richEmbed} from '../constants';

const helpCmd = (msg, cmd) => {
  const {helpList} = getStrings();
  const embed = richEmbed
    .setColor('#ff0000')
    .setDescription(
      // eslint-disable-next-line indent
`${helpList.headings.general} ${helpList.commands.general}
${helpList.headings.set} ${helpList.commands.set}
${helpList.headings.stop} ${helpList.commands.stop}
${helpList.headings.delete} ${helpList.commands.delete}
${helpList.headings.go} ${helpList.commands.go}\n
${helpList.headings.docs}
${helpList.blurb}`
    );
  if (cmd === 'help') {
    msg.channel.send({embed});
  } else if (cmd === 'dmhelp') {
    msg.member.createDM()
      .then(channel => {
        channel.send({embed});
      });
  } else {
    return;
  }
};

export default helpCmd;
