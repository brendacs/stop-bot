# Stop Bot

Made to stop your Discord server from turning into a trollfest through message moderation.

![stop sign](https://raw.githubusercontent.com/brendacs/stop-bot/master/images/stop.png)

Click [here](https://discordapp.com/oauth2/authorize?&client_id=340404757648769025&scope=bot&permissions=8200) to invite Stop Bot to your server! It'll need your permission to manage messages.

# Commands

**Prefix:** `!`

**Command types:**

|Type|Description|
|---|---|
|`help`|self-explanatory|
|`stop`|tells the message sender to stop|
|`delete`|deletes an offending message|
|`go`|Let the message be sent with no stops or deletions|

**Commands:**

|Command|Description|Permissions|
|---|---|--|
|**Stop Commands**|||
|`stop`|sends a time stamp and message telling offender it's time to stop|everyone|
|`stop list`|sends a list of all words that will be responded to with stop|everyone|
|`stop video`|sends a passionate video to aid you in stopping the offender|everyone|
|`stop <word>`|adds `<word>` to list of words to stop|admin|
|**Delete Commands**|||
|`delete <word>`|adds `<word>` to list of words that will be auto-deleted after 1 second|admin|
|`delete list`|sends a list of all words that will be auto-deleted|everyone|
|**Go Commands**|||
|`go <word>`|removes `<word>` from list of words to stop or delete|admin|
