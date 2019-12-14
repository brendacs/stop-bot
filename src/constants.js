import Discord from 'discord.js';
import pg from 'pg';
import auth from '../auth.json';

const dbconfig = {
  user: auth.PGUSER, // name of the user account
  password: auth.PGPASSWORD, // password
  database: auth.PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

export const stopClient = new pg.Client(dbconfig);

// Bot constants
export const richEmbed = new Discord.RichEmbed();
export const cmds = ['help', 'dmhelp', 'info', 'updates', 'stop', 'delete', 'go', 'set', 'reset'];
export const reservedWords = cmds.concat(['fish', 'inv', 'default', 'prefix', 'stopmsg', 'deletemsg', 'toggledm', 'video']);
export const coolDownMinutesFish = 3 * 60 * 1000;
export const coolDownMinutesInv = 2 * 60 * 1000;

// Arrays of fish names, emojis names, and db names
const fishEmojis = [':fish:', ':fish_cake:', ':fishing_pole_and_fish:', ':tropical_fish:', ':blowfish:'];
const fishNames = ['Fish', 'Fish Cake', 'Fish on a Fishing Pole', 'Tropical Fish', 'Blowfish'];
const dbNames = ['fish', 'cake', 'fishpole', 'tropical', 'blowfish'];

const rareFishEmojis = [':whale:', ':whale2:', ':dolphin:', ':octopus:', ':unicorn:'];
const dbRare = ['cutewhale', 'bluewhale', 'dolphin', 'octopus', 'unicorn'];
const rareFishNames = ['Cute Whale', 'Blue Whale', 'Dolphin', 'Octopus', 'Unicorn'];

export const allFishEmojis = fishEmojis.concat(fishEmojis).concat(fishEmojis).concat(rareFishEmojis);
export const allFishNames = fishNames.concat(fishNames).concat(fishNames).concat(rareFishNames);
export const allDBNames = dbNames.concat(dbNames).concat(dbNames).concat(dbRare);

export const getStrings = (...args) => ({
  bulkDeleteLimit: 'Number of messages must be under 100.',
  info: `This bot is running on ${args[0].guilds.size} servers and ${args[1].channels.size} channels with ${args[2].users.size} users. To report issues, give feedback, and contribute, join the [Stop Discord Server](https://discord.gg/HwkMkKh). For full documentation, visit the [Stop Bot GitHub](https://github.com/brendacs/stop-bot).`,
  permissionsReply: 'you must have the proper permissions use this command.',
  resetDescription: 'Your stop list and delete list have been reset.',
  stopVideo: 'https://www.youtube.com/watch?v=2k0SmqbBIpQ',
  updatesChannelMessage: 'Check your DMs for the latest update. To view all bot updates, join the [Stop Discord Server](https://discord.gg/FXCe7bX) and view the [#updates](https://discord.gg/FXCe7bX) channel. You can even see updates before they\'re released in the [#github-log](https://discord.gg/FXCe7bX).',
  updatesPrivateMessage: '**Update #5**\n\nAdded reset command, which resets all bot settings and lists: `!reset`.\n- Words with apostrophes can now be added to lists: `!stop don\'t`.\n- Restricted words will no longer be deleted if listed at once. For example, `!delete go fish` and `!delete set stop` will no longer add those words.\n- Found a small bug and squashed it. So, the `!stop video` command works again!\n- Updated documentation, help command, and update commands to match updates.\n\n**A small note**\n\nThank you to all those who pointed out these bugs and suggested improvements. I\'d never be able to catch all those bugs myself! Your help is always appreciated, and never hesitate to discuss the bot with me in the server or on GitHub. I hope it is obvious that your input matters.\n\nIf you enjoy using Stop Bot, please upvote it on the [Discord Bot List](https://discordbots.org/bot/stop-bot)! :heart:'
});
