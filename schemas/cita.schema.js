const Joi = require('joi');

const id = Joi.number().integer();
const motivo = Joi.string();
const detalle = Joi.string();
// const fraccion = Joi.string();
const diagnostico = Joi.string();
const costo = Joi.number();
const fechaInicio = Joi.date();
const fechaActualizo = Joi.date();
const color = Joi.string();

const estadoId = Joi.number().integer();
const pacienteId = Joi.number().integer();
const medicoId = Joi.number().integer();

const examenId = Joi.number().integer();
const medicamentoId = Joi.number().integer();

const resultado = Joi.string();
const indicaciones = Joi.string();
const cantidad = Joi.number().integer();

const createCitaSchema = Joi.object({
  motivo: motivo.required(),
  detalle,
  costo,
  fechaInicio: fechaInicio.required(),
  color,
  estadoId: estadoId.required(),
  pacienteId: pacienteId.required(),
  medicoId: medicoId.required(),
})

const updateCitaSchema = Joi.object({
  motivo,
  detalle,
  costo,
  fraccion,
  diagnostico,
  fechaInicio,
  color,
  estadoId,
  pacienteId,
  medicoId,
})

const getCitaSchema = Joi.object({
  id: id.required(),
})

const addExamenesSchema = Joi.object({
  citaId: personaId.required(),
  examenId: especialidadId.required(),
  resultado: resultado.required(),
});

const addMedicamentosSchema = Joi.object({
  citaId: personaId.required(),
  medicamentoId: especialidadId.required(),
  indicaciones: resultado.required(),
  cantidad: resultado.required(),
});

module.exports = { createCitaSchema, updateCitaSchema, getCitaSchema, addExamenesSchema, addMedicamentosSchema };
