const { Client, Intents } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

const { TOKEN } = require('./src/services/env');
const initCmd = require('./src/cmd');
const events = require('./src/events');

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const clientId = client.user.id;
  const guilds = client.guilds.cache.map(guild => ({
      id: guild.id,
      name: guild.name,
    }));

  const commands = await initCmd({ clientId, guilds });
  const prefixes = commands.map(c => c?.prefixCommand.data.prefix);

  Object.values(events).forEach(async event => {
    await event(client, { commands, prefixes });
  });

});

client.login(TOKEN);
