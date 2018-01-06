const getUpdates = (bot, msg, cmd, richEmbed) => {
  msg.channel.send({
    embed: richEmbed.setColor('#ff0000').setDescription(
`To view all bot updates, join the [Stop Discord Server](https://discord.gg/FXCe7bX) and view the [#updates](https://discord.gg/FXCe7bX) channel.`
    )
  });
}

export default getUpdates;
