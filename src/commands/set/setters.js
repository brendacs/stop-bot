import { stopClient, richEmbed } from '../../constants';
import { getGuildId } from '../../utils/utils';

export const setDefault = (msg) => {
  const guildId = getGuildId(msg);
  stopClient.query(`UPDATE server_settings SET prefix = '!' WHERE serverid=${guildId}`);
  stopClient.query(`UPDATE server_settings SET stopmessage = NULL WHERE serverid=${guildId}`);
  stopClient.query(`UPDATE server_settings SET deletemessage = NULL WHERE serverid=${guildId}`);
  stopClient.query(`UPDATE server_settings SET dmlists = false WHERE serverid=${guildId}`)
    .then(() => {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`Your settings have been reset to default.`);
      msg.channel.send({ embed });
    })
    .catch(err => {
      console.log(err);
    });
}

export const setPrefix = (msg, thirdcmd) => {
  const guildId = getGuildId(msg);
  stopClient.query(`UPDATE server_settings SET prefix = '${thirdcmd}' WHERE serverid=${guildId}`)
    .then(() => {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`New prefix has been set to ${"`" + thirdcmd + "`"}.`);
      msg.channel.send({ embed });
    })
    .catch(err => {
      console.log(err);
    });
}

export const setStopMessage = (msg, thirdcmd) => {
  const guildId = getGuildId(msg);
  stopClient.query(`UPDATE server_settings SET stopmessage = '${thirdcmd}' WHERE serverid=${guildId}`)
    .then(() => {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`New stop message has been set.`);
      msg.channel.send({ embed });
    })
    .catch(err => {
      console.log(err);
    });
}

export const setDeleteMessage = (msg, thirdcmd) => {
  const guildId = getGuildId(msg);
  stopClient.query(`UPDATE server_settings SET deletemessage = '${thirdcmd}' WHERE serverid=${guildId}`)
    .then(() => {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`New delete message has been set.`);
      msg.channel.send({ embed });
    })
    .catch(err => {
      console.log(err);
    });
}

export const setToggleDM = (msg) => {
  const guildId = getGuildId(msg);
  stopClient.query(`UPDATE server_settings SET dmlists = NOT dmlists WHERE serverid=${guildId}`)
    .then(() => {
      stopClient.query(`SELECT dmlists FROM server_settings WHERE serverid='${guildId}'`).then(result => {
        let toggled = result.rows[0]['dmlists'] ? 'enabled' : 'disabled';
        const embed = richEmbed
          .setColor('#ff0000')
          .setDescription(`DM lists has been ${toggled}.`);
        msg.channel.send({ embed });
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
}
