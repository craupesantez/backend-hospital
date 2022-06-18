const Joi = require('joi');

const id  = Joi.number().integer();
const tipo = Joi.string();
const nombre = Joi.string();
const descripcion = Joi.string();
const padre = Joi.string();


const createCatalogoSchema = Joi.object({
  tipo: tipo.required(),
  nombre: nombre.required(),
  descripcion: descripcion,
  padre: padre,
})

const updateCatalogoSchema = Joi.object({
  tipo: tipo,
  nombre: nombre,
  descripcion: descripcion,
  padre: padre,
})

const getCatalogoSchema = Joi.object({
  id: id.required(),
})

module.exports = { createCatalogoSchema, updateCatalogoSchema, getCatalogoSchema};
