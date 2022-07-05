const Joi = require('joi');

const id  = Joi.number().integer();
const nombre = Joi.string();
const activo = Joi.boolean();


const createRolSchema = Joi.object({
  nombre: nombre.required(),
  activo: activo.required(),
})

const updateRolSchema = Joi.object({
  nombre: nombre,
  activo: activo,
})

const getRolSchema = Joi.object({
  id: id.required(),
})

module.exports = { createRolSchema, updateRolSchema, getRolSchema};
