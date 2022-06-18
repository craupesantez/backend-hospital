const { Model, DataTypes, Sequelize } = require('sequelize');

// const { USUARIO_TABLE } = require('./usuario.model')

const ROL_TABLE = 'rol';

const RolSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  estado: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

class Rol extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROL_TABLE,
      modelName: 'Rol',
      timestamps: false
    }
  }
}

module.exports = { ROL_TABLE, RolSchema, Rol }
