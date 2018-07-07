import goFish from './goFish';
import {
  coolDownMinutesFish,
  coolDownMinutesInv,
  stopClient
} from '../../constants';
import { isAdmin } from '../../utils/checkPerms';
import { isOnStopList, isOnDeleteList } from '../utils/checkLists';

let nextAllowedFishCapture = 0;
let nextAllowedInvOpen = 0;
let allowedFishTimes = {};
let allowedInvTimes = {};

const goCmd = (msg, cmd, subcmd, thisGuild, stopList, deleteList) => {
  if (subcmd === 'fish' || subcmd === 'inv') {
    let fishList;
    const thisAuthor = msg.author.id;
    const fishListQuery = `SELECT * FROM fish_lists WHERE userid = '${thisAuthor}'`;

    // Create or select fish list in DB
    stopClient.query(`SELECT EXISTS (SELECT 1 FROM fish_lists WHERE userid=${thisAuthor})`)
      .then(result => {
        let userExists = result.rows[0]['exists'];
        if (!userExists) {
          stopClient.query(`INSERT INTO fish_lists VALUES (${thisAuthor}, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)`)
            .then(result => {console.log('inserted')})
        }
        stopClient.query(fishListQuery)
          .then(result => {
            fishList = result.rows[0];

            // Go fish
            if (subcmd === 'fish') {
              if (!allowedFishTimes[msg.author.id] || allowedFishTimes[msg.author.id] <= Date.now()) {
                goFish(msg, cmd, subcmd, fishList);
                nextAllowedFishCapture = msg.createdTimestamp + coolDownMinutesFish;
                allowedFishTimes[msg.author.id] = nextAllowedFishCapture;
              } else {
                msg.channel.send('Your fishing rod is broken. It will require ' + Math.floor((allowedFishTimes[msg.author.id] - Date.now()) / 1000) + ' more seconds to repair.');
              }
            }

            // See inventory
            else if (subcmd === 'inv') {
              if (!allowedInvTimes[msg.author.id] || allowedInvTimes[msg.author.id] <= Date.now()) {
                goFish(msg, cmd, subcmd, fishList);
                nextAllowedInvOpen = msg.createdTimestamp + coolDownMinutesInv;
                allowedInvTimes[msg.author.id] = nextAllowedInvOpen;
              } else {
                msg.channel.send('Your inventory is heavy. You will require ' + Math.floor((allowedInvTimes[msg.author.id] - Date.now()) / 1000) + ' more seconds to rest.');
              }
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.error(err.stack));
  }

  // For subcmds that are not fish or inv
  else if (!isAdmin(msg) && subcmd !== 'fish' && subcmd !== 'inv') {
    msg.reply('you can\'t use this command.');
  } else if (isAdmin(msg) && typeof subcmd !== 'undefined') {
    const isStopped = isOnStopList(stopList, subcmd);
    const isDeleted = isOnDeleteList(deleteList, subcmd);
    
    if (isStopped) {
      subcmd = subcmd.replace(/'/g, "''");
      stopClient.query(`UPDATE word_lists SET stoplist = array_remove(stoplist, '${subcmd}') WHERE serverid=${thisGuild}`);
      subcmd = subcmd.replace(/''/g, "'");
      msg.channel.send('`' + subcmd + '`' + ' will no longer be stopped.');
    } else if (isDeleted) {
      subcmd = subcmd.replace(/'/g, "''");
      stopClient.query(`UPDATE word_lists SET deletelist = array_remove(deletelist, '${subcmd}') WHERE serverid=${thisGuild}`);
      subcmd = subcmd.replace(/''/g, "'");
      msg.channel.send('`' + subcmd + '`' + ' will no longer be deleted.');
    } else {
      msg.channel.send('`' + subcmd + '`' + ' was not on the list of stopped or deleted words.');
    }
  } else {
    msg.reply('what do you want to unstop?');
  }
}

export default goCmd;
