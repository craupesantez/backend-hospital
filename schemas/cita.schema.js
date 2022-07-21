const Joi = require('joi');

const id = Joi.number().integer();
const motivo = Joi.string();
const detalle = Joi.string();
const fraccion = Joi.any();
const diagnostico = Joi.string();
const costo = Joi.number();
const fechaInicio = Joi.date();
const fechaActualizo = Joi.date();
const color = Joi.string();
const hora = Joi.any();

const estadoId = Joi.number().integer();
const pacienteId = Joi.number().integer();
const medicoId = Joi.number().integer();
const especialidadId = Joi.number().integer();

const citaId = Joi.number().integer();
const examenId = Joi.number().integer();
const medicamentoId = Joi.number().integer();

const resultado = Joi.string();
const indicaciones = Joi.string();
const cantidad = Joi.number().integer();
const file = Joi.string();
const detalleFile = Joi.string();

const createCitaSchema = Joi.object({
  motivo: motivo.required(),
  detalle,
  costo,
  fechaInicio: fechaInicio.required(),
  color,
  fraccion: fraccion.required(),
  hora: hora.required(),
  estadoId: estadoId.required(),
  pacienteId: pacienteId.required(),
  medicoId: medicoId.required(),
  especialidadId: especialidadId.required(),
})

const updateCitaSchema = Joi.object({
  motivo,
  detalle,
  costo,
  fraccion,
  diagnostico,
  fechaInicio,
  hora,
  color,
  estadoId,
  pacienteId,
  medicoId,
  especialidadId,
})

const getCitaSchema = Joi.object({
  id: id.required(),
})

const addExamenesSchema = Joi.object({
  citaId: citaId.required(),
  examenId: examenId.required(),
  resultado: resultado,
  file: file,
  detalleFile: detalleFile
});


const addMedicamentosSchema = Joi.object({
  citaId: citaId.required(),
  medicamentoId: medicamentoId.required(),
  indicaciones: indicaciones,
  cantidad: cantidad,
});

const updateExamenesSchema = Joi.object({
  citaId: citaId,
  examenId: examenId,
  resultado: resultado,
});

const updateMedicamentosSchema = Joi.object({
  citaId: citaId.required(),
  medicamentoId: medicamentoId.required(),
  indicaciones: indicaciones,
  cantidad: cantidad,
});

module.exports = { createCitaSchema, updateCitaSchema, getCitaSchema, addExamenesSchema,
  addMedicamentosSchema, updateExamenesSchema, updateMedicamentosSchema };
