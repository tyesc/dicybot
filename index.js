const { token } = require('./config.json');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async interaction => {
  console.log('INTERRAC', interaction);

  if (interaction.content === 'ping') {
    await interaction.reply('Pong!');
  }
});


client.login(token);
