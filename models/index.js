const fs = require('fs'); // eslint-disable-line
const path = require('path');
const config = require('../config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  // dialect: config.db.dialect,
  logging: ((config.logging) ? console.log : null), // eslint-disable-line no-console
  define: {
    timestamps: false,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
});
const db = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db)
  .forEach(modelName => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
