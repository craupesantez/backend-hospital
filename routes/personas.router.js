const express = require('express');
const router = express.Router();
const PersonasService = require('../services/persona.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPersonaSchema, updatePersonaSchema, getPersonaSchema } = require('../schemas/persona.schema');

const service = new PersonasService();

router.get('/', async (req, res) => {
  const personas = await service.find();
  res.json(personas);
  // const { limit, offset } = req.query;
  // if (limit && offset) {
  //   res.json([
  //     {
  //       nombre: 'Cesar Augusto',
  //       apellidos: 'Pesantez Carrion',
  //       identificacion: '1104558653',
  //       fechaNacimiento: '24-09-1986',
  //       telefono: '0984230998',
  //       foto: 'link de la foto de',
  //     },
  //     {
  //       nombre: 'Gina Elizabeth',
  //       apellidos: 'Pesantez Carrion',
  //       identificacion: '1103694301',
  //       fechaNacimiento: '24-09-1986',
  //       telefono: '0984230998',
  //       foto: 'link de la foto de',
  //       limit,
  //       offset
  //     }
  //   ]);
  // } else {
  //   res.send('No hay parametros');
  // }

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

    // if (id === '999') {
    //   res.status(404).json({
    //     message: 'no encontrado'
    //   })
    // } else {
    //   res.status(200).json({
    //     id,
    //     nombre: 'Cesar Augusto',
    //     apellidos: 'Pesantez Carrion',
    //     identificacion: '1104558653',
    //     fechaNacimiento: '24-09-1986',
    //     telefono: '0984230998',
    //     foto: 'link de la foto de'
    //   });
    // }

  })

router.post('/',
validatorHandler(createPersonaSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newPersona = await service.create(body);
  res.status(201).json(newPersona);
})

router.patch('/:id',
validatorHandler(getPersonaSchema, 'params'),
validatorHandler(updatePersonaSchema, 'body'),
async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const persona = await service.update(id, body);
    res.json(persona);
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
