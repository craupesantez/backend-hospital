const express = require('express');
const personasRouter = require('./personas.router');
const authRouter = require('./auth.router');
const citasRouter = require('./citas.router');
const especialidadesRouter = require('./especialidades.router');
const examenesRouter = require('./examenes.router');
const medicamentosRouter = require('./medicamentos.router');
const rolesRouter = require('./roles.router');
const catalogosRouter = require('./catalogos.router');
const reportesRouter = require('./reportes.router');
const usuariosRouter = require('./usuarios.router');
const Logger  = require('../utils/logger/logger');
const logger = new Logger();

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router);
  router.use('/personas', personasRouter);
  router.use('/auth', authRouter);
  router.use('/citas', citasRouter);
  router.use('/especialidades', especialidadesRouter);
  router.use('/examenes', examenesRouter);
  router.use('/medicamentos', medicamentosRouter);
  router.use('/roles', rolesRouter);
  router.use('/reportes', reportesRouter);
  router.use('/catalogos', catalogosRouter);
  router.use('/usuarios', usuariosRouter);
}

module.exports = routerApi;
