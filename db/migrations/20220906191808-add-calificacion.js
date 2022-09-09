'use strict';
const {CitaSchema, CITA_TABLE } =require('./../models/cita.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(CITA_TABLE, 'calificacion', CitaSchema.calificacion);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CITA_TABLE, 'calificacion');
  }
};
