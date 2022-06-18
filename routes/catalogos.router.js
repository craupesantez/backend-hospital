const express = require('express');
const router = express.Router();
const CatalogosService = require('../services/catalogo.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCatalogoSchema, updateCatalogoSchema, getCatalogoSchema } = require('../schemas/catalogo.schema');

const service = new CatalogosService();

router.get('/', async (req, res) => {
  const catalogos = await service.find();
  res.json(catalogos);
})

router.get('/:id',
  validatorHandler(getCatalogoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const catalogo = await service.findOne(id);
      res.json(catalogo);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
  validatorHandler(createCatalogoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  })

router.patch('/:id',
  validatorHandler(getCatalogoSchema, 'params'),
  validatorHandler(updateCatalogoSchema, 'body'),
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
  validatorHandler(getCatalogoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
