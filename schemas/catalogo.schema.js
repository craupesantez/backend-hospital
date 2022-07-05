const Joi = require('joi');

const id  = Joi.number().integer();
const tipo = Joi.string();
const nombre = Joi.string();
const descripcion = Joi.string();
const padre = Joi.string();
const activo = Joi.boolean();


const createCatalogoSchema = Joi.object({
  tipo: tipo.required(),
  nombre: nombre.required(),
  descripcion,
  padre: padre,
  activo: activo.required()
})

const updateCatalogoSchema = Joi.object({
  tipo: tipo,
  nombre: nombre,
  descripcion,
  padre: padre,
  activo: activo
})

const getCatalogoSchema = Joi.object({
  id: id.required(),
})

module.exports = { createCatalogoSchema, updateCatalogoSchema, getCatalogoSchema};
