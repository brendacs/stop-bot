import Discord from 'discord.js';
import fs from 'fs';
import pg from 'pg';
import msgParser from './msgParser';

const messageHandler = (bot, stopClient) => {
  const channel = new Discord.Channel();
  const richEmbed = new Discord.RichEmbed();

  bot.on('message', (msg) => {
    if (msg.author.bot) return;

    const thisGuild = msg.guild.id;
    const thisAuthor = msg.author.id;

    let admin;
    let mod;

    if (msg.member == null) {
      // insert null member into cache
      msg.guild.fetchMember(msg.author, true);
      
      // check permissions of member
      admin = msg.member.hasPermission('ADMINISTRATOR');
      mod = msg.member.hasPermission('MANAGE_MESSAGES');
    } else {
      admin = msg.member.hasPermission('ADMINISTRATOR');
      mod = msg.member.hasPermission('MANAGE_MESSAGES');
    }

    const wordListQuery = `SELECT * FROM word_lists WHERE serverid = '${thisGuild}'`;
    let stopList;
    let deleteList;

    stopClient.query(`SELECT EXISTS (SELECT 1 FROM word_lists WHERE serverid=${thisGuild})`)
      .then(result => {
        let guildExists = result.rows[0]['exists'];
        if (!guildExists) {
          stopClient.query(`INSERT INTO word_lists (serverid, stoplist, deletelist) VALUES (${thisGuild}, '{}', '{}')`)
            .then(result => {console.log('inserted')});
        }
        stopClient.query(wordListQuery)
          .then(result => {
            stopList = result.rows[0]['stoplist'];
            deleteList = result.rows[0]['deletelist'];
            msgParser(bot, stopClient, msg, admin, mod, thisGuild, stopList, deleteList);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.error(err.stack));
  });
}

export default messageHandler;
