import { getStopMessage } from '../utils/settings';
import { addToList, getList } from '../utils/list';

export default function stopCmd(msg, subcmd, stopList, deleteList) {
  let mentions = msg.mentions.users;
  if (!subcmd || mentions.first()) sendStopMessage(msg, subcmd, mentions);
  else if (subcmd === 'video') msg.channel.send('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
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
