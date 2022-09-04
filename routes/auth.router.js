const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');
 const Logger  = require('./../utils/logger/logger');
 const logger = new Logger();
const router = express.Router();
const AuthService = require('./../services/auth.service');
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    logger.info('La ruta es:/login');
    try {
      const user = req.user;
      res.json(service.signToken(user));
      logger.info('Usuario autenticado',{username:user.username});
    } catch (error) {
      logger.error('Existe un error al logearse: ', {errorLogeo: error.message});
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    logger.info('La ruta es:/login');
    try {
      const { correo } = req.body;
      const rta = await service.sendRecovery(correo);
      res.json(rta)
    } catch (error) {
      logger.error('Existe un error al logearse: ', {errorLogeo: error.message});
      next(error);
    }
  }
);

router.post('/change-password',
  async (req, res, next) => {
    logger.info('La ruta es:/login');
    try {
      const { token, contrasenia } = req.body;
      const rta = await service.changePassword(token, contrasenia);
      res.json(rta)
    } catch (error) {
      logger.error('Existe un error al logearse: ', {errorLogeo: error.message});
      next(error);
    }
  }
);

module.exports = router;
