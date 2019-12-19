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

export const getStrings = (...options) => {
  options = options || [{}, {}];
  return {
    bulkDeleteLimit: 'Number of messages must be under 100.',
    go: {
      removedStopWord: `\`${options[0]}\` will no longer be stopped.`,
      removedDeleteWord: `\`${options[0]}\` will no longer be deleted.`,
      wordDoesNotExist: `\`${options[0]}\` was not on the list of stopped or deleted words.`,
      noWordGivenReply: 'please provide the word you want to remove from a list.'
    },
    goFish: {
      inventoryList: `${options[0]}'s inventory \n\n
      **${options[1]['fish']}** x :fish: ║ **${options[1]['cake']}** x :fish_cake: ║ **${options[1]['fishpole']}** x :fishing_pole_and_fish: ║ **${options[1]['tropical']}** x :tropical_fish: \n\n
      **${options[1]['blowfish']}** x :blowfish: ║ **${options[1]['cutewhale']}** x :whale: ║ **${options[1]['bluewhale']}** x :whale2: ║ **${options[1]['dolphin']}** x :dolphin: ║ **${options[1]['octopus']}** x :octopus:`,
      repairRod: 'Your fishing rod is broken. It will require ' + Math.floor((options[0] - Date.now()) / 1000) + ' more seconds to repair.',
      restInv: 'Your inventory is heavy. You will require ' + Math.floor((options[0] - Date.now()) / 1000) + ' more seconds to rest.'
    },
    helpList: {
      blurb: 'For full documentation and explanations, visit [Stop Bot GitHub](https://github.com/brendacs/stop-bot). For further help and support, join the [Stop Discord Server](https://discord.gg/HwkMkKh).',
      headings: {
        docs: '**DOCUMENTATION**',
        general: '**GENERAL**',
        set: '**SET**',
        stop: '**STOP**',
        delete: '**DELETE**',
        go: '**GO**'
      },
      commands: {
        general: '```help, dmhelp, info, updates, reset```',
        set: '```set, set default, set prefix, set stopmsg <setting>, set deletemsg <setting>, set toggledm```',
        stop: '```stop [@user], stop video, stop list, stop <words>```',
        delete: '```delete <words>, delete list, delete <#> [@user]```',
        go: '```go <word>, go fish, go inv```'
      }
    },
    infoText: `This bot is running on ${options[0].guilds.size} servers and ${options[0].channels.size} channels with ${options[0].users.size} users. To report issues, give feedback, and contribute, join the [Stop Discord Server](https://discord.gg/HwkMkKh). For full documentation, visit the [Stop Bot GitHub](https://github.com/brendacs/stop-bot).`,
    listNoWords: `There are no words on the ${options[0]} list.`,
    listReserved: `This word is reserved for bot functionality and cannot be ${options[0]}.`,
    listWordAdded: `\`${options[0]}\` will now be ${options[1]}.`,
    listWordExists: `\`${options[0]}\` is already on the list of words to ${options[1] ? 'delete' : 'stop'}.`,
    listWords: `These words are currently being ${options[0]}: \`${options[1].join(', ')}\``,
    permissionsReply: 'you must have the proper permissions use this command.',
    resetDescription: 'Your stop list and delete list have been reset.',
    setCannotBeBlank: 'Message cannot be blank or less than 1 character.',
    setIncludeDeleteMessage: 'Include your delete message to set it. Example: `!set deletemsg Your message got deleted`.',
    setIncludePrefix: 'Include your prefix to set it. Example: `!set prefix ~`.\nRemember it can only be one character.',
    setIncludeStopMessage: 'Include your stop message to set it. Example: `!set stopmsg Please stop that`.',
    setOptionsReply: `What would you like to set?\n\nAvailable options:\n**${options[0].join(' | ')}**`,
    setPermissionsReply: 'You are not permitted to change this bot\'s settings. You must have **manage messages** or **administrator** permissions.',
    setPrefixCharLimit: 'Prefixes for this bot are limited to one character.',
    setterDefault: 'Your settings have been reset to default.',
    setterNewDeleteMessage: 'New delete message has been set.',
    setterNewPrefix: `New prefix has been set to \`${options[0]}\`.`,
    setterNewStopMessage: 'New stop message has been set.',
    setterToggleDM: `DM lists has been ${options[0]}.`,
    settingsDeleteMessage: 'Detected something horrible. Deleted.',
    settingsStopMessage: `${new Date().toString()}\nIT'S TIME TO STOP.`,
    stopVideo: 'https://www.youtube.com/watch?v=2k0SmqbBIpQ',
    updatesChannelMessage: 'Check your DMs for the latest update. To view all bot updates, join the [Stop Discord Server](https://discord.gg/FXCe7bX) and view the [#updates](https://discord.gg/FXCe7bX) channel. You can even see updates before they\'re released in the [#github-log](https://discord.gg/FXCe7bX).',
    updatesPrivateMessage: '**Update #5**\n\nAdded reset command, which resets all bot settings and lists: `!reset`.\n- Words with apostrophes can now be added to lists: `!stop don\'t`.\n- Restricted words will no longer be deleted if listed at once. For example, `!delete go fish` and `!delete set stop` will no longer add those words.\n- Found a small bug and squashed it. So, the `!stop video` command works again!\n- Updated documentation, help command, and update commands to match updates.\n\n**A small note**\n\nThank you to all those who pointed out these bugs and suggested improvements. I\'d never be able to catch all those bugs myself! Your help is always appreciated, and never hesitate to discuss the bot with me in the server or on GitHub. I hope it is obvious that your input matters.\n\nIf you enjoy using Stop Bot, please upvote it on the [Discord Bot List](https://discordbots.org/bot/stop-bot)! :heart:'
  };
};
