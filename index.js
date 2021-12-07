const { Client, Intents } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

const { token } = require('./config.json');
const initCmd = require('./src/cmd');

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const clientId = client.user.id;
  const guildIds = client.guilds.cache.map(guild => guild.id);

  const commands = await initCmd({ clientId, guildIds });

  client.on('interactionCreate', async i => {
    if (i.isCommand()) {
      for (var cmd of commands) {
        console.log('CMD', cmd);
        if (i.commandName === cmd.name) {
          await cmd.exec(i);
        }
      }
    } else {
      // TODO: send a dice rolled
      i?.values.length === 1
        ? await i.reply('rolled')
        : await i.reply('You can\'t roll many dice');
    }
  });
});



client.on('messageCreate', async interaction => {
  // console.log('MESSAGE', interaction.isCommand());

  if (interaction.content === 'ping') {
    await interaction.reply('Pong!');
  }
});


client.login(token);
