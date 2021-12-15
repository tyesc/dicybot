const { getRandom } = require('./helpers');

const defaultDiceDropdown = n => [
  {
    label: `${n}D 100`,
    description: `!roll ${n}d100`,
    value: `${n}d100`,
  },
  {
    label: `${n}D 12`,
    description: `!roll ${n}d12`,
    value: `${n}d12`,
  },
  {
    label: `${n}D 10`,
    description: `!roll ${n}d10`,
    value: `${n}d10`,
  },
  {
    label: `${n}D 8`,
    description: `!roll ${n}d8`,
    value: `${n}d8`,
  },
  {
    label: `${n}D 6`,
    description: `!roll ${n}d6`,
    value: `${n}d6`,
  },
  {
    label: `${n}D 4`,
    description: `!roll ${n}d4`,
    value: `${n}d4`,
  },
  {
    label: `${n}D 2`,
    description: `!roll ${n}d2`,
    value: `${n}d2`,
  },
];

const trashTalkResponse = (sender, r) => [
  {
    content: `Bououou ${sender}, t'es nul :laughing: \n` +
      `vla ton score, Roll: \`${r.details}\` Result: ${r.total}`,
  },
];

const bofBofResponse = (sender, r) => [
  {
    content: 'Mwè c\'est pas fameux tout ça \n' +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
];

const normalResponse = (sender, r) => [
  {
    content: `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
];

const successResponse = (sender, r) => [
  {
    content: 'HA le MJ l\'a dans l\'c.. l\'os \n ' +
      `${sender} Roll: \`${r.details}\` Result: ${r.total}`,
  },
];

const getRespnse = ({ sender, r }) => {
  const n = r.total;
  let res = [];

  if (r.n === 1 && r.dice === 100) {
    switch (true) {
      case n < 10:
      res = successResponse(sender, r);
      res = res[getRandom(1, (res.length - 1))];
      break;
      case n < 90 && n > 70:
      res = bofBofResponse(sender, r);
      res = res[getRandom(1, (res.length - 1))];
      break;
      case n > 90:
      res = trashTalkResponse(sender, r);
      res = res[getRandom(1, (res.length - 1))];
      break;
      default:
      res = normalResponse(sender, r);
      res = res[getRandom(1, (res.length - 1))];
    }
  } else {
    res = normalResponse(sender, r);
    res = res[getRandom(1, (res.length - 1))];
  }

  return res;
};

module.exports = {
  defaultDiceDropdown,
  getRespnse,
};
