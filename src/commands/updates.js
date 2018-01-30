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
`**Update #4**

- Users are now mentionable: ${"`" + "stop <user>" + "`"} and ${"`" + "delete <#> <user>" + "`"}.
- ${"`" + "delete <#> <user>" + "`"} deletes the last ${"`" + "#" + "`"} of messages from ${"`" + "user" + "`"}.
- You can now set the bot to send stopped and deleted word lists through DM with ${"`" + "set toggledm" + "`"}. This can be disabled again under the same command.
- Stop and delete warnings are now both customizable through ${"`" + "set stopmsg <msg>" + "`"} and ${"`" + "set deletemsg <msg>" + "`"} where ${"`" + "msg" + "`"} is your custom message.
- ${"`" + "dmhelp" + "`"} command was added. Use this instead of ${"`" + "help" + "`"} to get the commands in your DMs.

**Other updates**

- If bulk delete number is >= 100, a warning message is sent to user.
- Fixed bug where commands and subcommands could be stopped/deleted.
- Documentation has been made more clear in help and info commands.

If you enjoy using Stop Bot, please upvote it on the [Discord Bot List](https://discordbots.org/bot/stop-bot)! :heart:`
        )
      })
  });
}

export default getUpdates;
