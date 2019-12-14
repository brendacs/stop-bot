import {setDefault} from './set/setters';
import {getStrings, stopClient, richEmbed} from '../constants';
import {isAdmin, isMod} from '../utils/perms';
import {getGuildId} from '../utils/utils';

const resetCmd = (msg) => {
  if (isAdmin(msg) || isMod(msg)) {
    const guildId = getGuildId(msg);
    setDefault(msg);
    stopClient.query(`UPDATE word_lists SET deletelist = '{}' WHERE serverid=${guildId}`);
    stopClient.query(`UPDATE word_lists SET stoplist = '{}' WHERE serverid=${guildId}`)
      .then(() => {
        const embed = richEmbed
          .setColor('#ff0000')
          .setDescription(getStrings().resetDescription);
        msg.channel.send({embed});
      });
  } else {
    msg.reply(getStrings().permissionsReply);
  }
};

export default resetCmd;
