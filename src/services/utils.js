const isNull = v => v === null;

const isUndefined = v => typeof v === 'undefined';

const exists = v => !isNull(v) && !isUndefined(v);

const get = (obj = {}, path = '', defaultValue = null) => path
  .split('.')
  .reduce((a, c) => exists(a?.[c]) ? a[c] : defaultValue, obj);

module.exports = {
  isNull,
  isUndefined,
  exists,
  get,
};
