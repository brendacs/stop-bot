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
`**Update #5**

 Added reset command, which resets all bot settings and lists: ${"`" + "!reset" + "`"}.
- Words with apostrophes can now be added to stop and delete lists: ${"`" + "!stop don't" + "`"}.
- Restricted words will no longer be deleted if listed at once. For example, ${"`" + "!delete go fish" + "`"} and ${"`" + "!delete set stop" + "`"} will no longer add those words.
- Found a small bug and squashed it. So, the ${"`" + "!stop video" + "`"} command works again!
- Updated documentation, help command, and update commands to match updates.

**A small note**

Thank you to all those who pointed out these bugs and suggested improvements. I'd never be able to catch all those bugs myself! Your help is always appreciated, and never hesitate to discuss the bot with me in the server or on GitHub. I hope it is obvious that your input matters.

If you enjoy using Stop Bot, please upvote it on the [Discord Bot List](https://discordbots.org/bot/stop-bot)! :heart:`
        )
      })
  });
}

export default getUpdates;
