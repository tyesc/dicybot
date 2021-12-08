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
];

module.exports = {
  defaultDiceDropdown,
};
