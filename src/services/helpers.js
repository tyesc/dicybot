const { Message, SelectMenuInteraction } = require('discord.js');

const getRandom = (min, max) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);

const isInstanceOf = (e) => {
  const classes = [Message, SelectMenuInteraction];

  for (const c of classes) {
    if (e instanceof c) {
      return e.constructor.name;
    }
  }

  return false;
};

const getSender = (e, client) => {
  const guild = client.guilds.cache.get(e.guildId);
  let user;

  switch (isInstanceOf(e)) {
    case 'Message':
      user = guild.members.cache.get(e.author.id).nickname;
      return `**${user || e.author.username}**`;
      break;

    case 'SelectMenuInteraction':
      user = guild.members.cache.get(e.user.id).nickname;
      return `**${user || e.user.username}**`;
      break;

    default:
      return '';
      break;
  }
};

const checkPrefix = (m, prefix) => {
  const [_prefix, opts] = m?.content?.split(' ');

  if (_prefix === prefix) {
    const [d, n] = opts?.split('d');
    const [_d, _operator, _cnum] = d?.split(/([-+*])/g);
    const [_n, operator, cnum] = n?.split(/([-+*])/g);

    return {
      roll: `${_d}d${_n}`,
      cnum: Number(cnum),
      operator,
    };
  }

  return false;
};

const minMaxNumber = (n, { min, max }) => {
  let res = n;

  if (n < min) {
    res = min;
  } else if (n > max) {
    res = max;
  }

  return res;
};

const calculate = (a, b, operator) => {
  switch (operator) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "*":
      return a * b;
      break;
    default:
    return a;
  }
}

module.exports = {
  getRandom,
  getSender,
  checkPrefix,
  minMaxNumber,
  calculate,
};
