const Joi = require('joi');

const id  = Joi.number().integer();
const nombres = Joi.string();
const apellidos = Joi.string();
const telefono = Joi.string().min(7).max(10);
const foto = Joi.string().uri();
const fechaNacimiento = Joi.date();
const identificacion = Joi.string().min(10).max(10);
const correo = Joi.string().email();
const usuarioId = Joi.number().integer();
const username = Joi.string().min(8);
const contrasenia = Joi.string().min(8);
const catalogoId = Joi.number().integer();

const personaId= Joi.number().integer();
const especialidadId = Joi.number().integer();


const createPersonaSchema = Joi.object({
  nombres: nombres.required(),
  apellidos: apellidos.required(),
  telefono: telefono.required(),
  foto: foto.required(),
  fechaNacimiento: fechaNacimiento,
  identificacion: identificacion.required(),
  correo: correo.required(),
  usuario: Joi.object({
    username: username.required(),
    contrasenia: contrasenia.required(),
  }),
  catalogoId: catalogoId.required(),
})

const updatePersonaSchema = Joi.object({
  nombres: nombres,
  apellidos: apellidos,
  telefono: telefono,
  foto: foto,
  fechaNacimiento: fechaNacimiento,
  identificacion: identificacion,
  correo: correo,
  usuarioId,
  catalogoId
})

const getPersonaSchema = Joi.object({
  id: id.required(),
})

const addRamasSchema = Joi.object({
  personaId: personaId.required(),
  especialidadId: especialidadId.required(),
});

module.exports = { createPersonaSchema, updatePersonaSchema, getPersonaSchema, addRamasSchema};
