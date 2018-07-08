import { getStopMessage, getToggleDM } from '../utils/getSettings';
import { reservedWords, stopClient, richEmbed } from '../constants';
import { isAdmin } from '../utils/checkPerms';
import { isOnStopList, isOnDeleteList } from '../utils/checkLists';
import { getGuildId } from '../utils/utils';

const stopCmd = (msg, cmd, subcmd, stopList, deleteList) => {
  let mentions = msg.mentions.users;
  let mentionsNum = msg.mentions.users.array().length;

  // check if any reserved words are set to be deleted
  let wordsToBeStopped = subcmd.split(', ');
  for (let word of wordsToBeStopped) {
    if (subcmd !== 'video' && reservedWords.indexOf(word) !== -1) {
      msg.channel.send({
        embed: richEmbed.setColor('#ff0000').setDescription(`This word is reserved for bot functionality and cannot be stopped.`)
      });
      return;
    }
  }

  getStopMessage(msg).then(stopMessage => {
    if (!subcmd) {
      msg.channel.send(stopMessage);
    } else if (mentions.first() !== undefined) {
      msg.channel.send(`${mentions.first(mentionsNum)}\n${stopMessage}`);
    } else if (subcmd === 'video') {
      msg.channel.send('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
    } else if (subcmd === 'list') {
      if (stopList.length !== 0) {
        getToggleDM(msg).then(enabled => {
          if (enabled) {
            msg.member.createDM()
              .then(channel => {
                channel.send('These words are currently being stopped: `' + stopList.join(', ') + '`');
              });
          } else {
            msg.channel.send('These words are currently being stopped: `' + stopList.join(', ') + '`');
          }
        });
      } else {
        msg.channel.send('There are no words on the stop list.');
      }
    } else if (typeof subcmd !== 'undefined') {
      if (isAdmin(msg)) {

        const guildId = getGuildId(msg);
        
        const isStopped = isOnStopList(stopList, subcmd);
        const isDeleted = isOnDeleteList(deleteList, subcmd);

        if (isStopped) {
          msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to stop.');
        } else if (isDeleted) {
          msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to delete.');
        } else {
          subcmd = subcmd.replace(/'/g, "''");
          stopClient.query(`UPDATE word_lists SET stoplist = stoplist || '{${subcmd.toLowerCase()}}' WHERE serverid=${guildId}`);
          subcmd = subcmd.replace(/''/g, "'");
          msg.channel.send('`' + subcmd + '`' + ' will now be stopped.');
        }
      } else if (!isAdmin(msg)) {
        msg.reply('you can\'t use this command.');
      }
    } else return;
  });
}

export default stopCmd;
