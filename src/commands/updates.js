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

- Something people have wanted for a long time: multiple words can be stopped or deleted at once. Words must be separated with a space. Example: ${"`" + "!stop word1 word2 word3" + "`"}.
- ${"`" + "go" + "`"} command must still be used on one word at a time.
- Bot's prefix is now customizable through ${"`" + "set prefix" + "`"}. User must have manage messages or administrator permissions to change settings.
- Added ${"`" + "set" + "`"} command for all bot settings (only one setting currently available).
- Added ${"`" + "updates" + "`"} command. Bot DMs latest updates and links user to the Stop Bot support server's #updates channel and #github-log channel.

**Other updates**

- Updated ${"`" + "help" + "`"} command with set section, set commands, and updates command. Subtle update to stop and delete in help (${"`" + "stop <word>" + "`"} became ${"`" + "stop <words>" + "`"}).
- Server count in bot's user presence is now updated every time a server invites Stop.
- Started testing and developing bot on separate "Stop Testing" bot.
- Dev note: Code more modular, such as permissions checks.

If you enjoy using Stop bot, please upvote it on the [Discord Bot List](https://discordbots.org/bot/340404757648769025)! :heart:`
        )
      })
  });
}

export default getUpdates;
