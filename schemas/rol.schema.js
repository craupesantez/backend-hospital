const Joi = require('joi');

const id  = Joi.number().integer();
const nombre = Joi.string();
const estado = Joi.string();


const createRolSchema = Joi.object({
  nombre: nombre.required(),
  estado: estado.required(),
})

const updateRolSchema = Joi.object({
  nombre: nombre,
  estado: estado,
})

const getRolSchema = Joi.object({
  id: id.required(),
})

module.exports = { createRolSchema, updateRolSchema, getRolSchema};
