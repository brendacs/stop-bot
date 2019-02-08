import Discord from 'discord.js';
import fs from 'fs';
import pg from 'pg';
import msgParser from './msgParser';
import { stopClient } from './constants';
import { getGuildId } from './utils/utils';

const checkLists = (bot, msg) => {
  if (msg.author.bot) return;

  const guildId = getGuildId(msg);

  stopClient.query(`SELECT EXISTS (SELECT 1 FROM server_settings WHERE serverid=${guildId})`)
  .then(result => {
    let guildExists = result.rows[0]['exists'];
    if (!guildExists) {
      stopClient.query(`INSERT INTO server_settings (serverid, prefix) VALUES (${guildId}, '')`)
        .then(result => {
          console.log('inserted settings');
        })
        .catch(err => console.log(err));
    }
  });

  const wordListQuery = `SELECT * FROM word_lists WHERE serverid = '${guildId}'`;
  let stopList;
  let deleteList;

  stopClient.query(`SELECT EXISTS (SELECT 1 FROM word_lists WHERE serverid=${guildId})`)
    .then(result => {
      let guildExists = result.rows[0]['exists'];
      if (!guildExists) {
        stopClient.query(`INSERT INTO word_lists (serverid, stoplist, deletelist) VALUES (${guildId}, '{}', '{}')`)
          .then(result => {
            console.log('inserted');
            bot.user.setPresence({status: 'online', game: {name: `!help | ${bot.guilds.size} servers`, type: 0}});
          })
          .catch(err => console.log(err));
      }
      stopClient.query(wordListQuery)
        .then(result => {
          stopList = result.rows[0]['stoplist'];
          deleteList = result.rows[0]['deletelist'];
          msgParser(bot, msg, stopList, deleteList);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err.stack));
}

const messageHandler = (bot) => {
  bot.on('message', (msg) => {
    checkLists(bot, msg);
  });

  bot.on('messageUpdate', (old, newMsg) => {
    checkLists(bot, newMsg);
  });
};

export default messageHandler;
