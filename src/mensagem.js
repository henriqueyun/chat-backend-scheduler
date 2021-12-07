const { Sequelize, DataTypes } = require('sequelize')

const Agendamento = require('./agendamento')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
})

const Mensagem = sequelize.define('mensagem', {
    sender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
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
        model: Agendamento,
        key: 'id'
      }
    }
  }, { timestamps: true });

Agendamento.hasMany(Mensagem, 
  { sourceKey: 'id', foreignKey: 'xetId' });
(async () => {
  await sequelize.sync()
})()

module.exports = Mensagem