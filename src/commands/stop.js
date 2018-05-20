import { getStopMessage, getToggleDM } from '../getSettings.js';

const stopCmd = (stopClient, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, isStopped, isDeleted, richEmbed) => {
  let mentions = msg.mentions.users;
  let mentionsNum = msg.mentions.users.array().length;

  getStopMessage(stopClient, msg).then(stopMessage => {
    const reserved = ['help', 'info', 'updates', 'stop', 'delete', 'go', 'set', 'fish', 'inv', 'prefix'];
    if (!subcmd) {
      msg.channel.send(stopMessage);
    } else if (reserved.indexOf(subcmd) !== -1) {
      msg.channel.send({
        embed: richEmbed.setColor('#ff0000').setDescription(`This word is reserved for bot functionality and cannot be stopped.`)
      });
      return;
    } else if (mentions.first() !== undefined) {
      msg.channel.send(`${mentions.first(mentionsNum)}\n${stopMessage}`);
    } else if (subcmd === 'video') {
      msg.channel.send('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
    } else if (subcmd === 'list') {
      if (stopList.length !== 0) {
        getToggleDM(stopClient, msg).then(enabled => {
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
      if (admin) {
        if (isStopped) {
          msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to stop.');
        } else if (isDeleted) {
          msg.channel.send('`' + subcmd + '`' + ' is already on the list of words to delete.');
        } else {
          subcmd = subcmd.replace(/'/g, "''");
          stopClient.query(`UPDATE word_lists SET stoplist = stoplist || '{${subcmd.toLowerCase()}}' WHERE serverid=${thisGuild}`);
          subcmd = subcmd.replace(/''/g, "'");
          msg.channel.send('`' + subcmd + '`' + ' will now be stopped.');
        }
      } else if (!admin) {
        msg.reply('you can\'t use this command.');
      }
    } else return;
  });
}

export default stopCmd;
