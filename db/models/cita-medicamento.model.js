const { Model, DataTypes, Sequelize } = require('sequelize');

const { CITA_TABLE } = require('./cita.model');
const { MEDICAMENTO_TABLE } = require('./medicamento.model');

const CITA_MEDICAMENTO_TABLE = 'cita_medicamento';

const CitaMedicamentoSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  citaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CITA_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  examenId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MEDICAMENTO_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  indicaciones: {
    allowNull: false,
    type: DataTypes.STRING
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
}

class CitaMedicamento extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CITA_MEDICAMENTO_TABLE,
      modelName: 'CitaMedicamento',
      timestamps: false
    }
  }
}

module.exports = { CITA_MEDICAMENTO_TABLE, CitaMedicamentoSchema, CitaMedicamento}
