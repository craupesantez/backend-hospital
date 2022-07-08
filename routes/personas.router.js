const express = require('express');
const router = express.Router();
const PersonasService = require('../services/persona.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPersonaSchema, updatePersonaSchema, getPersonaSchema,
  addRamasSchema, addRolesSchema, getPersonaByIdentificacionSchema } = require('../schemas/persona.schema');

const service = new PersonasService();

router.get('/', async (req, res) => {
  const personas = await service.find();
  res.json(personas);
})

router.get('/by-identificacion/:identificacion',
  validatorHandler(getPersonaByIdentificacionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { identificacion } = req.params;
      const persona = await service.findIdentificacion(identificacion);
      res.json(persona);
    } catch (error) {
      next(error);
    }
  }
  )
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

  router.post('/personal',
  validatorHandler(createPersonaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.createPersonal(body));
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

  router.delete('/deleteRol/:id',
  validatorHandler(getPersonaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.deleteRol(id));
    } catch (error) {
      next(error);
    }
  });

  router.delete('/deleteEspecialidad/:id',
  validatorHandler(getPersonaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.deleteEspecialidad(id));
    } catch (error) {
      next(error);
    }
  });

router.post('/add-especialidad',
  validatorHandler(addRamasSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRama = await service.addEspecialidad(body)
      res.status(201).json(newRama);
    } catch (error) {
      next(error);
    }
  });

router.post('/add-rol',
  validatorHandler(addRolesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRol = await service.addRol(body)
      res.status(201).json(newRol);
    } catch (error) {
      next(error);
    }
  })

module.exports = router;
