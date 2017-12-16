const goFish = (stopClient, msg, cmd, subcmd, richEmbed) => {
  if (subcmd === 'fish') {

    // Arrays of fish names, emojis names, and db names
    const fishEmojis = [':fish:', ':fish_cake:', ':fishing_pole_and_fish:', ':tropical_fish:', ':blowfish:'];
    const fishNames = ['Fish', 'Fish Cake', 'Fish on a Fishing Pole', 'Tropical Fish', 'Blowfish'];
    const dbNames = ['fish', 'cake', 'fishpole', 'tropical', 'blowfish'];

    const rareFishEmojis = [':whale:', ':whale2:', ':dolphin:', ':octopus:', ':unicorn:'];
    const dbRare = ['cutewhale', 'bluewhale', 'dolphin', 'octopus', 'unicorn'];
    const rareFishNames = ['Cute Whale', 'Blue Whale', 'Dolphin', 'Octopus', 'Unicorn'];

    const allFishEmojis = fishEmojis.concat(fishEmojis).concat(fishEmojis).concat(rareFishEmojis);
    const allFishNames = fishNames.concat(fishNames).concat(fishNames).concat(rareFishNames);
    const allDBNames = dbNames.concat(dbNames).concat(dbNames).concat(dbRare);

    // Reset to empty array on every "!go fish" message
    const fishCaught = [];

    // Get random fish and random number of fish
    const fishType = Math.floor(Math.random() * 20);
    const fishNumber = Math.floor(Math.random() * 5) + 1;

    // Push emojis to temp array to join for message
    for (let times = 0; times < fishNumber; times++) {
      fishCaught.push(allFishEmojis[fishType]);
    }
    msg.channel.send(fishCaught.join(' '));
    msg.channel.send('You caught ' + fishNumber + ' ' + allFishNames[fishType] + '!');

    // Update database with amount
    stopClient.query(`UPDATE fish_lists SET ${allDBNames[fishType]} = ${allDBNames[fishType]} + fishNumber WHERE userid=${msg.author.id}`);

  } else if (subcmd === 'inv') {

    let fish = stopClient.query(`SELECT fish FROM fish_lists WHERE userid=${msg.author.id}`);
    let cake = stopClient.query(`SELECT cake FROM fish_lists WHERE userid=${msg.author.id}`);
    let fishpole = stopClient.query(`SELECT fishpole FROM fish_lists WHERE userid=${msg.author.id}`);
    let tropical = stopClient.query(`SELECT tropical FROM fish_lists WHERE userid=${msg.author.id}`);
    let blowfish = stopClient.query(`SELECT blowfish FROM fish_lists WHERE userid=${msg.author.id}`);
    let cutewhale = stopClient.query(`SELECT cutewhale FROM fish_lists WHERE userid=${msg.author.id}`);
    let bluewhale = stopClient.query(`SELECT bluewhale FROM fish_lists WHERE userid=${msg.author.id}`);
    let dolphin = stopClient.query(`SELECT dolphin FROM fish_lists WHERE userid=${msg.author.id}`);
    let octopus = stopClient.query(`SELECT octopus FROM fish_lists WHERE userid=${msg.author.id}`);

    // Rich embed message of inventory
    const embed = richEmbed
      .setColor('#ff0000')
      .setDescription(`${msg.author}'s inventory

  **${fish}**  x  :fish:     * *${fishList['cake']}**  x  :fish_cake:      **${fishList['fishpole']}**  x  :fishing_pole_and_fish:

  **${fishList['tropical']}**  x  :tropical_fish:      **${fishList['blowfish']}**  x  :blowfish:      **${fishList['cutewhale']}**  x  :whale:

  **${fishList['bluewhale']}**  x  :whale2:      **${fishList['dolphin']}**  x  :dolphin:      **${fishList['octopus']}**  x  :octopus:
  `);
    msg.channel.send({embed});
  }
}

export default goFish;

