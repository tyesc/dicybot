const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const { defaultDiceDropdown } = require('../services/commons');
const { translate } = require('../languages');

module.exports = n => {
  return  new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
        .setCustomId('select_dice')
        .setPlaceholder(translate('cmd.dropdown.dice.placeholder'))
        .addOptions(defaultDiceDropdown(n)),
    );
}
