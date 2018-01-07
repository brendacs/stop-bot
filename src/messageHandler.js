import Discord from 'discord.js';
import fs from 'fs';
import pg from 'pg';
import getPrefix from './msgParser.js';
import { checkAdmin, checkMod } from './checkPerms.js';

const messageHandler = (bot, stopClient) => {
  const channel = new Discord.Channel();
  const richEmbed = new Discord.RichEmbed();

  bot.on('message', (msg) => {
    if (msg.author.bot) return;

    const thisGuild = msg.guild.id;
    const thisAuthor = msg.author.id;

    let admin = checkAdmin(msg);
    let mod = checkMod(msg);

    stopClient.query(`SELECT EXISTS (SELECT 1 FROM server_settings WHERE serverid=${thisGuild})`)
    .then(result => {
      let guildExists = result.rows[0]['exists'];
      if (!guildExists) {
        stopClient.query(`INSERT INTO server_settings (serverid, prefix) VALUES (${thisGuild}, '')`)
          .then(result => {
            console.log('inserted settings');
          })
          .catch(err => console.log(err));
      }
    });

    const wordListQuery = `SELECT * FROM word_lists WHERE serverid = '${thisGuild}'`;
    let stopList;
    let deleteList;

    stopClient.query(`SELECT EXISTS (SELECT 1 FROM word_lists WHERE serverid=${thisGuild})`)
      .then(result => {
        let guildExists = result.rows[0]['exists'];
        if (!guildExists) {
          stopClient.query(`INSERT INTO word_lists (serverid, stoplist, deletelist) VALUES (${thisGuild}, '{}', '{}')`)
            .then(result => {
              console.log('inserted');
              bot.user.setPresence({status: 'online', game: {name: `!go fish | !help | ${bot.guilds.size} servers`, type: 0}});
            })
            .catch(err => console.log(err));
        }
        stopClient.query(wordListQuery)
          .then(result => {
            stopList = result.rows[0]['stoplist'];
            deleteList = result.rows[0]['deletelist'];
            getPrefix(bot, stopClient, msg, admin, mod, thisGuild, stopList, deleteList);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.error(err.stack));
  });
}

export default messageHandler;
