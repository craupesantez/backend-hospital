const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsuarioService = require('./../../../services/usuario.service');
const service = new UsuarioService();

const LocalStrategy = new Strategy({
    usernameField: 'username',
    passwordField: 'contrasenia'
  },
  async (username, contrasenia, done) => {
    try {
      const usuario = await service.findByUsername(username);
      if (!usuario) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(contrasenia, usuario.contrasenia);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete usuario.dataValues.contrasenia;
      done(null, usuario);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
