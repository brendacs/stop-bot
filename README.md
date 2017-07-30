# Stop Bot

Made to stop your Discord server from turning into a trollfest.

# Commands

Prefix: `!`

Command types:

|Type|Description|
|---|---|
|`help`|self-explanatory|
|`stop`|tells the message sender to stop|
|`delete`|deletes an offending message|
|`go`|Let the message be sent with no stops or deletions|

Commands:

|Command|Description|Permissions|
|---|---|--|
|Stop Commands|||
|`stop`|sends a time stamp and message telling offender it's time to stop|everyone|
|`stop list`|sends a list of all words that will be responded to with stop|everyone|
|`stop video`|sends a passionate video to aid you in stopping the offender|everyone|
|`stop <word>`|adds `<word>` to list of words to stop|admin|
|Delete Commands|||
|`delete <word>`|adds `<word>` to list of words that will be auto-deleted after 1 second|admin|
|`delete list`|sends a list of all words that will be auto-deleted|everyone|
|Go Commands|||
|`go <word>`|removes `<word>` from list of words to stop or delete|admin|
