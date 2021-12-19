const { DataTypes } = require('sequelize')
const sequelize = require('./sequelize')
const Scheduling = require('./scheduling')

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