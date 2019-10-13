const { Sequelize } = require('sequelize');
const dbConfig = require('../config/sequelize-migrations');
const {setAndGet} = require('../models')

const sequelize = new Sequelize(dbConfig);
const models = setAndGet(sequelize);

module.exports = {sequelize, ...models};
