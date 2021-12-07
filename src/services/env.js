const dotenv = require('dotenv');

/* istanbul ignore next: not needed inside tests */
if (!process.env.TEST) {
  dotenv.config();
}

const env = process.env;

const TOKEN = env.TOKEN;

module.exports = {
  TOKEN,
}
