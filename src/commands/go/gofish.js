const goFish = (msg, cmd, subcmd, fishList, richEmbed) => {
  if (subcmd === 'fish') {
    const fishEmojis = [':fish:', ':fish_cake:', ':fishing_pole_and_fish:', ':tropical_fish:', ':blowfish:'];
    const fishNames = ['Fish', 'Fish Cake', 'Fish on a Fishing Pole', 'Tropical Fish', 'Blowfish'];
    const rareFishEmojis = [':whale:', ':whale2:', ':dolphin:', ':octopus:', ':unicorn:'];
    const rareFishNames = ['Cute Whale', 'Blue Whale', 'Dolphin', 'Octopus', 'Unicorn'];
    const allFishEmojis = fishEmojis.concat(fishEmojis).concat(fishEmojis).concat(rareFishEmojis);
    const allFishNames = fishNames.concat(fishNames).concat(fishNames).concat(rareFishNames);
    const fishCaught = []; // will reset to empty array every time !go fish is msged
    const i = Math.floor(Math.random() * 20);
    const fishNumber = Math.floor(Math.random() * 5) + 1;
    for (let times = 0; times < fishNumber; times++) {
      fishCaught.push(allFishEmojis[i]);
    }
    msg.channel.send(fishCaught.join(' '));
    msg.channel.send('You caught ' + fishNumber + ' ' + allFishNames[i] + '!');

    // Add amount to data file
    if (i === 0 || i === 5 || i === 10) fishList[msg.author.id].fish = fishList[msg.author.id].fish + fishNumber;
    if (i === 1 || i === 6 || i === 11) fishList[msg.author.id].cake = fishList[msg.author.id].cake + fishNumber;
    if (i === 2 || i === 7 || i === 12) fishList[msg.author.id].fishPole = fishList[msg.author.id].fishPole + fishNumber;
    if (i === 3 || i === 8 || i === 13) fishList[msg.author.id].tropical = fishList[msg.author.id].tropical + fishNumber;
    if (i === 4 || i === 9 || i === 14) fishList[msg.author.id].blowfish = fishList[msg.author.id].blowfish + fishNumber;
    if (i === 5 || i === 10 || i === 15) fishList[msg.author.id].cuteWhale = fishList[msg.author.id].cuteWhale + fishNumber;
    if (i === 6 || i === 11 || i === 16) fishList[msg.author.id].blueWhale = fishList[msg.author.id].blueWhale + fishNumber;
    if (i === 7 || i === 12 || i === 17) fishList[msg.author.id].dolphin = fishList[msg.author.id].dolphin + fishNumber;
    if (i === 8 || i === 13 || i === 18) fishList[msg.author.id].octopus = fishList[msg.author.id].octopus + fishNumber;

  } else if (subcmd === 'inv') {
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(`${msg.author}'s inventory

  **${fishList[msg.author.id].fish}**  x  :fish:      **${fishList[msg.author.id].cake}**  x  :fish_cake:      **${fishList[msg.author.id].fishPole}**  x  :fishing_pole_and_fish:

  **${fishList[msg.author.id].tropical}**  x  :tropical_fish:      **${fishList[msg.author.id].blowfish}**  x  :blowfish:      **${fishList[msg.author.id].cuteWhale}**  x  :whale:

  **${fishList[msg.author.id].blueWhale}**  x  :whale2:      **${fishList[msg.author.id].dolphin}**  x  :dolphin:      **${fishList[msg.author.id].octopus}**  x  :octopus:
  `);
    msg.channel.send({embed});
  }
}

export default goFish;

