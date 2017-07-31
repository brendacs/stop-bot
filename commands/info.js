exports.run = (msg, cmd, bot, richEmbed) => {
  if (cmd === 'info') {
    msg.channel.send({
      embed: richEmbed.setColor('#ff0000').setDescription(
        'This bot is running on ' + bot.guilds.array().length + ' servers and ' + bot.channels.array().length + ' channels.'
      )
    });
  }
}
