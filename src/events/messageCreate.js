module.exports = (client, opts = {}) => {
  client.on('messageCreate', async m => {
    if (m.author.bot) return;
    if (!m.guild) return;

    const content = m?.content?.split(' ');

    if (opts?.prefixes.includes(content[0])) {
      for (const command of opts?.commands) {
        const cmd = command.prefixCommand;
        const prefix = cmd.data?.prefix;

        if (content[0] === prefix) {
          await cmd.exec(m, client);
        }
      }
    }

  });
};
