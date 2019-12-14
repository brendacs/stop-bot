import {getStrings, richEmbed} from '../constants';

const getUpdates = (msg) => {
  msg.channel.send({
    embed: richEmbed.setColor('#ff0000').setDescription(getStrings().updatesChannelMessage)
  });

  getUpdateDM(msg);
};

const getUpdateDM = (msg) => {
  msg.member.user.createDM()
    .then((channel) => {
      channel.send({
        embed: richEmbed.setColor('#ff0000').setDescription(getStrings().updatesPrivateMessage)
      });
    });
};

export default getUpdates;
