const { Model, DataTypes, Sequelize, QueryTypes } = require('sequelize');

 const { PERSONA_TABLE } = require('./persona.model');
 const { CATALOGO_TABLE } = require('./catalogo.model');


const CITA_TABLE = 'cita';

const CitaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  motivo: {
    allowNull: false,
    type: DataTypes.STRING
  },
  detalle: {
    allowNull: true,
    type: DataTypes.STRING
  },
  diagnostico: {
    allowNull: true,
    type: DataTypes.STRING
  },
  costo: {
    allowNull: true,
    type: DataTypes.DOUBLE,
  },

  fraccion: {
    allowNull: false,
    type: DataTypes.TIME,
    defaultValue: "00:30:00"
  },
  fechaInicio: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  fechaRegistro: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  fechaActualizo: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  color:{
    allowNull: true,
    type: DataTypes.STRING
  },
  estadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATALOGO_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  pacienteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERSONA_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  medicoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERSONA_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },

};

class Cita extends Model {
  static associate(models) {
    this.belongsTo(models.Catalogo, { as: 'estado' });

    this.belongsTo(models.Persona, { as: 'paciente' });
    this.belongsTo(models.Persona, { as: 'medico' });
    this.belongsToMany(models.Examen, {
      as: 'pedidos',
      through: models.CitaExamen,
      foreignKey: 'citaId',
      otherKey: 'examenId'
    });
    this.belongsToMany(models.Medicamento, {
      as: 'recetas',
      through: models.CitaMedicamento,
      foreignKey: 'citaId',
      otherKey: 'medicamentoId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CITA_TABLE,
      modelName: 'Cita',
      timestamps: false
    }
  }
}

module.exports = { CITA_TABLE, CitaSchema, Cita }
