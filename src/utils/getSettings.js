import msgParser from '../msgParser';
import stopCmd from '../commands/stop';
import deleteCmd from '../commands/delete';
import { stopClient } from '../constants';
import { getGuildId } from './utils';

export const getPrefix = async (msg) => {
  const guildId = getGuildId(msg);
  const prefixQuery = `SELECT prefix FROM server_settings WHERE serverid='${guildId}'`;
  let prefix = await stopClient.query(prefixQuery)
    .then(result => {
      const defaultPrefix = '!';
      let p = result.rows[0]['prefix'] !== '' ? result.rows[0]['prefix'] : defaultPrefix;
      return p;
    })
    .catch(err => console.log(err));
  return prefix;
}

export const getStopMessage = async (msg) => {
  const guildId = getGuildId(msg);
  const stopMessageQuery = `SELECT stopmessage FROM server_settings WHERE serverid='${guildId}'`;
  let stopMessage = await stopClient.query(stopMessageQuery)
    .then(result => {
      const defaultMessage = `${new Date().toString()}\nIT\'S TIME TO STOP.`;
      let message = result.rows[0]['stopmessage'] !== null ? result.rows[0]['stopmessage'] : defaultMessage;
      return message;
    })
    .catch(err => console.log(err));
  return stopMessage;
}

export const getDeleteMessage = async (msg) => {
  const guildId = getGuildId(msg);
  const deleteMessageQuery = `SELECT deletemessage FROM server_settings WHERE serverid='${guildId}'`;
  let deleteMessage = await stopClient.query(deleteMessageQuery)
    .then(result => {
      const defaultMessage = `Detected something horrible. Deleted.`;
      let message = result.rows[0]['deletemessage'] !== null ? result.rows[0]['deletemessage'] : defaultMessage;
      return message;
    })
    .catch(err => console.log(err));
  return deleteMessage;
}

export const getToggleDM = async (msg) => {
  const guildId = getGuildId(msg);
  const toggleDMQuery = `SELECT dmlists FROM server_settings WHERE serverid='${guildId}'`;
  let enabled = await stopClient.query(toggleDMQuery)
    .then(result => {
      let status = result.rows[0]['dmlists'] ? true : false;
      return status;
    })
    .catch(err => console.log(err));
  return enabled;
}
