'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE} = require('./../models/persona.model');
const { USUARIO_TABLE} = require('./../models/usuario.model');
const { CATALOGO_TABLE} = require('./../models/catalogo.model');
const { ROL_TABLE} = require('./../models/rol.model');
const { ESPECIALIDAD_TABLE} = require('./../models/especialidad.model');
const { EXAMEN_TABLE} = require('./../models/examen.model');
const { MEDICAMENTO_TABLE} = require('./../models/medicamento.model');
const { CITA_TABLE} = require('./../models/cita.model');
const { PERSONA_ROL_TABLE} = require('./../models/persona-rol.model');
const { PERSONA_ESPECIALIDAD_TABLE} = require('./../models/persona-especialidad.model');
const { CITA_EXAMEN_TABLE} = require('./../models/cita-examen.model');
const { CITA_MEDICAMENTO_TABLE} = require('./../models/cita-medicamento.model');


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USUARIO_TABLE, {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username:{
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      contrasenia:{
        allowNull: false,
        type: DataTypes.STRING
      },
      recoveryToken:{
        allowNull: true,
        type: DataTypes.STRING
      }
    });
    await queryInterface.createTable(CATALOGO_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tipo: {
        allowNull: false,
        type: DataTypes.STRING
      },
      nombre: {
        allowNull: false,
        type: DataTypes.STRING
      },
      descripcion: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      padre: {
        allowNull: true,
        type: DataTypes.STRING
      },
      activo:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    });
    await queryInterface.createTable(ROL_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nombre: {
        allowNull: false,
        type: DataTypes.STRING
      },
      activo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    });
    await queryInterface.createTable(ESPECIALIDAD_TABLE, {
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
      descripcion: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      activo:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      color:{
        allowNull: true,
        type: DataTypes.STRING
      },
    });
    await queryInterface.createTable(PERSONA_TABLE, {
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
    });
    await queryInterface.createTable(CITA_TABLE, {
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
        // defaultValue: "00:30:00"
      },
      hora:{
        allowNull: false,
        type: DataTypes.TIME,
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
      especialidadId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ESPECIALIDAD_TABLE,
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete: 'SET NULL'
      },
    });
    await queryInterface.createTable(EXAMEN_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nombre: {
        allowNull: false,
        type: DataTypes.STRING
      },
      descripcion: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      requisitos: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      activo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
    await queryInterface.createTable(MEDICAMENTO_TABLE, {
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
    });
    await queryInterface.createTable(PERSONA_ROL_TABLE, {
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
    });
    await queryInterface.createTable(PERSONA_ESPECIALIDAD_TABLE, {
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
    });
    await queryInterface.createTable(CITA_EXAMEN_TABLE, {
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
        allowNull: true,
        type: DataTypes.STRING
      },
      file: {
        allowNull: true,
        type: DataTypes.STRING
      },
      detalleFile:{
        allowNull: true,
        type: DataTypes.STRING
      }
    });
    await queryInterface.createTable(CITA_MEDICAMENTO_TABLE, {
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
      medicamentoId: {
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
    });
  },

  async down(queryInterface) {
     await queryInterface.dropTable(CITA_MEDICAMENTO_TABLE);
     await queryInterface.dropTable(CITA_EXAMEN_TABLE);
     await queryInterface.dropTable(PERSONA_ESPECIALIDAD_TABLE);
     await queryInterface.dropTable(PERSONA_ROL_TABLE);
     await queryInterface.dropTable(CITA_MEDICAMENTO_TABLE);
     await queryInterface.dropTable(MEDICAMENTO_TABLE);
     await queryInterface.dropTable(EXAMEN_TABLE);
     await queryInterface.dropTable(CITA_TABLE);
     await queryInterface.dropTable(ESPECIALIDAD_TABLE);
     await queryInterface.dropTable(ROL_TABLE);
     await queryInterface.dropTable(PERSONA_TABLE);
     await queryInterface.dropTable(CATALOGO_TABLE);
     await queryInterface.dropTable(USUARIO_TABLE);
  }
};
