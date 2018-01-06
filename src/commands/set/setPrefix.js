const setPrefix = (stopClient, msg, cmd, subcmd, thirdcmd, settings, richEmbed) => {
  stopClient.query(`UPDATE server_settings SET prefix = '${thirdcmd}' WHERE serverid=${msg.guild.id}`)
    .then(result => {
      const embed = richEmbed
        .setColor('#ff0000')
        .setDescription(`New prefix has been set to ${"`" + thirdcmd + "`"}.`);
      msg.channel.send({embed});
    })
    .catch(err => {
      console.log(err);
    });
}

export default setPrefix;
