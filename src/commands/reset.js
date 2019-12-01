import { setDefault } from './set/setters';
import { stopClient, richEmbed } from '../constants';
import { isAdmin, isMod } from '../utils/checkPerms';
import { getGuildId } from '../utils/utils';

const resetCmd = (msg) => {
  if (isAdmin(msg) || isMod(msg)) {
    const guildId = getGuildId(msg);
    setDefault(msg);
    stopClient.query(`UPDATE word_lists SET deletelist = '{}' WHERE serverid=${guildId}`);
    stopClient.query(`UPDATE word_lists SET stoplist = '{}' WHERE serverid=${guildId}`)
      .then(() => {
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
