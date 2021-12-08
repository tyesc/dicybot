const { SlashCommandBuilder } = require('@discordjs/builders');

const diceDropdown = require('../components/diceDropdown');
const random = require('../services/random');

const prefix = '!roll';

const slashCommand = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Replies a dropdown to choose a dice to roll with button')
		.addIntegerOption((opts) =>
			opts.setName('number')
				.setDescription('How many dice')
		),

	exec: async i => {
		const n = i.options?.getInteger('number') || 1;

		await i.reply({
			ephemeral: true,
			content: 'Choose a dice :',
			components: [diceDropdown(n)],
		});
	},
};

const prefixCommand = {
	data: {
		prefix,
	},

	exec: async (m, client) => {
		const channel = client.channels.cache.get(m.channelId);
		const sender = `**${m.author.bot ? m.mentions.users[0] : m.author.username}**`;
		// TODO: use random func or/and calculate if have +-/ etc...
    const [content, opts] = m?.content?.split(' ');
		const [n, dice] = opts?.split('d').map(n => Number(n));

		const r = random({ n, max: dice });

		await channel.send({
			content: `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
		});
	},
};

module.exports = {
	slashCommand,
	prefixCommand,
}
