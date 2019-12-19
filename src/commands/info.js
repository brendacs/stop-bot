import {getStrings, richEmbed} from '../constants';

const getInfo = (bot, msg) => {
  msg.channel.send({
    embed: richEmbed.setColor('#ff0000').setDescription(getStrings(bot).infoText)
  });
};

export default getInfo;
