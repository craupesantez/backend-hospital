const { Model, DataTypes, Sequelize } = require('sequelize');

// const { USUARIO_TABLE } = require('./usuario.model')

const EXAMEN_TABLE = 'examen';

const ExamenSchema = {
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
  descripcion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  requisitos: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  activo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

class Examen extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EXAMEN_TABLE,
      modelName: 'Examen',
      timestamps: false
    }
  }
}

module.exports = { EXAMEN_TABLE, ExamenSchema, Examen }
