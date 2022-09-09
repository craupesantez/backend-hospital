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
const presentComerId  = Joi.number().integer();
const presentacionMedicaId  = Joi.number().integer();
const codigo = Joi.string();
const registroSanitario = Joi.string();
const stockMaximo  = Joi.number().integer();
const stockMinimo  = Joi.number().integer();
const fechaRegistro = Joi.date();


const createMedicamentoSchema = Joi.object({
  nombre: nombre.required(),
  descripcion,
  activo: activo.required(),
  advertencia,
  dosis,
  costoUnidad: costoUnidad.required(),
  costoCaja,
  fechaVencimiento: fechaVencimiento.required(),
  presentComerId,
  presentacionMedicaId,
  codigo,
  registroSanitario,
  stockMaximo,
  stockMinimo,
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
  fechaActualizo,
  presentComerId,
  presentacionMedicaId,
  codigo,
  registroSanitario,
  stockMaximo,
  stockMinimo,
})

const getMedicamentoSchema = Joi.object({
  id: id.required(),
})

module.exports = { createMedicamentoSchema, updateMedicamentoSchema, getMedicamentoSchema};
