export const PGUSER = 'brendazhang';
export const PGDATABASE = 'stopbot_db';
export const cmds = ['help', 'dmhelp', 'info', 'updates', 'stop', 'delete', 'go', 'set', 'reset'];
export const reservedWords = cmds.concat(['fish', 'inv', 'default', 'prefix', 'stopmsg', 'deletemsg', 'toggledm', 'video']);
export const coolDownMinutesFish = 3 * 60 * 1000;
export const coolDownMinutesInv = 0.25 * 60 * 1000;

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
