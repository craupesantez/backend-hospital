const express = require('express');
const router = express.Router();
const MedicamentosService = require('../services/medicamento.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkAdminRole } = require('../middlewares/auth.handler');
const { createMedicamentoSchema, updateMedicamentoSchema, getMedicamentoSchema } = require('../schemas/medicamento.schema');
const passport = require('passport');

const service = new MedicamentosService();

router.get('/',
  //  passport.authenticate('jwt', { session: false }),
  // checkAdminRole,
  async (req, res) => {
    const medicamentos = await service.find();
    res.json(medicamentos);
  })

router.get('/:id',
  validatorHandler(getMedicamentoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const medicamento = await service.findOne(id);
      res.json(medicamento);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
  // passport.authenticate('jwt', { session: false }),
 // checkAdminRole,
  validatorHandler(createMedicamentoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  })

router.patch('/:id',
  validatorHandler(getMedicamentoSchema, 'params'),
  validatorHandler(updateMedicamentoSchema, 'body'),
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
  validatorHandler(getMedicamentoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
