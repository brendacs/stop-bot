![stop sign](https://raw.githubusercontent.com/brendacs/stop-bot/master/images/stop-banner-center.png)

# Stop Bot

Made to stop your Discord server from turning into a trollfest through message moderation.

[![discord.js](https://img.shields.io/badge/discord-js-blue.svg)](https://github.com/hydrabolt/discord.js/)
[![PRs welcome](https://img.shields.io/badge/pull%20requests-yes-brightgreen.svg)](https://github.com/brendacs/stop-bot/pulls)
[![Bot status](https://discordbots.org/api/widget/status/340404757648769025.svg)](https://discordbots.org/bot/340404757648769025)
[![Server count](https://discordbots.org/api/widget/servers/340404757648769025.svg)](https://discordbots.org/bot/340404757648769025)

## Invites

* Click [here](https://discordapp.com/oauth2/authorize?&client_id=340404757648769025&scope=bot&permissions=8200) to invite Stop Bot to your server! It'll need your permission to manage messages.
* Join Stop's Discord server [here](https://discord.gg/HwkMkKh) to give feedback, and have fun! The first 20 people to join get a `Special` role!
* You can check out stop bot on [discordbots.org](https://discordbots.org/bot/340404757648769025) or [bots.discord.pw](https://bots.discord.pw/bots/340404757648769025).

## Commands

**Default prefix:** `!` or mention the bot using `@Stop`

**Command types:**

|Type|Description|
|---|---|
|`general`|general bot commands|
|`set`|bot server settings|
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
|**Set Commands**|||
|set|displays list of options (things that can be set)|admin or mod|
|set <option> <setting>|sets <option> to your custom <setting>|admin or mod|
|set prefix <setting>|sets prefix to your custom <setting>|admin or mod|
|**Stop Commands**|||
|`stop`|sends a time stamp and message telling offender it's time to stop|everyone|
|`stop list`|sends a list of all words that will be responded to with stop|everyone|
|`stop video`|sends a passionate video to aid you in stopping the offender|everyone|
|`stop <words>`|adds `<words>` to list of words to stop|admin|
|**Delete Commands**|||
|`delete <words>`|adds `<words>` to list of words that will be auto-deleted after 1 second|admin|
|`delete list`|sends a list of all words that will be auto-deleted|everyone|
|`delete <#>`|deletes the last # of messages in the channel|admin or mod|
|**Go Commands**|||
|`go <word>`|removes `<word>` from list of words to stop or delete|admin|
|`go fish`|catch some fish (cooldown: 3 min)|everyone|
|`go inv`|see your fish (cooldown: 15 sec)|everyone|

**Notes:**

* Only setting currently is prefix
* Custom prefix can only be one character long
* Separate words to stop or delete with a space
  * Example: `!stop word1 word2 word2`
  * Example: `!delete word1 word2 word2`
* Go command only takes one word at a time

**Examples:**

* `!stop help` or `@Stop help`
* `!stop kek` or `@Stop stop kek`
* `!stop troll weird` or `@Stop stop troll weird`
* `!delete lel` or `@Stop delete lel`
* `!delete stupid idiot` or `@Stop delete stupid idiot`
* `!go 4chan` or `@Stop go 4chan`

## Go Fish

The bot doesn't only like to stop things. It likes to go fish too. You can catch fish and check your fish inventory all under the `!go fish` and `!go inv` commands. Have fun!

# Contributing

Contributions and pull requests are very welcome! This project uses [discord.js](https://github.com/hydrabolt/discord.js/) and ES6 syntax compiled using Babel. To contribute, please clone or fork the `dev1` branch and configure an `auth.json`. Read [CONTRIBUTING.md](CONTRIBUTING.md) for more a detailed guide on how to get started. If you are contributing, it is highly recommended that you join [Stop's Discord server](https://discord.gg/HwkMkKh) so you can discuss with me and other contributors.
