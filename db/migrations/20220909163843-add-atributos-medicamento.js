'use strict';

const {MedicamentoSchema, MEDICAMENTO_TABLE } =require('./../models/medicamento.model')
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(MEDICAMENTO_TABLE, 'presentComerId', MedicamentoSchema.presentComerId);
    await queryInterface.addColumn(MEDICAMENTO_TABLE, 'presentacionMedicaId', MedicamentoSchema.presentacionMedicaId);
    await queryInterface.addColumn(MEDICAMENTO_TABLE, 'codigo', MedicamentoSchema.codigo);
    await queryInterface.addColumn(MEDICAMENTO_TABLE, 'registroSanitario', MedicamentoSchema.registroSanitario);
    await queryInterface.addColumn(MEDICAMENTO_TABLE, 'stockMaximo', MedicamentoSchema.stockMaximo);
    await queryInterface.addColumn(MEDICAMENTO_TABLE, 'stockMinimo', MedicamentoSchema.stockMinimo);
    await queryInterface.addColumn(MEDICAMENTO_TABLE, 'fechaRegistro', MedicamentoSchema.fechaRegistro);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(MEDICAMENTO_TABLE, 'presentComerId');
    await queryInterface.removeColumn(MEDICAMENTO_TABLE, 'presentacionMedicaId');
    await queryInterface.removeColumn(MEDICAMENTO_TABLE, 'codigo');
    await queryInterface.removeColumn(MEDICAMENTO_TABLE, 'registroSanitario');
    await queryInterface.removeColumn(MEDICAMENTO_TABLE, 'stockMaximo');
    await queryInterface.removeColumn(MEDICAMENTO_TABLE, 'stockMinimo');
    await queryInterface.removeColumn(MEDICAMENTO_TABLE, 'fechaRegistro');
  }
};
