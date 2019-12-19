import {getToggleDM} from './settings';
import {getStrings, reservedWords, richEmbed, stopClient} from '../constants';
import {isAdmin} from './perms';
import {getGuildId} from './utils';

export function addToList(msg, subcmd, stopList, deleteList, listName) {
  if (isAdmin(msg)) {
    const [verb, dblist] = listName === 'stop' ? ['stopped', 'stoplist'] : ['deleted', 'deletelist'];

    // Check if any reserved words are set to be stopped
    let wordsToBeAdded = subcmd.split(', ');
    for (let word of wordsToBeAdded) {
      if (reservedWords.indexOf(word) !== -1) {
        msg.channel.send({
          embed: richEmbed.setColor('#ff0000').setDescription(getStrings(verb).listReserved)
        });
        return;
      }
    }

    const isStopped = isOnStopList(stopList, subcmd);
    const isDeleted = isOnDeleteList(deleteList, subcmd);

    if (isDeleted || isStopped) {
      msg.channel.send(getStrings(subcmd, isDeleted).listWordExists);
      return;
    }

    const guildId = getGuildId(msg);
    subcmd = subcmd.replace(/'/g, '\'\'');
    stopClient.query(`UPDATE word_lists SET ${dblist} = ${dblist} || '{${subcmd.toLowerCase()}}' WHERE serverid=${guildId}`);
    subcmd = subcmd.replace(/'/g, '\'');
    msg.channel.send(getStrings(subcmd, verb).listWordAdded);
    return;
  }

  msg.reply(getStrings.permissionsReply);
}

export function getList(msg, list, listName) {
  const verb = listName === 'stop' ? 'stopped' : 'deleted';
  if (list.length !== 0) {
    getToggleDM(msg).then(enabled => {
      if (enabled) {
        msg.member.createDM()
          .then(channel => {
            channel.send(getStrings(verb, list).listWords);
          });
      } else {
        msg.channel.send(getStrings(verb, list).listWords);
      }
    });
  } else {
    msg.channel.send(getStrings(listName).listNoWords);
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
