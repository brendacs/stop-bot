![stop sign](https://raw.githubusercontent.com/brendacs/stop-bot/master/images/stop-banner-center.png)

# Stop Bot

Made to stop your Discord server from turning into a trollfest through message moderation.

[![Discord.js](https://img.shields.io/badge/discord-js-yellow.svg)](https://github.com/hydrabolt/discord.js/)
[![Servers: 32](https://img.shields.io/badge/servers-32-red.svg)](https://discordapp.com/oauth2/authorize?&client_id=340404757648769025&scope=bot&permissions=8200)
[![PRs welcome](https://img.shields.io/badge/pull%20requests-yes-brightgreen.svg)](https://github.com/brendacs/stop-bot/pulls)

## Invite

Click [here](https://discordapp.com/oauth2/authorize?&client_id=340404757648769025&scope=bot&permissions=8200) to invite Stop Bot to your server! It'll need your permission to manage messages.

## Commands

**Prefix:** `!` or mention the bot using `@Stop`

**Command types:**

|Type|Description|
|---|---|
|`general`|general bot commands|
|`stop`|tells the message sender to stop|
|`delete`|deletes an offending message|
|`go`|let the message be sent with no stops or deletions|

**Commands:**

* Admin = "Administrator" permission
* Mod = "Manage Messages" permission

|Command|Description|Permissions|
|---|---|--|
|**General Commands**|||
|`help`|sends a list of all commands to the channel|everyone|
|`info`|displays bot stats (# of servers and channels)|everyone|
|**Stop Commands**|||
|`stop`|sends a time stamp and message telling offender it's time to stop|everyone|
|`stop list`|sends a list of all words that will be responded to with stop|everyone|
|`stop video`|sends a passionate video to aid you in stopping the offender|everyone|
|`stop <word>`|adds `<word>` to list of words to stop|admin|
|**Delete Commands**|||
|`delete <word>`|adds `<word>` to list of words that will be auto-deleted after 1 second|admin|
|`delete list`|sends a list of all words that will be auto-deleted|everyone|
|`delete <#>`|deletes the last # of messages in the channel|admin or mod|
|**Go Commands**|||
|`go <word>`|removes `<word>` from list of words to stop or delete|admin|

**Examples:**

* `!stop help` or `@Stop help`
* `!stop kek` or `@Stop stop kek`
* `!delete lel` or `@Stop delete lel`
* `!go 4chan` or `@Stop go 4chan`

## Go Fish

The bot doesn't only like to stop things. It likes to go fish too. You can catch fish and check your fish inventory all under the go command. I'll let you figure this one out on your own. Have fun!
