const { Model, DataTypes, Sequelize } = require('sequelize');

const ESPECIALIDAD_TABLE = 'especialidad';

const EspecialidadSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre:{
    allowNull: false,
    type: DataTypes.STRING
  },
  estado:{
    allowNull: false,
    type: DataTypes.STRING
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
  },
  usuarioRegistro:{
    allowNull: true,
    type: DataTypes.STRING
  },
  usuarioActualizo:{
    allowNull: true,
    type: DataTypes.STRING
  },
}

class Especialidad extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ESPECIALIDAD_TABLE,
      modelName: 'Especialidad',
      timestamps: false
    }
  }
}

module.exports = { ESPECIALIDAD_TABLE, EspecialidadSchema, Especialidad}
