import initFishing from './goFish';
import {stopClient} from '../../constants';
import {isAdmin} from '../../utils/perms';
import {isOnStopList, isOnDeleteList} from '../../utils/list';
import {getGuildId} from '../../utils/utils';

const goCmd = (msg, subcmd, stopList, deleteList) => {
  const guildId = getGuildId(msg);
  if (subcmd === 'fish' || subcmd === 'inv') {
    initFishing(msg, subcmd);
    return;
  } else if (!isAdmin(msg)) {
    msg.reply('you must have the proper permissions use this command.');
  } else if (isAdmin(msg) && subcmd) {
    const isStopped = isOnStopList(stopList, subcmd);
    const isDeleted = isOnDeleteList(deleteList, subcmd);

    if (isStopped) {
      subcmd = subcmd.replace(/'/g, '\'\'');
      stopClient.query(`UPDATE word_lists SET stoplist = array_remove(stoplist, '${subcmd}') WHERE serverid=${guildId}`);
      subcmd = subcmd.replace(/'/g, '\'');
      msg.channel.send(`\`${subcmd}\` will no longer be stopped.`);
    } else if (isDeleted) {
      subcmd = subcmd.replace(/'/g, '\'\'');
      stopClient.query(`UPDATE word_lists SET deletelist = array_remove(deletelist, '${subcmd}') WHERE serverid=${guildId}`);
      subcmd = subcmd.replace(/'/g, '\'');
      msg.channel.send(`\`${subcmd}\` will no longer be deleted.`);
    } else {
      msg.channel.send(`\`${subcmd}\` was not on the list of stopped or deleted words.`);
    }
  } else {
    msg.reply('please provide the word you want to remove from a list.');
  }
};

export default goCmd;
