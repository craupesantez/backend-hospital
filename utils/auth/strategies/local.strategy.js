const { Strategy } = require('passport-local');
const Logger  = require('../../logger/logger');
 const logger = new Logger();
const AuthService = require('./../../../services/auth.service');
const service = new AuthService();

const LocalStrategy = new Strategy({
    usernameField: 'username',
    passwordField: 'contrasenia'
  },
  async (username, contrasenia, done) => {
    try {
        const usuario = await service.getUsuario(username, contrasenia);
        done(null, usuario);

    } catch (error) {
      logger.error("Error de logeo "+ {mensaje: error.message})
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
