const { MessageEmbed } = require('discord.js');

const diceDropdown = require('../components/diceDropdown');
const random = require('../services/random');

const prefix = '!dicybot';

const prefixCommand = {
  data: {
    prefix
  },

  exec: async (m, client) => {
    const channel = client.channels.cache.get(m.channelId);

    await channel.send({
      embeds: [new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Dicybot helpers')
        .setDescription('Listen Here You Little Shit !')
        .addFields(
          {
            name: '\u200B',
            value: '\u200B'
          }, {
            name: '!roll',
            value: 'Utilisation classique, ex: !roll 1d100'
          }, {
            name: '/roll',
            value: 'Sans arguments = 1dXXX'
          }, {
            name: '/roll \`number\:`',
            value: 'Avec l\'argument "number" vous pouvez choisir combien de dé lancer'
          }, {
            name: '\u200B',
            value: '\u200B'
          },
        ).setTimestamp()]
    })
  }
};

module.exports = {
  prefixCommand
}
