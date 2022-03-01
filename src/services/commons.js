const { getRandom, minMaxNumber } = require('./helpers');

const defaultDiceDropdown = n => {
  const d = minMaxNumber(n, {
    min: 0,
    max: 100
  })

  return [
    {
      label: `${d}D 100`,
      description: `!roll ${d}d100`,
      value: `${d}d100`,
    },
    {
      label: `${d}D 12`,
      description: `!roll ${d}d12`,
      value: `${d}d12`,
    },
    {
      label: `${d}D 10`,
      description: `!roll ${d}d10`,
      value: `${d}d10`,
    },
    {
      label: `${d}D 8`,
      description: `!roll ${d}d8`,
      value: `${d}d8`,
    },
    {
      label: `${d}D 6`,
      description: `!roll ${d}d6`,
      value: `${d}d6`,
    },
    {
      label: `${d}D 4`,
      description: `!roll ${d}d4`,
      value: `${d}d4`,
    },
    {
      label: `${d}D 2`,
      description: `!roll ${d}d2`,
      value: `${d}d2`,
    },
  ];
};

const trashTalkResponse = (sender, r) => [
  {
    content: `Bououou ${sender}, t'es nul :laughing: \n` +
      `vla ton score, Roll: \`${r.details}\` Result: ${r.total}`,
  },
  {
    content: `Prie ton MJ, puisse-t-il être clément... \n` +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
  {
    content: `...Prépare ton testament. \n` +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
];

const bofBofResponse = (sender, r) => [
  {
    content: 'Mwè c\'est pas fameux tout ça \n' +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
  {
    content: 'Alors, ça passe ou pas ? \n' +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
];

const normalResponse = (sender, r) => [
  {
    content: `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
  {
    content: 'Tranquille. \n' +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
  {
    content: 'Tout va bien, faut pas stresser comme ça ! \n' +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
];

const successResponse = (sender, r) => [
  {
    content: 'HA le MJ l\'a dans l\'c.. l\'os \n ' +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
  {
    content: 'Gloire au tout puissant toi ! \n' +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
  {
    content: 'Oui, c\'est bien un réussite critique. \n' +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
];

const multiDiceEmbed = (sender, r) => {
  const reduced = JSON.parse(r.details).reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1;
    return obj;
  }, {});

  const occurence = Object.entries(reduced).map(e => (
    `'${e[1]} Dé ${e[0]}'`
  ));

  return `${sender} Roll: \`[${occurence}]\` Result: ${r.total}`;
};

const getRespnse = ({ sender, randomed: r }) => {
  const n = r.total;
  let res = [];

  if (r.n <= 1 && r.dice === 100) {
    switch (true) {
      case n <= 5:
        res = successResponse(sender, r);
        res = res[getRandom(0, (res.length - 1))];
      break;
      case n < 95 && n > 70:
        res = bofBofResponse(sender, r);
        res = res[getRandom(0, (res.length - 1))];
      break;
      case n > 95:
        res = trashTalkResponse(sender, r);
        res = res[getRandom(0, (res.length - 1))];
      break;
      default:
        res = normalResponse(sender, r);
        res = res[getRandom(0, (res.length - 1))];
    }
  } else if (r.n > 10) {
    res = multiDiceEmbed(sender, r);
  } else {
    res = normalResponse(sender, r)[0];
  }

  return res;
};

module.exports = {
  defaultDiceDropdown,
  getRespnse,
};
