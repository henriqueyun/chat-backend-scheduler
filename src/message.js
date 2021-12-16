const { Sequelize, DataTypes } = require('sequelize')

const Scheduling = require('./scheduling')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
)

const Message = sequelize.define('message', {
    sender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sendTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    xetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Scheduling,
        key: 'id'
      }
    }
  }, { timestamps: true });

Scheduling.hasMany(Message, 
  { sourceKey: 'id', foreignKey: 'xetId' });
(async () => {
  await sequelize.sync()
})()

module.exports = Message