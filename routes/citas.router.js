const express = require('express');
const router = express.Router();
const CitasService = require('../services/cita.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCitaSchema, getCitaSchema, updateCitaSchema,
  addExamenesSchema, addMedicamentosSchema,  updateExamenesSchema, updateMedicamentosSchema
} = require('../schemas/cita.schema')

const service = new CitasService();

router.get('/', async (req, res) => {
  const citas = await service.find();
  res.json(citas);
})

router.get('/citas-by-especialidad', async (req, res) => {
  const citas = await service.contarCitasEspecialidad();
  res.json(citas);
})

router.get('/get-promedio', async (req, res) => {
  const citas = await service.getPromedioByMedico();
  res.json(citas);
})

router.get('/pedidos', async (req, res) => {
  const pedidos = await service.findPedidoExamenes();
  res.json(pedidos);
})

router.get('/recetas', async (req, res) => {
  const recetas = await service.findReceta();
  res.json(recetas);
})

router.get('/:id',
  validatorHandler(getCitaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const cita = await service.findOne(id);
      res.json(cita);
    } catch (error) {
      next(error);
    }
  })

  router.post('/',
  validatorHandler(createCitaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  })

  router.patch('/:id',
  validatorHandler(getCitaSchema, 'params'),
  validatorHandler(updateCitaSchema, 'body'),
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
  validatorHandler(getCitaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  });


  router.post('/add-examen',
  validatorHandler(addExamenesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newExamen = await service.createPedidoExamenes(body)
      res.status(201).json(newExamen);
    } catch (error) {
      next(error);
    }
  });

  router.post('/add-medicamento',
  validatorHandler(addMedicamentosSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newMedicamento = await service.createReceta(body)
      res.status(201).json(newMedicamento);
    } catch (error) {
      next(error);
    }
  })

  router.patch('/update-examen/:id',
  validatorHandler(getCitaSchema, 'params'),
  validatorHandler(updateExamenesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.updatePedidoExamenes(id, body));
    } catch (error) {
      next(error);
    }
  })

  router.patch('/update-medicamento/:id',
  validatorHandler(getCitaSchema, 'params'),
  validatorHandler(updateMedicamentosSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.updateReceta(id, body));
    } catch (error) {
      next(error);
    }
  })

  router.delete('/:id',
  validatorHandler(getCitaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  });

  router.delete('/delete-pedido/:id',
  validatorHandler(getCitaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.deletePedido(id));
    } catch (error) {
      next(error);
    }
  });

  router.delete('/delete-receta/:id',
  validatorHandler(getCitaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.deleteReceta(id));
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
