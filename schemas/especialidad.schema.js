const Joi = require('joi');

const id  = Joi.number().integer();
const nombre = Joi.string();
const estado = Joi.string();
const usuarioRegistro = Joi.string();
const usuarioActualizo = Joi.string();

const createEspecialidadSchema = Joi.object({
  nombre: nombre.required(),
  estado: estado.required(),
  usuarioRegistro: usuarioRegistro,
  usuarioActualizo: usuarioActualizo,
})

const updateEspecialidadSchema = Joi.object({
  nombre: nombre,
  estado: estado,
  usuarioRegistro: usuarioRegistro,
  usuarioActualizo: usuarioActualizo,
})

const getEspecialidadSchema = Joi.object({
  id: id.required(),
})

module.exports = { createEspecialidadSchema, updateEspecialidadSchema, getEspecialidadSchema};
