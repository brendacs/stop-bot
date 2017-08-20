import Discord from 'discord.js';
import fs from 'fs';
import commands from './commands/commands.js';
import pg from 'pg';

const messageHandler = (bot, stopClient) => {
  const channel = new Discord.Channel();
  const richEmbed = new Discord.RichEmbed();

  bot.on('message', (msg) => {
    if (msg.author.bot) return;

    const string = msg.content;
    const thisGuild = msg.guild.id;
    const thisAuthor = msg.author;

    let admin;
    let mod;

    if (msg.member == null) {
      const member = msg.guild.fetchMember(msg.author);
      admin = member.hasPermission('ADMINISTRATOR');
      mod = member.hasPermission('MANAGE_MESSAGES');
    } else {
      admin = msg.member.hasPermission('ADMINISTRATOR');
      mod = msg.member.hasPermission('MANAGE_MESSAGES');
    }

    let stopList;
    let deleteList;
    let fishList;

    const wordListQuery = `SELECT * from word_lists WHERE serverid = '${thisGuild}'`;
    const fishListQuery = `SELECT * from fish_lists WHERE userid = '${thisAuthor}'`;

    stopClient.query(wordListQuery, function(err, result) {
      console.log('here 1')
      if (!result || !result.rows[0]) {
        stopClient.query(`INSERT INTO word_lists VALUES (${thisGuild}, '{}', '{}')`);
        stopClient.query(wordListQuery, function(err, result) {
          stopList = result.rows[0]['stoplist'];
          deleteList = result.rows[0]['deletelist'];
          console.log('here 2')
        });
      } else {
        stopList = result.rows[0]['stoplist'];
        deleteList = result.rows[0]['deletelist'];
      }
    });

    stopClient.query(fishListQuery, function(err, result) {
      if (!result || !result.rows[0]) {
        stopClient.query(`INSERT INTO fish_lists VALUES (${thisAuthor}, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)`);
        stopClient.query(fishListQuery, function(err, result) {
          fishList = result.rows[0];
        })
      } else {
        fishList = result.rows[0];
      }
    })

    if (msg.toString().substring(0, 1) === '!') { // if prefix is used
      const args = msg.toString().substring(1).split(' ');
      const cmd = args[0];
      const subcmd = args[1];
      if (stopList && deleteList) {
        commands(bot, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, fishList);
      }
    } else if (msg.mentions.users.has('340404757648769025')) { // if bot is mentioned
      const args = msg.toString().split(' ');
      const cmd = args[1];
      const subcmd = args[2];
      if (stopList && deleteList) {
        commands(bot, msg, cmd, subcmd, admin, mod, thisGuild, stopList, deleteList, fishList);
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
  });
}

export default messageHandler;
