const fs = require('fs');
const { resolve } = require('path');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const colors = require('colors/safe');

const { TOKEN } = require('../services/env');

module.exports = async ({ clientId, guilds }) => {
	const body = [];
	const commands = [];
	const commandFiles = fs.readdirSync(resolve('./src/cmd'))
		.filter(file => file.endsWith('.js') && !file.includes('index'));

	for (const file of commandFiles) {
		const { slashCommand, prefixCommand } = require(`./${file}`);

		slashCommand && body.push(slashCommand.data.toJSON());
		commands.push({
			slashCommand,
			prefixCommand,
		});
	}

	const rest = new REST({ version: '9' }).setToken(TOKEN);

	try {
		console.log(colors.yellow('Reload (/) commands...'));

		for (const guild of guilds) {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guild.id),
				{ body },
			);
			console.log(colors.cyan(`Gulid: ${guild.name} Done!`));
		}

		console.log(colors.green('All guilds are reloaded!'));
	} catch (error) {
		console.error(error);
	}

return commands;
};
