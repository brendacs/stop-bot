# Contributing

Thank you for wanting to contribute and make Stop better for everyone! Here is a quick set up guide and some rules to follow for creating and working on issues, creating branches, submitting pull requests.

## Setting Up Your Environment

* Before anything else, join [Stop's Discord server](https://discord.gg/HwkMkKh).
* Clone the repo to your local machine.
* Use the development branch, `dev1`.
* Create an app and app bot user at [Discord developers](https://discordapp.com/developers/applications/me).
* Create an `auth.json` and add your bot token for testing.
* Run `npm install` to install all dependencies.
* Use `npm run build` for Babel to compile the ES6 syntax.
* Create a branch off of `dev1` called `dev1/camelCase`.
  * ex: `dev1/makeStopCooler` or `dev1/addNewStopSign`
* Make sure you have [Node](https://nodejs.org/en/) installed before running.
  * To run: `node lib/stopbot.js`
* Start coding and discussing!

##### Some quick notes:

* The server count code snippets in `stopbot.js` may have to be commented out before you can run. These are for posting the server count to the discord bot lists Stop is on. Since the tokens don't exist in your auth.json, it'll throw an error at you. (I'll eventually move these elsewhere so they don't bother you.)
* Currently, there is no `data/` and no `stopList.json`, `deleteList.json`, or `fishList.json`. You can make empty data files to test, but I am moving everything from crappy JSON to a PostgreSQL server so this won't be an issue soon.

##### What happens afterwards?

You create a pull request, I review it. I reject or approve it and give comments. You and I fix anything that needs to be fixed. I review it again. I merge and push your changes to `master`. Eventually, major changes will be merged with my private, mysterious `stable` branch which is deployed with Heroku. You also get the shiny, privileged `Contributor` role on [Stop's Discord server](https://discord.gg/HwkMkKh).

## Creating and handling issues

Please raise the issues channel in [Stop's Discord server](https://discord.gg/HwkMkKh) or create an issue on GitHub. Eventually, all relevant and tested issues mentioned on Discord will be added to this repo's issues. When starting an issue, please comment on it, letting others know you will be working on it so there aren't overlaps.

## Creating pull requests

When creating a PR, give it a descriptive title and write a few notes or bullet points letting us know quickly what it is that you did. It can be just a sentence or two. If is it linked to an issue (which it should be) please mention the issue in your commit message so that it links to the issue's page. For example, `git commit -m "Fixed issue #7, stop sign no longer says go"`.

## Commenting on things

Be nice. Be respectful. Be productive.
