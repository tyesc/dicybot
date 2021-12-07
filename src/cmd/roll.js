const { SlashCommandBuilder } = require('@discordjs/builders');

const diceDropdown = require('../components/diceDropdown');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Replies a dropdown to choose a dice to roll with button'),
	exec: async (interaction) => {
		await interaction.reply({
			ephemeral: true,
			content: 'Choose a dice :',
			components: [diceDropdown],
		});
	},
};
