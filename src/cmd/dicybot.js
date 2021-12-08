const { SlashCommandBuilder } = require('@discordjs/builders');

const diceDropdown = require('../components/diceDropdown');
const random = require('../services/random');

const prefix = '!dicybot';

const prefixCommand = {
	data: {
		prefix,
	},

	exec: async (m, client) => {
		const channel = client.channels.cache.get(m.channelId);

		await channel.send({
			content: `Im here to help you`,
		});
	},
};

module.exports = {
	prefixCommand,
}
