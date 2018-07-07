import { getToggleDM } from '../utils/getSettings';
import { reservedWords, stopClient, richEmbed } from '../constants';
import { isAdmin, isMod } from '../utils/checkPerms';

const deleteCmd = (msg, cmd, subcmd, thirdcmd, thisGuild, stopList, deleteList, isStopped, isDeleted) => {
  if (!subcmd) return;

  // check if any reserved words are set to be deleted
  let wordsToBeDeleted = subcmd.split(', ');
  for (let word of wordsToBeDeleted) {
    if (reservedWords.indexOf(word) !== -1) {
      msg.channel.send({
        embed: richEmbed.setColor('#ff0000').setDescription(`This word is reserved for bot functionality and cannot be deleted.`)
      });
      return;
    }
  }

  if (subcmd === 'list') {
    if (deleteList.length !== 0) {
      getToggleDM(msg).then(enabled => {
        if (enabled) {
          msg.member.createDM()
            .then(channel => {
              channel.send('These words are currently being deleted: `' + deleteList.join(', ') + '`');
            });
        } else {
          msg.channel.send('These words are currently being deleted: `' + deleteList.join(', ') + '`');
        }
      });
    } else {
      msg.channel.send('There are no words on the delete list.')
    }
  } else if (!isNaN(subcmd) && isMod(msg)) {
    let limit = parseInt(subcmd) + 1;
    if (limit >= 100) {
      msg.channel.send({
        embed: richEmbed.setColor('#ff0000').setDescription(`Number of messages must be under 100.`)
      });
      return;
    }
    msg.channel.fetchMessages({limit: limit})
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
  } else if (subcmd && isNaN(subcmd)) {
    if (isAdmin(msg)) {
      if (isDeleted) {
        msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to delete.');
      } else if (isStopped) {
        msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to stop.');
      } else {
        subcmd = subcmd.replace(/'/g, "''");
        stopClient.query(`UPDATE word_lists SET deletelist = deletelist || '{${subcmd.toLowerCase()}}' WHERE serverid=${thisGuild}`);
        subcmd = subcmd.replace(/''/g, "'");
        msg.channel.send('`' + subcmd + '`' + ' will be deleted every time it appears.');
      }
    } else if (!isAdmin(msg)) {
      msg.reply('you can\'t use this command.');
    }
  } else {
    return;
  }
}

export default deleteCmd;
