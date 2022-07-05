const { Model, DataTypes, Sequelize } = require('sequelize');

const { CITA_TABLE } = require('./cita.model');
const { EXAMEN_TABLE } = require('./examen.model');

const CITA_EXAMEN_TABLE = 'cita_examen';

const CitaExamenSchema = {
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
      model: EXAMEN_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  resultado: {
    allowNull: false,
    type: DataTypes.STRING
  },
}

class CitaExamen extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CITA_EXAMEN_TABLE,
      modelName: 'CitaExamen',
      timestamps: false
    }
  }
}

module.exports = { CITA_EXAMEN_TABLE, CitaExamenSchema, CitaExamen}
