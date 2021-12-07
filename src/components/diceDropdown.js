const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const { DEFAULT_DICE_DROPDOWN } = require('../services/commons');
const { translate } = require('../languages');

module.exports = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('select_dice')
      .setPlaceholder(translate('cmd.dropdown.dice.placeholder'))
      .addOptions(DEFAULT_DICE_DROPDOWN),
    );
