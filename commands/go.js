exports.run = (msg, cmd, subcmd, admin, thisGuild, stoppedWords, deletedWords, stopWord, deleteWord, bot) => {
  if (cmd === 'go') {
    if (subcmd === 'fish') {
      fishEmojis = [':fish:', ':fish_cake:', ':fishing_pole_and_fish:', ':tropical_fish:', ':blowfish:'];
      fishNames = [' Fish', ' Fish Cake', ' Fish on a Fishing Pole', ' Tropical Fish', ' Blowfish'];
      rareFishEmojis = [':whale:', ':whale2:', ':dolphin:', ':octopus:', ':unicorn:'];
      rareFishNames = ['Cute Whale', 'Blue Whale', 'Dolphin', 'Octopus', 'Unicorn'];
      allFishEmojis = fishEmojis.concat(fishEmojis).concat(fishEmojis).concat(rareFishEmojis);
      allFishNames = fishNames.concat(fishNames).concat(fishNames).concat(rareFishNames);
      fishCaught = []; // will reset to empty array every time !go fish is msged
      const i = Math.floor(Math.random() * 20);
      const fishNumber = Math.floor(Math.random() * 5) + 1;
      for (let times = 0; times < fishNumber; times++) {
        fishCaught.push(allFishEmojis[i]);
      }
      msg.channel.send(fishCaught.join(' '));
      msg.channel.send('You caught ' + fishNumber + allFishNames[i] + '!');
    } else if (!admin && subcmd !== 'fish') {
      msg.reply('you can\'t use this command.');
    } else if (admin && typeof subcmd !== 'undefined') {
      if (stopWord !== -1) {
        stoppedWords.splice(stopWord, 1);
        msg.channel.send('`' + subcmd + '`' + ' will no longer be stopped.');
      } else if (deleteWord !==-1) {
        deletedWords.splice(deleteWord, 1);
        msg.channel.send('`' + subcmd + '`' + ' will no longer be deleted.');
      } else {
        msg.channel.send('`' + subcmd + '`' + ' was not on the list of stopped or deleted words.');
      }
    } else {
      msg.reply('what do you want to unstop?');
    }
  }
}
