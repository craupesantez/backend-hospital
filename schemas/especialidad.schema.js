const Joi = require('joi');

const id  = Joi.number().integer();
const nombre = Joi.string();
const activo = Joi.boolean();
const usuarioRegistro = Joi.string();
const usuarioActualizo = Joi.string();
const fechaActualizo= Joi.date();

const createEspecialidadSchema = Joi.object({
  nombre: nombre.required(),
  activo: activo.required(),
  usuarioRegistro: usuarioRegistro,
  usuarioActualizo: usuarioActualizo,
})

const updateEspecialidadSchema = Joi.object({
  nombre: nombre,
  activo: activo,
  usuarioRegistro: usuarioRegistro,
  usuarioActualizo: usuarioActualizo,
  fechaActualizo
})

const getEspecialidadSchema = Joi.object({
  id: id.required(),
})

module.exports = { createEspecialidadSchema, updateEspecialidadSchema, getEspecialidadSchema};
