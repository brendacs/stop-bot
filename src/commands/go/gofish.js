const goFish = (msg, cmd, subcmd, fishList, richEmbed) => {
  if (subcmd === 'fish') {
    const fishEmojis = [':fish:', ':fish_cake:', ':fishing_pole_and_fish:', ':tropical_fish:', ':blowfish:'];
    const fishNames = ['Fish', 'Fish Cake', 'Fish on a Fishing Pole', 'Tropical Fish', 'Blowfish'];
    const rareFishEmojis = [':whale:', ':whale2:', ':dolphin:', ':octopus:', ':unicorn:'];
    const rareFishNames = ['Cute Whale', 'Blue Whale', 'Dolphin', 'Octopus', 'Unicorn'];
    const allFishEmojis = fishEmojis.concat(fishEmojis).concat(fishEmojis).concat(rareFishEmojis);
    const allFishNames = fishNames.concat(fishNames).concat(fishNames).concat(rareFishNames);
    const fishCaught = []; // will reset to empty array every time user msgs "!go fish"
    const i = Math.floor(Math.random() * 20);
    const fishNumber = Math.floor(Math.random() * 5) + 1;
    for (let times = 0; times < fishNumber; times++) {
      fishCaught.push(allFishEmojis[i]);
    }
    msg.channel.send(fishCaught.join(' '));
    msg.channel.send('You caught ' + fishNumber + ' ' + allFishNames[i] + '!');

    // Add amount to data
    if (i === 0 || i === 5 || i === 10) fishList['fish'] = fishList['fish'] + fishNumber;
    if (i === 1 || i === 6 || i === 11) fishList['cake'] = fishList['cake'] + fishNumber;
    if (i === 2 || i === 7 || i === 12) fishList['fishpole'] = fishList['fishpole'] + fishNumber;
    if (i === 3 || i === 8 || i === 13) fishList['tropical'] = fishList['tropical'] + fishNumber;
    if (i === 4 || i === 9 || i === 14) fishList['blowfish'] = fishList['blowfish'] + fishNumber;
    if (i === 5 || i === 10 || i === 15) fishList['cutewhale'] = fishList['cutewhale'] + fishNumber;
    if (i === 6 || i === 11 || i === 16) fishList['bluewhale'] = fishList['bluewhale'] + fishNumber;
    if (i === 7 || i === 12 || i === 17) fishList['dolphin'] = fishList['dolphin'] + fishNumber;
    if (i === 8 || i === 13 || i === 18) fishList['octopus'] = fishList['octopus'] + fishNumber;

  } else if (subcmd === 'inv') {
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(`${msg.author}'s inventory

  **${fishList['fish']}**  x  :fish:      **${fishList['cake']}**  x  :fish_cake:      **${fishList['fishpole']}**  x  :fishing_pole_and_fish:

  **${fishList['tropical']}**  x  :tropical_fish:      **${fishList['blowfish']}**  x  :blowfish:      **${fishList['cutewhale']}**  x  :whale:

  **${fishList['cutewhale']}**  x  :whale2:      **${fishList['dolphin']}**  x  :dolphin:      **${fishList['octopus']}**  x  :octopus:
  `);
    msg.channel.send({embed});
  }
}

export default goFish;

