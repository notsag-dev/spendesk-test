const config = require('./config');

module.exports = {
  dialect: 'sqlite',
  storage: `./${config.dbName}`,
  logging: false,
};
