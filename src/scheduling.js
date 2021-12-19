const { DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

const Scheduling = sequelize.define('scheduling', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, { timestamps: true });

  (async () => {
    await sequelize.sync()
  })()

module.exports = Scheduling