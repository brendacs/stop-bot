import initFishing from './goFish';
import {getStrings, stopClient} from '../../constants';
import {isAdmin} from '../../utils/perms';
import {isOnStopList, isOnDeleteList} from '../../utils/list';
import {getGuildId} from '../../utils/utils';

const goCmd = (msg, subcmd, stopList, deleteList) => {
  const guildId = getGuildId(msg);
  if (subcmd === 'fish' || subcmd === 'inv') {
    initFishing(msg, subcmd);
    return;
  } else if (!isAdmin(msg)) {
    msg.reply(getStrings().permissionsReply);
  } else if (isAdmin(msg) && subcmd) {
    const isStopped = isOnStopList(stopList, subcmd);
    const isDeleted = isOnDeleteList(deleteList, subcmd);

    if (isStopped) {
      subcmd = subcmd.replace(/'/g, '\'\'');
      stopClient.query(`UPDATE word_lists SET stoplist = array_remove(stoplist, '${subcmd}') WHERE serverid=${guildId}`);
      subcmd = subcmd.replace(/'/g, '\'');
      msg.channel.send(getStrings(subcmd).go.removedStopWord);
    } else if (isDeleted) {
      subcmd = subcmd.replace(/'/g, '\'\'');
      stopClient.query(`UPDATE word_lists SET deletelist = array_remove(deletelist, '${subcmd}') WHERE serverid=${guildId}`);
      subcmd = subcmd.replace(/'/g, '\'');
      msg.channel.send(getStrings(subcmd).go.removedDeleteWord);
    } else {
      msg.channel.send(getStrings(subcmd).go.wordDoesNotExist);
    }
  } else {
    msg.reply(getStrings().go.noWordGivenReply);
  }
};

export default goCmd;
