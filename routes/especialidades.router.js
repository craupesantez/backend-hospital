const express = require('express');
const router = express.Router();
const EspecialidadesService = require('../services/especialidad.service');
const validatorHandler = require('../middlewares/validator.handler');
const {checkAdminRole} = require('../middlewares/auth.handler');
const { createEspecialidadSchema, updateEspecialidadSchema, getEspecialidadSchema } = require('../schemas/especialidad.schema');
const passport = require('passport');

const service = new EspecialidadesService();

router.get('/', async (req, res) => {
  const especialidades = await service.find();
  res.json(especialidades);
})

router.get('/:id',
  validatorHandler(getEspecialidadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const especialidad = await service.findOne(id);
      res.json(especialidad);
    } catch (error) {
      next(error);
    }
  })

router.get('/:idEspecialidad/personas/:idPersona',(req, res) => {
  const{idEspecialidad, idPersona} = req.params;
  res.json({
    idEspecialidad,
    idPersona
  })
})

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkAdminRole,
  validatorHandler(createEspecialidadSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  })

router.patch('/:id',
  validatorHandler(getEspecialidadSchema, 'params'),
  validatorHandler(updateEspecialidadSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  })

  router.delete('/:id',
  validatorHandler(getEspecialidadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
