const getInfo = (bot, msg, cmd, richEmbed) => {
  if (cmd === 'info') {
    msg.channel.send({
      embed: richEmbed.setColor('#ff0000').setDescription(
        'This bot is running on ' + bot.guilds.size + ' servers and ' + bot.channels.array().length + ' channels.'
      )
    });
  }
}

export default getInfo;
