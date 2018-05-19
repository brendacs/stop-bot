import { setDefault } from './set/setters';

const resetCmd = (stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, richEmbed) => {
  if (admin || mod) {
    setDefault(stopClient, msg, richEmbed);
    stopClient.query(`UPDATE word_lists SET deletelist = '{}' WHERE serverid=${msg.guild.id}`);
    stopClient.query(`UPDATE word_lists SET stoplist = '{}' WHERE serverid=${msg.guild.id}`)
      .then(result => {
        const embed = richEmbed
          .setColor('#ff0000')
          .setDescription(`Your stop list and delete lists have been reset.`);
        msg.channel.send({ embed });
      })
  } else {
    msg.reply('you can\'t use this command.');
  }
}

export default resetCmd;
