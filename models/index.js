const path = require('path');

const modelNames = ['card', 'transfer', 'wallet'];

const setAndGet = sequelize => {
  const models = {};
  modelNames.forEach(fileName => {
    const model = sequelize.import(path.join(__dirname, `${fileName}.js`));
    models[model.name] = model;
  });
  Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });
  return models;
};

module.exports = {setAndGet};
