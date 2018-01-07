import setPrefix from './setPrefix.js';

const setInit = (stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, richEmbed) => {
  if (!admin || !mod) {
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(`You are not permitted to change this bot's settings. You must have **manage messages** or **administrator** permissions.`);
    msg.channel.send({embed})
    return;
  };
  const settingsQuery = `SELECT * FROM server_settings WHERE serverid='${thisGuild}'`;
  stopClient.query(settingsQuery)
    .then(result => {
      let settings = result.rows[0];
      setCmd(stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, richEmbed, settings);
    })
    .catch(err => console.log(err));
}

const setCmd = (stopClient, msg, cmd, subcmd, thirdcmd, admin, mod, thisGuild, richEmbed, settings) => {
  const options = ['prefix'];
  if (options.indexOf(subcmd) === -1) {
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(`What would you like to set? Available options: **${options.join(' | ')}**`);
    msg.channel.send({embed});
  } else if (subcmd === 'prefix' && thirdcmd === undefined) {
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(`Include your prefix to set it. Example: ${"`" + "!set prefix ~" + "`"}.\nRemember it can only be one character.`);
    msg.channel.send({embed});
  } else if (subcmd === 'prefix' && thirdcmd) {
    if (thirdcmd.length === 1) setPrefix(stopClient, msg, cmd, subcmd, thirdcmd, settings, richEmbed);
    else {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`Prefixes for this bot are limited to one character.`);
      msg.channel.send({embed});
    }
  }
}

export default setInit;
