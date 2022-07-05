const { Model, DataTypes, Sequelize, QueryTypes } = require('sequelize');

const { USUARIO_TABLE } = require('./usuario.model');
const { CATALOGO_TABLE } = require('./catalogo.model');

const PERSONA_TABLE = 'persona';

const PersonaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombres: {
    allowNull: false,
    type: DataTypes.STRING
  },
  apellidos: {
    allowNull: false,
    type: DataTypes.STRING
  },
  identificacion: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  telefono: {
    allowNull: false,
    type: DataTypes.STRING
  },
  correo: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  foto: {
    allowNull: true,
    type: DataTypes.STRING
  },
  fechaNacimiento: {
    allowNull: false,
    type: DataTypes.DATE
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
  usuarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USUARIO_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  catalogoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATALOGO_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  generoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATALOGO_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  tipoIdentificacionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATALOGO_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete: 'SET NULL'
  },
  activo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

class Persona extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, { as: 'usuario' });
    this.belongsTo(models.Catalogo, { as: 'catalogo' });
    this.belongsTo(models.Catalogo, { as: 'genero' });
    this.belongsTo(models.Catalogo, { as: 'tipoIdentificacion' });
    this.belongsToMany(models.Especialidad, {
      as: 'ramas',
      through: models.PersonaEspecialidad,
      foreignKey: 'personaId',
      otherKey: 'especialidadId'
    });
    this.belongsToMany(models.Rol, {
      as: 'roles',
      through: models.PersonaRol,
      foreignKey: 'personaId',
      otherKey: 'rolId'
    });
    this.hasMany(models.Cita,{
      as: 'paciente_citas',
      foreignKey: 'pacienteId'
    });
    this.hasMany(models.Cita,{
      as: 'medico_citas',
      foreignKey: 'medicoId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERSONA_TABLE,
      modelName: 'Persona',
      timestamps: false
    }
  }
}

module.exports = { PERSONA_TABLE, PersonaSchema, Persona }
