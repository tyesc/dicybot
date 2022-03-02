const { SlashCommandBuilder } = require('@discordjs/builders');
const { entersState, joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');

const diceDropdown = require('../components/diceDropdown');
const random = require('../services/random');
const { getSender, checkPrefix, minMaxNumber } = require('../services/helpers');
const { getRespnse } = require('../services/commons');
const createListeningStream = require('../services/createListeningStream');

const prefix = '!rec';

const join = async (m, client) => {

  let opts = checkPrefix(m, prefix);

  let connection = getVoiceConnection(m.guildId);

  const channels = m.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE');
  const channel = channels.find(c => c.name === opts);

	if (!connection) {
		if (channel) {
			connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				selfDeaf: false,
				selfMute: true,
				adapterCreator: channel.guild.voiceAdapterCreator,
			});
		} else {
			await m.reply('Ce channel n\'exist pas');
			return;
		}
	}

	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 5e3);
    const receiver = connection.receiver;

    receiver.speaking.on('start', (userId) => {
      createListeningStream(receiver, userId, client.users.cache.get(userId));
    });

	} catch (error) {
		console.warn(error);
    connection.destroy();
		await m.reply('Failed to join voice channel within 20 seconds, please try again later!');
	}

};

const slashCommand = {
  data: new SlashCommandBuilder()
    .setName('rec')
    .setDescription('Affiche le sélecteur de dé')
    .addIntegerOption((opts) =>
      opts.setName('number').setDescription('Combien de dé ?')
    ),

  exec: async i => {
    const n = i.options
      ?.getInteger('number') || 1;

    await i.reply({
      ephemeral: true,
      content: '\u200B',
      components: [diceDropdown(n)]
    });
  }
};

const prefixCommand = {
  data: {
    prefix
  },

  exec: async (m, client) => {
    const channel = client.channels.cache.get(m.channelId);
    const sender = getSender(m, client);
    let opts = checkPrefix(m, prefix);

    await join(m, client);


    await channel.send('OKAY');
  }
};

module.exports = {
  // slashCommand,
  prefixCommand
}
