const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATALOGO_TABLE } = require('./catalogo.model');

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
  presentComerId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CATALOGO_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  presentacionMedicaId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CATALOGO_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  codigo:{
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
    // defaultValue: true,
  },
  registroSanitario:{
    allowNull: true,
    type: DataTypes.STRING,
    // defaultValue: true,
  },
  stockMaximo: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  stockMinimo: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  fechaRegistro:{
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
}

class Medicamento extends Model{
  static associate(model){
    this.belongsTo(models.Catalogo, { as: 'presentacionComercial' });
    this.belongsTo(models.Catalogo, { as: 'presentacionMedicamento' });
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
