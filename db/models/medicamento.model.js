const { Model, DataTypes, Sequelize } = require('sequelize');

const MEDICAMENTO_TABLE = 'medicamento';

const MedicamentoSchema = {
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
  descripcion:{
    allowNull: true,
    type: DataTypes.STRING,
    // defaultValue: true,
  },
  advertencia:{
    allowNull: true,
    type: DataTypes.STRING,
    // defaultValue: true,
  },
  dosis:{
    allowNull: true,
    type: DataTypes.STRING,
    // defaultValue: true,
  },
  costoUnidad:{
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  costoCaja:{
    allowNull: true,
    type: DataTypes.DOUBLE,
  },
  fechaVencimiento:{
    allowNull: false,
    type: DataTypes.DATE,
    // defaultValue: Sequelize.NOW
  },
  fechaCreacion:{
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  fechaActualizo:{
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  activo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}

class Medicamento extends Model{
  static associate(){

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: MEDICAMENTO_TABLE,
      modelName: 'Medicamento',
      timestamps: false
    }
  }
}

module.exports = { MEDICAMENTO_TABLE, MedicamentoSchema, Medicamento}
