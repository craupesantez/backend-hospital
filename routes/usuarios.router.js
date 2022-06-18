const express = require('express');
const router = express.Router();
const UsuariosService = require('../services/usuario.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema } = require('../schemas/usuario.schema');

const service = new UsuariosService();

router.get('/', async (req, res) => {
  const usuarios = await service.find();
  res.json(usuarios);
})

router.get('/:id',
  validatorHandler(getUsuarioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const usuario = await service.findOne(id);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
validatorHandler(createUsuarioSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newUsuario = await service.create(body);
  res.status(201).json(newUsuario);
})

router.patch('/:id',
validatorHandler(getUsuarioSchema, 'params'),
validatorHandler(updateUsuarioSchema, 'body'),
async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const usuario = await service.update(id, body);
    res.json(usuario);
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
