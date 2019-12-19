import {
  setDefault,
  setPrefix,
  setStopMessage,
  setDeleteMessage,
  setToggleDM
} from './setters';
import {getStrings, stopClient, richEmbed} from '../../constants';
import {isAdmin, isMod} from '../../utils/perms';
import {getGuildId} from '../../utils/utils';

const setInit = (msg, subcmd, thirdcmd) => {
  const guildId = getGuildId(msg);

  if (!isAdmin(msg) || !isMod(msg)) {
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(getStrings().setPermissionsReply);
    msg.channel.send({embed});
    return;
  }

  const settingsQuery = `SELECT * FROM server_settings WHERE serverid='${guildId}'`;
  stopClient.query(settingsQuery)
    .then(() => {
      // let settings = result.rows[0];
      setCmd(msg, subcmd, thirdcmd);
    })
    .catch(err => console.log(err));
};

const setCmd = (msg, subcmd, thirdcmd) => {
  const options = ['default', 'prefix', 'stopmsg', 'deletemsg', 'toggledm'];

  switch (subcmd) {
    case 'default':
      setDefault(msg);
      break;
    case 'prefix':
      if (thirdcmd === undefined) {
        const embed = richEmbed
          .setColor('#ff0000')
          .setDescription(getStrings().setIncludePrefix);
        msg.channel.send({embed});
      } else if (thirdcmd) {
        if (thirdcmd.length === 1) setPrefix(msg, thirdcmd);
        else {
          const embed = richEmbed
            .setColor('#ff0000')
            .setDescription(getStrings().setPrefixCharLimit);
          msg.channel.send({embed});
        }
      }
      break;
    case 'stopmsg':
      if (thirdcmd === undefined) {
        const embed = richEmbed
          .setColor('#ff0000')
          .setDescription(getStrings().setIncludeStopMessage);
        msg.channel.send({embed});
      } else if (thirdcmd) {
        if (thirdcmd.length > 0) setStopMessage(msg, thirdcmd);
        else {
          const embed = richEmbed
            .setColor('#ff0000')
            .setDescription(getStrings().setCannotBeBlank);
          msg.channel.send({embed});
        }
      }
      break;
    case 'deletemsg':
      if (thirdcmd === undefined) {
        const embed = richEmbed
          .setColor('#ff0000')
          .setDescription(getStrings().setIncludeDeleteMessage);
        msg.channel.send({embed});
      } else if (thirdcmd) {
        if (thirdcmd.length > 0) setDeleteMessage(msg, thirdcmd);
        else {
          const embed = richEmbed
            .setColor('#ff0000')
            .setDescription(getStrings().setCannotBeBlank);
          msg.channel.send({embed});
        }
      }
      break;
    case 'toggledm':
      setToggleDM(msg);
      break;
    default: {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(getStrings(options).setOptionsReply);
      msg.channel.send({embed});
    }
  }
};

export default setInit;
