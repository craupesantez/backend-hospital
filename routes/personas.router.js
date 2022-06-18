const express = require('express');
const router = express.Router();
const PersonasService = require('../services/persona.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPersonaSchema, updatePersonaSchema, getPersonaSchema, addRamasSchema } = require('../schemas/persona.schema');

const service = new PersonasService();

router.get('/', async (req, res) => {
  const personas = await service.find();
  res.json(personas);
})

router.get('/:id',
  validatorHandler(getPersonaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const persona = await service.findOne(id);
      res.json(persona);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
  validatorHandler(createPersonaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  })

router.patch('/:id',
  validatorHandler(getPersonaSchema, 'params'),
  validatorHandler(updatePersonaSchema, 'body'),
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
  validatorHandler(getPersonaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  });

  router.post('/add-especialidad',
  validatorHandler(addRamasSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRama =await service.addEspecialidad(body)
      res.status(201).json(newRama);
    } catch (error) {
      next(error);
    }
  })

module.exports = router;
