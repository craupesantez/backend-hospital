const Joi = require('joi');

const id  = Joi.string().uuid();
const nombres = Joi.string();
const apellidos = Joi.string();
const identificacion = Joi.string().min(10).max(10);
const telefono = Joi.string().min(7).max(10);
const fechaNacimiento = Joi.date();
const correo = Joi.string().email();
const usuario = Joi.string().min(6).max(15);
const contrasenia = Joi.string().min(8).max(20);
const foto = Joi.string().uri();
// const contraseniaRepetida = Joi.ref(constrasenia);

const createPersonaSchema = Joi.object({
  nombres: nombres.required(),
  apellidos: apellidos.required(),
  identificacion: identificacion.required(),
  telefono: telefono.required(),
  fechaNacimiento: fechaNacimiento,
  correo: correo.required(),
  usuario: usuario.required,
  contrasenia: contrasenia.required(),
  foto: foto.required(),
  // contraseniaRepetida: Joi.ref(contrasenia)
})

const updatePersonaSchema = Joi.object({
  nombres: nombres,
  apellidos: apellidos,
  identificacion: identificacion,
  telefono: telefono,
  fechaNacimiento: fechaNacimiento,
  correo: correo,
  usuario: usuario,
  contrasenia: contrasenia,
  foto: foto,
  // contraseniaRepetida: Joi.ref(contrasenia)
})

const getPersonaSchema = Joi.object({
  id: id.required(),
})

module.exports = { createPersonaSchema, updatePersonaSchema, getPersonaSchema};
