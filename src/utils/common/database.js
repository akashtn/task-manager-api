const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task-manager', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;