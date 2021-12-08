const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const { defaultDiceDropdown } = require('../services/commons');

module.exports = n => {
  return  new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
        .setCustomId('select_dice')
        .setPlaceholder('Sélectionner un dé')
        .addOptions(defaultDiceDropdown(n)),
    );
}
