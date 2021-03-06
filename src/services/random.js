const { getRandom } = require('./helpers');

module.exports = ({ n = 0, min = 1, max }) => {
  let details = [];

  if (n > 0) {
    for (let i = 1; i < n; i++) {
      details.push(getRandom(min, max));
    }
  }
  details.push(getRandom(min, max));
  const total = details.reduce((acc, val) => acc + val);

  return {
    details: JSON.stringify(details.sort((a, b) => a - b)),
    dice: max,
    total,
    n,
  };
};
