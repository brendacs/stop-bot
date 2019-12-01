import { getToggleDM } from './settings';
import { reservedWords, stopClient, richEmbed } from '../constants';
import { isAdmin } from './perms';
import { getGuildId } from './utils';

export function addToList(msg, subcmd, stopList, deleteList, listName) {
  if (isAdmin(msg)) {
    let verb = listName === 'stop' ? 'stopped' : 'deleted';
    let dblist = listName === 'stop' ? 'stoplist' : 'deletelist';

    // Check if any reserved words are set to be stopped
    let wordsToBeAdded = subcmd.split(', ');
    for (let word of wordsToBeAdded) {
      if (reservedWords.indexOf(word) !== -1) {
        msg.channel.send({
          embed: richEmbed.setColor('#ff0000').setDescription(`This word is reserved for bot functionality and cannot be ${verb}.`)
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
    stopClient.query(`UPDATE word_lists SET ${dblist} = ${dblist} || '{${subcmd.toLowerCase()}}' WHERE serverid=${guildId}`);
    subcmd = subcmd.replace(/''/g, "'");
    msg.channel.send(`\`${subcmd}\` will now be ${verb}.`);
    return;
  }

  msg.reply('you must have the proper permissions use this command.');
}

export function getList(msg, list, listName) {
  let verb = listName === 'stop' ? 'stopped' : 'deleted';
  if (list.length !== 0) {
    getToggleDM(msg).then(enabled => {
      if (enabled) {
        msg.member.createDM()
          .then(channel => {
            channel.send(`These words are currently being ${verb}: \`${list.join(', ')}\``);
          });
      } else {
        msg.channel.send(`These words are currently being ${verb}: \`${list.join(', ')}\``);
      }
    });
  } else {
    msg.channel.send(`There are no words on the ${listName} list.`);
  }
}

export function isOnStopList(stopList, subcmd) {
  if (stopList.indexOf(subcmd) !== -1) {
    return true;
  }
  return false;
}

export function isOnDeleteList(deleteList, subcmd) {
  if (deleteList.indexOf(subcmd) !== -1) {
    return true;
  }
  return false;
}
