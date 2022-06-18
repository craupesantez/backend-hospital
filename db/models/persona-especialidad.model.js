const { Model, DataTypes, Sequelize } = require('sequelize');

const { PERSONA_TABLE } = require('./persona.model');
const { ESPECIALIDAD_TABLE } = require('./especialidad.model');

const PERSONA_ESPECIALIDAD_TABLE = 'persona_especialidad';

const PersonaEspecialidadSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  personaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERSONA_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  especialidadId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ESPECIALIDAD_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  }
}

class PersonaEspecialidad extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PERSONA_ESPECIALIDAD_TABLE,
      modelName: 'PersonaEspecialidad',
      timestamps: false
    }
  }
}

module.exports = { PERSONA_ESPECIALIDAD_TABLE, PersonaEspecialidadSchema, PersonaEspecialidad}
