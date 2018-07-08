import {
  allFishEmojis,
  allFishNames,
  allDBNames,
  stopClient,
  richEmbed
} from '../../constants';
import { getAuthorId } from '../../utils/utils';

const goFish = (msg, cmd, subcmd, fishList) => {
  if (subcmd === 'fish') {
    // Reset to empty array on every "!go fish" message
    const fishCaught = [];

    // Get random fish and random number of fish
    const fishType = Math.floor(Math.random() * 20);
    const fishNumber = Math.floor(Math.random() * 5) + 1;

    // Push emojis to temp array to join for message
    for (let times = 0; times < fishNumber; times++) {
      fishCaught.push(allFishEmojis[fishType]);
    }
    msg.channel.send(fishCaught.join(' '));
    msg.channel.send('You caught ' + fishNumber + ' ' + allFishNames[fishType] + '!');

    // Update database with amount
    const authorId = getAuthorId(msg);
    stopClient.query(`UPDATE fish_lists SET ${allDBNames[fishType]} = ${allDBNames[fishType]} + ${fishNumber} WHERE userid=${authorId}`);

  } else if (subcmd === 'inv') {

    // Rich embed message of inventory
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(`${msg.author}'s inventory

  **${fishList['fish']}**  x  :fish:     **${fishList['cake']}**  x  :fish_cake:      **${fishList['fishpole']}**  x  :fishing_pole_and_fish:

  **${fishList['tropical']}**  x  :tropical_fish:      **${fishList['blowfish']}**  x  :blowfish:      **${fishList['cutewhale']}**  x  :whale:

  **${fishList['bluewhale']}**  x  :whale2:      **${fishList['dolphin']}**  x  :dolphin:      **${fishList['octopus']}**  x  :octopus:
  `);
    msg.channel.send({ embed });
  }
}

export default goFish;

