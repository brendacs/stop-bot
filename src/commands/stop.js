import {getStopMessage} from '../utils/settings';
import {addToList, getList} from '../utils/list';
import {getStrings} from '../constants';

export default function stopCmd(msg, subcmd, stopList, deleteList) {
  let mentions = msg.mentions.users;
  if (!subcmd || mentions.first()) sendStopMessage(msg, subcmd, mentions);
  else if (subcmd === 'video') msg.channel.send(getStrings().stopVideo);
  else if (subcmd === 'list') getList(msg, stopList, 'stop');
  else if (subcmd) addToList(msg, subcmd, stopList, deleteList, 'stop');
}

function sendStopMessage(msg, subcmd, mentions) {
  let mentionsNum = mentions.array().length;
  getStopMessage(msg).then(stopMessage => {
    if (!subcmd) msg.channel.send(stopMessage);
    else if (mentions.first()) msg.channel.send(`${mentions.first(mentionsNum)}\n${stopMessage}`);
    return;
  });
}
