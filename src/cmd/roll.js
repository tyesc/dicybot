const { SlashCommandBuilder } = require('@discordjs/builders');

const diceDropdown = require('../components/diceDropdown');
const random = require('../services/random');
const { getSender, checkPrefix, minMaxNumber, calculate } = require('../services/helpers');
const { getRespnse } = require('../services/commons');

const prefix = 'roll';

const slashCommand = {
  data: new SlashCommandBuilder()
    .setName('roll')
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

    if (!opts) {
      opts = { roll: '1d100' };
    }

    let [n, dice] = opts.
      roll?.split('d').map(n => Number(n));

    if (!Number.isInteger(n) || !Number.isInteger(dice)) {
      n = 1;
      dice = 100;
    }

    const randomed = random({
      n: minMaxNumber(n, {
        min: 0,
        max: 100
      }),
      max: minMaxNumber(dice, {
        min: 2,
        max: 500
      })
    });

    Object.assign(randomed, {
      total: opts?.operator
        ? calculate(randomed.total, opts?.cnum, opts?.operator)
        : randomed.total,
    });

    await channel.send(getRespnse({ sender, randomed }));
  }
};

module.exports = {
  slashCommand,
  prefixCommand
}
