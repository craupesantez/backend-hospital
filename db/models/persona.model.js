const { Model, DataTypes, Sequelize } = require('sequelize');

const PERSONA_TABLE = 'persona';

const PersonaSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombres:{
    allowNull: false,
    type: DataTypes.STRING
  },
  apellidos:{
    allowNull: false,
    type: DataTypes.STRING
  },
  telefono:{
    allowNull: false,
    type: DataTypes.STRING
  },
  foto:{
    allowNull: true,
    type: DataTypes.STRING
  },
  fechaNacimiento:{
    allowNull: false,
    type: DataTypes.DATE
  },
  fechaRegistro:{
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  fechaActualizo:{
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
};

class Persona extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PERSONA_TABLE,
      modelName: 'Persona',
      timestamps: false
    }
  }
}

module.exports = { PERSONA_TABLE, PersonaSchema, Persona}
