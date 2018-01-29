import msgParser from './msgParser.js';
import stopCmd from './commands/stop.js';
import deleteCmd from './commands/delete.js';

export const getPrefix = async (stopClient, msg) => {
  const prefixQuery = `SELECT prefix FROM server_settings WHERE serverid='${msg.guild.id}'`;
  let prefix = await stopClient.query(prefixQuery)
    .then(result => {
      const defaultPrefix = '!';
      let p = result.rows[0]['prefix'] !== '' ? result.rows[0]['prefix'] : defaultPrefix;
      return p;
    })
    .catch(err => console.log(err));
  return prefix;
}

export const getStopMessage = async (stopClient, msg) => {
  const stopMessageQuery = `SELECT stopmessage FROM server_settings WHERE serverid='${msg.guild.id}'`;
  let stopMessage = await stopClient.query(stopMessageQuery)
    .then(result => {
      const defaultMessage = `${new Date().toString()}\nIT\'S TIME TO STOP.`;
      let message = result.rows[0]['stopmessage'] !== null ? result.rows[0]['stopmessage'] : defaultMessage;
      return message;
    })
    .catch(err => console.log(err));
  return stopMessage;
}

export const getDeleteMessage = async (stopClient, msg) => {
  const deleteMessageQuery = `SELECT deletemessage FROM server_settings WHERE serverid='${msg.guild.id}'`;
  let deleteMessage = await stopClient.query(deleteMessageQuery)
    .then(result => {
      const defaultMessage = `Detected something horrible. Deleted.`;
      let message = result.rows[0]['deletemessage'] !== null ? result.rows[0]['deletemessage'] : defaultMessage;
      return message;
    })
    .catch(err => console.log(err));
  return deleteMessage;
}
