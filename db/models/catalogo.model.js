const { Model, DataTypes, Sequelize } = require('sequelize');

// const { USUARIO_TABLE } = require('./usuario.model')

const CATALOGO_TABLE = 'catalogo';

const CatalogoSchema = {
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
  }
};

class Catalogo extends Model {
  static associate(models) {
    this.hasMany(models.Persona, {
      as: 'personas',
      foreignKey: 'catalogoId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATALOGO_TABLE,
      modelName: 'Catalogo',
      timestamps: false
    }
  }
}

module.exports = { CATALOGO_TABLE, CatalogoSchema, Catalogo }
