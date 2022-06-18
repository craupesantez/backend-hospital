const { Model, DataTypes, Sequelize } = require('sequelize');

const { PERSONA_TABLE } = require('./persona.model');
const { ROL_TABLE } = require('./rol.model');

const PERSONA_ROL_TABLE = 'persona_rol';

const PersonaRolSchema = {
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
  rolId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ROL_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  }
}

class PersonaRol extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PERSONA_ROL_TABLE,
      modelName: 'PersonaRol',
      timestamps: false
    }
  }
}

module.exports = { PERSONA_ROL_TABLE, PersonaRolSchema, PersonaRol}
