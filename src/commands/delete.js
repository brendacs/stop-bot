import { getToggleDM } from '../utils/getSettings';
import { reservedWords, stopClient, richEmbed } from '../constants';
import { isAdmin, isMod } from '../utils/checkPerms';
import { isOnStopList, isOnDeleteList } from '../utils/checkLists';
import { getGuildId } from '../utils/utils';

export default function deleteCmd(msg, subcmd, stopList, deleteList) {
  if (!subcmd) return;
  if (subcmd === 'list') getList(msg, deleteList);
  else if (!isNaN(subcmd) && isMod(msg)) bulkDelete(msg, subcmd);
  else if (subcmd && isNaN(subcmd)) addToList(msg, subcmd, stopList, deleteList);
  return;
}

function addToList(msg, subcmd, stopList, deleteList) {
  if (isAdmin(msg)) {
    // Check if any reserved words are set to be deleted
    let wordsToBeDeleted = subcmd.split(', ');
    for (let word of wordsToBeDeleted) {
      if (reservedWords.indexOf(word) !== -1) {
        msg.channel.send({
          embed: richEmbed.setColor('#ff0000').setDescription(`This word is reserved for bot functionality and cannot be deleted.`)
        });
        return;
      }
    }

    const isStopped = isOnStopList(stopList, subcmd);
    const isDeleted = isOnDeleteList(deleteList, subcmd);

    if (isDeleted || isStopped) {
      msg.channel.send(`\`${subcmd}\` is already on the list of words to ${isDeleted ? 'delete' : 'stop'}.`);
      return;
    }

    const guildId = getGuildId(msg);
    subcmd = subcmd.replace(/'/g, "''");
    stopClient.query(`UPDATE word_lists SET deletelist = deletelist || '{${subcmd.toLowerCase()}}' WHERE serverid=${guildId}`);
    subcmd = subcmd.replace(/''/g, "'");
    msg.channel.send(`\`${subcmd}\` will be deleted every time it appears.`);
    return;
  }

  msg.reply('you must have the proper permissions use this command.');
}

function bulkDelete(msg, subcmd) {
  let limit = parseInt(subcmd) + 1;
  if (limit >= 100) {
    msg.channel.send({
      embed: richEmbed.setColor('#ff0000').setDescription(`Number of messages must be under 100.`)
    });
    return;
  }
  msg.channel.fetchMessages({ limit: limit })
    .then((latestMessages) => {
      let mentions = msg.mentions.users;
      let mentionsNum = msg.mentions.users.array().length;
      if (mentionsNum === 0) msg.channel.bulkDelete(latestMessages);
      else {
        let latestByUser = latestMessages.filter((message) => message.author === mentions.first());
        msg.channel.bulkDelete(latestByUser);
      }
    })
    .catch(err => console.log(err));
}

function getList(msg, deleteList) {
  if (deleteList.length !== 0) {
    getToggleDM(msg).then(enabled => {
      if (enabled) {
        msg.member.createDM()
          .then(channel => {
            channel.send(`These words are currently being deleted: \`${deleteList.join(', ')}\``);
          });
      } else {
        msg.channel.send(`These words are currently being deleted: \`${deleteList.join(', ')}\``);
      }
    });
  } else {
    msg.channel.send('There are no words on the delete list.');
  }
}
