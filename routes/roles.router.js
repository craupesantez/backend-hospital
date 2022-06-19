const express = require('express');
const router = express.Router();
const RolesService = require('../services/rol.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createRolSchema, updateRolSchema, getRolSchema } = require('../schemas/rol.schema');

const service = new RolesService();

router.get('/', async (req, res) => {
  const rol = await service.find();
  res.json(rol);
})

router.get('/:id',
  validatorHandler(getRolSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rol = await service.findOne(id);
      res.json(rol);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
validatorHandler(createRolSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newRol = await service.create(body);
  res.status(201).json(newRol);
})

router.patch('/:id',
validatorHandler(getRolSchema, 'params'),
validatorHandler(updateRolSchema, 'body'),
async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const rol = await service.update(id, body);
    res.json(rol);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
})

module.exports = router;
