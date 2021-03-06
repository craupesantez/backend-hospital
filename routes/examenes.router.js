const express = require('express');
const router = express.Router();
const ExamenesService = require('../services/examen.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkAdminRole } = require('../middlewares/auth.handler');
const { createExamenSchema, updateExamenSchema, getExamenSchema } = require('../schemas/examen.schema');
const passport = require('passport');

const service = new ExamenesService();

router.get('/',
  //  passport.authenticate('jwt', { session: false }),
  // checkAdminRole,
  async (req, res) => {
    const examenes = await service.find();
    res.json(examenes);
  })

router.get('/:id',
  validatorHandler(getExamenSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const examen = await service.findOne(id);
      res.json(examen);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
  // passport.authenticate('jwt', { session: false }),
 // checkAdminRole,
  validatorHandler(createExamenSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  })

router.patch('/:id',
  validatorHandler(getExamenSchema, 'params'),
  validatorHandler(updateExamenSchema, 'body'),
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
  validatorHandler(getExamenSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
