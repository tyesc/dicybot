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
const random = require('./src/services/random');

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const clientId = client.user.id;
  const guildIds = client.guilds.cache.map(guild => guild.id);

  const commands = await initCmd({ clientId, guildIds });

  client.on('interactionCreate', async i => {
  	const channel = client.channels.cache.get(i.channelId);
		const sender = `**${i.user.username}**`;

    if (i.isCommand()) {
      for (const command of commands) {
        const cmd = command.slashCommand;

        if (i.commandName === cmd.data.name) {
          await cmd.exec(i);
        }
      }
    }

    if (i.isSelectMenu()) {
      const val = i?.values[0];

      if (val) {
        const [n, dice] = val?.split('d').map(n => Number(n));
        const r = random({ n, max: dice });

        await i.reply({
          content: `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
        });
      }
    }
  });

  client.on('messageCreate', async m => {
    const content = m?.content?.split(' ');

    if (content?.length) {
      for (const command of commands) {
        const cmd = command.prefixCommand;
        const prefix = cmd.data.prefix;

        if (content[0] === prefix) {
          await cmd.exec(m, client);
        }
      }
    }

  });

});

client.login(token);
