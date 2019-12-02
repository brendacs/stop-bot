import {richEmbed} from '../constants';
import {isMod} from '../utils/perms';
import {addToList, getList} from '../utils/list';

export default function deleteCmd(msg, subcmd, stopList, deleteList) {
  if (!subcmd) return;
  if (subcmd === 'list') getList(msg, deleteList, 'delete');
  else if (!isNaN(subcmd) && isMod(msg)) bulkDelete(msg, subcmd);
  else if (subcmd && isNaN(subcmd)) addToList(msg, subcmd, stopList, deleteList, 'delete');
  return;
}

function bulkDelete(msg, subcmd) {
  let limit = parseInt(subcmd) + 1;
  if (limit >= 100) {
    msg.channel.send({
      embed: richEmbed.setColor('#ff0000').setDescription('Number of messages must be under 100.')
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
}
