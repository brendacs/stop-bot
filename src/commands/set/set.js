import {
  setDefault,
  setPrefix,
  setStopMessage,
  setDeleteMessage,
  setToggleDM
} from './setters';
import { stopClient, richEmbed } from '../../constants';
import { isAdmin, isMod } from '../../utils/perms';
import { getGuildId } from '../../utils/utils';

const setInit = (msg, subcmd, thirdcmd) => {
  const guildId = getGuildId(msg);

  if (!isAdmin(msg) || !isMod(msg)) {
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(`You are not permitted to change this bot's settings. You must have **manage messages** or **administrator** permissions.`);
    msg.channel.send({ embed })
    return;
  };
  const settingsQuery = `SELECT * FROM server_settings WHERE serverid='${guildId}'`;
  stopClient.query(settingsQuery)
    .then(result => {
      let settings = result.rows[0];
      setCmd(msg, subcmd, thirdcmd);
    })
    .catch(err => console.log(err));
}

const setCmd = (msg, subcmd, thirdcmd) => {
  const options = ['default', 'prefix', 'stopmsg', 'deletemsg', 'toggledm'];

  if (options.indexOf(subcmd) === -1) {
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(`What would you like to set?\n\nAvailable options:\n**${options.join(' | ')}**`);
    msg.channel.send({ embed });
  } else if (subcmd === 'default') {
    setDefault(msg);
  } else if (subcmd === 'prefix') {
    if (thirdcmd === undefined) {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`Include your prefix to set it. Example: ${"`" + "!set prefix ~" + "`"}.\nRemember it can only be one character.`);
      msg.channel.send({ embed });
    } else if (thirdcmd) {
      if (thirdcmd.length === 1) setPrefix(msg, thirdcmd);
      else {
        const embed = richEmbed
          .setColor('#ff0000')
          .setDescription(`Prefixes for this bot are limited to one character.`);
        msg.channel.send({ embed });
      }
    }
  } else if (subcmd === 'stopmsg') {
    if (thirdcmd === undefined) {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`Include your stop message to set it. Example: ${"`" + "!set stopmsg Please stop that" + "`"}.`);
      msg.channel.send({ embed });
    } else if (thirdcmd) {
      if (thirdcmd.length > 0) setStopMessage(msg, thirdcmd);
      else {
        const embed = richEmbed
          .setColor('#ff0000')
          .setDescription(`Message cannot be blank or less than 1 character.`);
        msg.channel.send({ embed });
      }
    }
  } else if (subcmd === 'deletemsg') {
    if (thirdcmd === undefined) {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`Include your delete message to set it. Example: ${"`" + "!set deletemsg Your message got deleted" + "`"}.`);
      msg.channel.send({ embed });
    } else if (thirdcmd) {
      if (thirdcmd.length > 0) setDeleteMessage(msg, thirdcmd);
      else {
        const embed = richEmbed
          .setColor('#ff0000')
          .setDescription(`Message cannot be blank or less than 1 character.`);
        msg.channel.send({ embed });
      }
    }
  } else if (subcmd === 'toggledm') {
    setToggleDM(msg);
  }
}

export default setInit;
