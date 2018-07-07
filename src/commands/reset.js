import { setDefault } from './set/setters';
import { stopClient, richEmbed } from '../constants';

const resetCmd = (msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild) => {
  if (admin || mod) {
    setDefault(msg);
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
