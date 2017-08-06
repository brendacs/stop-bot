'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const getInfo = (bot, msg, cmd, richEmbed) => {
  if (cmd === 'info') {
    msg.channel.send({
      embed: richEmbed.setColor('#ff0000').setDescription('This bot is running on ' + bot.guilds.size + ' servers and ' + bot.channels.size + ' channels with ' + bot.users.size + ' users.')
    });
  }
};

exports.default = getInfo;