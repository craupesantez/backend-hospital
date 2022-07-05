const Joi = require('joi');

const id  = Joi.number().integer();
const nombre = Joi.string();
const descripcion = Joi.string();
const requisitos = Joi.string();
const activo = Joi.boolean();


const createExamenSchema = Joi.object({
  nombre: nombre.required(),
  descripcion,
  requisitos: requisitos,
  activo: activo.required()
})

const updateExamenSchema = Joi.object({
  nombre: nombre,
  descripcion,
  requisitos: requisitos,
  activo: activo
})

const getExamenSchema = Joi.object({
  id: id.required(),
})

module.exports = { createExamenSchema, updateExamenSchema, getExamenSchema};
