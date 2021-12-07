const fs = require('fs');
const { resolve } = require('path');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { TOKEN } = require('../services/env');

module.exports = async ({ clientId, guildIds, client }) => {
	const body = [];
	const commands = [];
	const commandFiles = fs.readdirSync(resolve('./src/cmd'))
		.filter(file => file.endsWith('.js') && !file.includes('index'));

	for (const file of commandFiles) {
		const command = require(`./${file}`);

		body.push(command.data.toJSON());
		commands.push({ name: command.data.name, exec: command.exec });
	}

	const rest = new REST({ version: '9' }).setToken(TOKEN);

	try {
		console.log('Started refreshing application (/) commands.');

		for (var guildId of guildIds) {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body },
			);
		}

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}

return commands;
};
