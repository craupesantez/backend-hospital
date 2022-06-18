const Joi = require('joi');

const id  = Joi.string().uuid();
const username = Joi.string().min(8);
const contrasenia = Joi.string().min(8);


const createUsuarioSchema = Joi.object({
  username: username.required(),
  contrasenia: contrasenia.required(),
})

const updateUsuarioSchema = Joi.object({
  username: username,
  contrasenia: contrasenia,
})

const getUsuarioSchema = Joi.object({
  id: id.required(),
})

module.exports = { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema};
