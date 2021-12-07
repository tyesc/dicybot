const { get } = require('../services/utils');
const fr = require('./fr');
const en = require('./en');

const AVAILABLE_LOCALES = {
  fr,
  en,
};

const getLocale = locale =>
  AVAILABLE_LOCALES[locale.toLowerCase()] ||
  /* istanbul ignore next: default */ AVAILABLE_LOCALES.fr;

const translate = (key, locale = 'FR', replace = {}) => {
  let text = get(getLocale(locale), key, key);

  text = Object.entries(replace).reduce((res, [k, v]) => (
    res.replace(new RegExp(`{{\\s{0,}${k}\\s{0,}}}`, 'g'), v)
  ), text);

  return text;
};

module.exports = {
  AVAILABLE_LOCALES,
  getLocale,
  translate,
};
