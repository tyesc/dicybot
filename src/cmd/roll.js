const { SlashCommandBuilder } = require('@discordjs/builders');

const diceDropdown = require('../components/diceDropdown');

const prefix = '!roll';

const slashCommand = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Replies a dropdown to choose a dice to roll with button'),

	exec: async i => {
		await i.reply({
			ephemeral: true,
			content: 'Choose a dice :',
			components: [diceDropdown],
		});
	},
};

const prefixCommand = {
	data: {
		prefix,
	},

	exec: async (m, client) => {
		const channel = client.channels.cache.get(m.channelId);
		const sender = `<@${m.author.id}>`;
		// TODO: use random func or/and calculate if have +-/ etc...
    const [content, opts] = m?.content?.split(' ');
		const [n, dice] = opts?.split('d').map(n => Number(n));

		await channel.send({
			content: `${sender} rolled ${n}d${dice}`,
		});
	},
};

module.exports = {
	slashCommand,
	prefixCommand,
}
