export const setDefault = (stopClient, msg, richEmbed) => {
  stopClient.query(`UPDATE server_settings SET prefix = '!' WHERE serverid=${msg.guild.id}`);
  stopClient.query(`UPDATE server_settings SET stopmessage = NULL WHERE serverid=${msg.guild.id}`);
  stopClient.query(`UPDATE server_settings SET deletemessage = NULL WHERE serverid=${msg.guild.id}`);
  stopClient.query(`UPDATE server_settings SET dmlists = false WHERE serverid=${msg.guild.id}`)
    .then(result => {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`Your settings have been reset to default.`);
      msg.channel.send({ embed });
    })
    .catch(err => {
      console.log(err);
    });
}

export const setPrefix = (stopClient, msg, cmd, subcmd, thirdcmd, richEmbed) => {
  stopClient.query(`UPDATE server_settings SET prefix = '${thirdcmd}' WHERE serverid=${msg.guild.id}`)
    .then(result => {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`New prefix has been set to ${"`" + thirdcmd + "`"}.`);
      msg.channel.send({ embed });
    })
    .catch(err => {
      console.log(err);
    });
}

export const setStopMessage = (stopClient, msg, cmd, subcmd, thirdcmd, richEmbed) => {
  stopClient.query(`UPDATE server_settings SET stopmessage = '${thirdcmd}' WHERE serverid=${msg.guild.id}`)
    .then(result => {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`New stop message has been set.`);
      msg.channel.send({ embed });
    })
    .catch(err => {
      console.log(err);
    });
}

export const setDeleteMessage = (stopClient, msg, cmd, subcmd, thirdcmd, richEmbed) => {
  stopClient.query(`UPDATE server_settings SET deletemessage = '${thirdcmd}' WHERE serverid=${msg.guild.id}`)
    .then(result => {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`New delete message has been set.`);
      msg.channel.send({ embed });
    })
    .catch(err => {
      console.log(err);
    });
}

export const setToggleDM = (stopClient, msg, cmd, subcmd, richEmbed) => {
  stopClient.query(`UPDATE server_settings SET dmlists = NOT dmlists WHERE serverid=${msg.guild.id}`)
    .then(result => {
      stopClient.query(`SELECT dmlists FROM server_settings WHERE serverid='${msg.guild.id}'`).then(result => {
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
