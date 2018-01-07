const getUpdates = (bot, msg, cmd, richEmbed) => {
  msg.channel.send({
    embed: richEmbed.setColor('#ff0000').setDescription(
`Check your DMs for the latest update.\n
To view all bot updates, join the [Stop Discord Server](https://discord.gg/FXCe7bX) and view the [#updates](https://discord.gg/FXCe7bX) channel.
You can even see updates before they're released in the [#github-log](https://discord.gg/FXCe7bX).`
    )
  });

  getUpdateDM(bot, msg, cmd, richEmbed)
}

const getUpdateDM = (bot, msg, cmd, richEmbed) => {
  msg.member.user.createDM()
    .then((channel) => {
      channel.send({
        embed: richEmbed.setColor('#ff0000').setDescription(
`**Update #3**

- Bot's prefix is now customizable through ${"`" + "set prefix" + "`"} (must have manage messages or administrator permissions).
- Added set command for all server settings (only one setting currently available).
- Added updates command. Bot DMs updates and links user to the Stop Bot support server's #updates channel and #github-log channel.
- Updated help command with set section, set commands, and updates command.

**Other updates**

- Server count in bot's user presence is now updated every time a server invites Stop.
- Started testing and developing bot on separate "Stop Testing" bot to avoid usage interruption.

If you enjoy using Stop bot, please upvote it on the [Discord Bot List](https://discordbots.org/bot/340404757648769025)! :heart:`
        )
      })
  });
}

export default getUpdates;