const { DataTypes } = require('sequelize');
const sequelize = require('../utils/common/database');

const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'open',
    validate: {
      isIn: [['open', 'in-progress', 'completed']]
    }
  }
});

module.exports = Task;
