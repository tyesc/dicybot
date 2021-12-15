const random = require('../services/random');
const { getSender } = require('../services/helpers');
const { getRespnse } = require('../services/commons');

module.exports = (client, opts = {}) => {
  client.on('interactionCreate', async i => {
    const channel = client.channels.cache.get(i.channelId);
    const sender = getSender(i, client);

    if (i.isCommand()) {
      for (const command of opts?.commands) {
        const cmd = command.slashCommand;

        if (cmd && i.commandName === cmd.data?.name) {
          await cmd.exec(i);
        }
      }
    }

    if (i.isSelectMenu()) {
      const val = i?.values[0];

      if (val) {
        const [n, dice] = val?.split('d').map(n => Number(n));
        const r = random({ n, max: dice });

        i.deferUpdate();
        await i.channel.send(getRespnse({ sender, r }));
      }
    }
  });
};
