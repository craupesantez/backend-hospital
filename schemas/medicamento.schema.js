const Joi = require('joi');

const id  = Joi.number().integer();
const nombre = Joi.string();
const descripcion = Joi.string();
const activo = Joi.boolean();
const advertencia = Joi.string();
const dosis = Joi.string();
const costoUnidad = Joi.number();
const costoCaja = Joi.number();
const fechaVencimiento = Joi.date();
const fechaActualizo = Joi.date();


const createMedicamentoSchema = Joi.object({
  nombre: nombre.required(),
  descripcion,
  activo: activo.required(),
  advertencia,
  dosis,
  costoUnidad: costoUnidad.required(),
  costoCaja,
  fechaVencimiento: fechaVencimiento.required(),
})

const updateMedicamentoSchema = Joi.object({
  nombre: nombre,
  descripcion,
  activo: activo,
  advertencia,
  dosis,
  costoUnidad,
  costoCaja,
  fechaVencimiento,
  fechaActualizo
})

const getMedicamentoSchema = Joi.object({
  id: id.required(),
})

module.exports = { createMedicamentoSchema, updateMedicamentoSchema, getMedicamentoSchema};
