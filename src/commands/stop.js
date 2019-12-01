import { getStopMessage, getToggleDM } from '../utils/settings';
import { reservedWords, stopClient, richEmbed } from '../constants';
import { isAdmin } from '../utils/perms';
import { isOnStopList, isOnDeleteList } from '../utils/list';
import { getGuildId } from '../utils/utils';

export default function stopCmd(msg, subcmd, stopList, deleteList) {
  let mentions = msg.mentions.users;
  if (!subcmd || mentions.first()) sendStopMessage(msg, subcmd, mentions);
  else if (subcmd === 'video') msg.channel.send('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
  else if (subcmd === 'list') getList(msg, stopList);
  else if (subcmd) addToList(msg, subcmd, stopList, deleteList);
}

function addToList(msg, subcmd, stopList, deleteList) {
  if (isAdmin(msg)) {
    // Check if any reserved words are set to be stopped
    let wordsToBeStopped = subcmd.split(', ');
    for (let word of wordsToBeStopped) {
      if (subcmd !== 'video' && reservedWords.indexOf(word) !== -1) {
        msg.channel.send({
          embed: richEmbed.setColor('#ff0000').setDescription(`This word is reserved for bot functionality and cannot be stopped.`)
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
    stopClient.query(`UPDATE word_lists SET stoplist = stoplist || '{${subcmd.toLowerCase()}}' WHERE serverid=${guildId}`);
    subcmd = subcmd.replace(/''/g, "'");
    msg.channel.send(`\`${subcmd}\` will now be stopped.`);
    return;
  }

  msg.reply('you must have the proper permissions use this command.');
}

function getList(msg, stopList) {
  if (stopList.length !== 0) {
    getToggleDM(msg).then(enabled => {
      if (enabled) {
        msg.member.createDM()
          .then(channel => {
            channel.send(`These words are currently being stopped: \`${stopList.join(', ')}\``);
          });
      } else {
        msg.channel.send(`These words are currently being stopped: \`${stopList.join(', ')}\``);
      }
    });
  } else {
    msg.channel.send('There are no words on the stop list.');
  }
}

function sendStopMessage(msg, subcmd, mentions) {
  let mentionsNum = mentions.array().length;
  getStopMessage(msg).then(stopMessage => {
    if (!subcmd) msg.channel.send(stopMessage);
    else if (mentions.first()) msg.channel.send(`${mentions.first(mentionsNum)}\n${stopMessage}`);
    return;
  });
}
