const { getVoiceConnection } = require('@discordjs/voice');

const prefix = '!quit';

const prefixCommand = {
  data: {
    prefix
  },

  exec: async (m, client) => {
    const connection = getVoiceConnection(m.guildId);

    if(!connection) {
      await m.reply({ephemeral: true, content: 'Pas d\'enregistrement sur ce server'});

      return;
    }

    connection.destroy();
    await m.reply({ephemeral: true, content: 'Vocal quité!'});
  }
};

module.exports = {
  prefixCommand
}
