import {
  allDBNames,
  allFishEmojis,
  allFishNames,
  coolDownMinutesFish,
  coolDownMinutesInv,
  getStrings,
  richEmbed,
  stopClient
} from '../../constants';
import {getAuthorId} from '../../utils/utils';

let nextAllowedFishCapture = 0;
let nextAllowedInvOpen = 0;
let allowedFishTimes = {};
let allowedInvTimes = {};

export default function initFishing(msg, subcmd) {
  let fishList;
  const authorId = getAuthorId(msg);
  const fishListQuery = `SELECT * FROM fish_lists WHERE userid = '${authorId}'`;

  // Create or select fish list in DB
  stopClient.query(`SELECT EXISTS (SELECT 1 FROM fish_lists WHERE userid=${authorId})`)
    .then(result => {
      let userExists = result.rows[0]['exists'];
      if (!userExists) {
        stopClient.query(`INSERT INTO fish_lists VALUES (${authorId}, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)`)
          .then(() => {
            // console.log('inserted');
          });
      }

      // Go fish
      if (subcmd === 'fish') {
        if (!allowedFishTimes[authorId] || allowedFishTimes[authorId] <= Date.now()) {
          goFish(msg);
          nextAllowedFishCapture = msg.createdTimestamp + coolDownMinutesFish;
          allowedFishTimes[authorId] = nextAllowedFishCapture;
        } else {
          msg.channel.send(getStrings(allowedFishTimes[authorId]).goFish.repairRod);
        }
        return;
      }

      stopClient.query(fishListQuery)
        .then(result => {
          fishList = result.rows[0];

          // See inventory
          if (subcmd === 'inv') {
            console.log(allowedInvTimes[authorId], Date.now());
            if (!allowedInvTimes[authorId] || allowedInvTimes[authorId] <= Date.now()) {
              goInv(msg, fishList);
              nextAllowedInvOpen = msg.createdTimestamp + coolDownMinutesInv;
              allowedInvTimes[authorId] = nextAllowedInvOpen;
            } else {
              msg.channel.send(getStrings(allowedInvTimes[authorId]).goFish.restInv);
            }
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err.stack));
}

const goFish = (msg) => {
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
};

const goInv = (msg, fishList) => {
  // Rich embed message of inventory
  const embed = richEmbed
    .setColor('#ff0000')
    .setDescription(getStrings(msg.author, fishList).goFish.inventoryList);
  msg.channel.send({embed});
};
