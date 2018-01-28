const getInfo = (bot, msg, cmd, richEmbed) => {
  msg.channel.send({
    embed: richEmbed.setColor('#ff0000').setDescription(
`This bot is running on ${bot.guilds.size} servers and ${bot.channels.size} channels with ${bot.users.size} users.
To report issues, give feedback, and contribute, join the [Stop Discord Server](https://discord.gg/HwkMkKh).
For full documentation, visit the [Stop Bot GitHub](https://github.com/brendacs/stop-bot).`
    )
  });
}

export default getInfo;
