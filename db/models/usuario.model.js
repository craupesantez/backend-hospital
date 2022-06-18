const { Model, DataTypes, Sequelize } = require('sequelize');

const USUARIO_TABLE = 'usuario';

const UsuarioSchema = {
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
  }
};

class Usuario extends Model{
  static associate(models){
    this.hasOne(models.Persona, {
      as:'persona',
      foreignKey: 'usuarioId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false
    }
  }
}

module.exports = { USUARIO_TABLE, UsuarioSchema, Usuario}
