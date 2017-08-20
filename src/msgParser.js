import commands from './commands/commands.js';

const msgParser = (bot, msg, admin, mod, thisGuild, stopList, deleteList) => {
  const string = msg.content;
  
  if (msg.toString().substring(0, 1) === '!') { // if prefix is used
    const args = msg.toString().substring(1).split(' ');
    const cmd = args[0];
    const subcmd = args[1];
    if (stopList && deleteList) {
      commands(bot, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList);
    }
  } else if (msg.mentions.users.has('340404757648769025')) { // if bot is mentioned
    const args = msg.toString().split(' ');
    const cmd = args[1];
    const subcmd = args[2];
    if (stopList && deleteList) {
      commands(bot, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList);
    }
  } else {
    for (let i = 0; i < stopList.length; i++) {
      if (string.toString().toLowerCase().indexOf(stopList[i]) !== -1) {
        msg.channel.send(new Date().toString());
        msg.reply('IT\'S TIME TO STOP.');
      }
    }
    for (let i = 0; i < deleteList.length; i++) {
      if (string.toString().toLowerCase().indexOf(deleteList[i]) !== -1) {
        msg.delete(1000);
        msg.channel.send('Detected something horrible. Deleted.');
      }
    }
  }
}

export default msgParser
