const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');


class CitasService {
  constructor() {
    // this.personas =[];
  }

  async create(data) {

    const newCita = await models.Cita.create(data);
    return newCita;
  }


  async createPedidoExamenes(data) {
    const newPedido = await models.CitaExamen.create(data);
    return newPedido;
  }

  async createReceta(data) {
    const newReceta = await models.CitaMedicamento.create(data);
    return newReceta;
  }

  async find() {
    const rta = await models.Cita.findAll({
      include: ['estado', 'paciente', 'medico', 'pedidos', 'recetas'],
    });
    // rta.map((item) =>
    //   delete item.dataValues.usuario.dataValues.contrasenia
    // )
    return rta;
  }

  async findOne(id) {
    const cita = await models.Cita.findByPk(id, {
      include: ['estado', 'paciente', 'medico', 'pedidos', 'recetas'],
      //'ramas'
    });
    // delete persona.dataValues.usuario.dataValues.contrasenia;
    if (!cita) {
      throw boom.notFound('cita no encontrado');
    }
    return cita;
  }

  async update(id, changes) {
    const cita = await this.findOne(id);
    const rta = await cita.update(changes);
    return rta;
  }

  async delete(id) {
    const cita = await this.findOne(id);
    await cita.destroy();
    return { id };
  }

}

module.exports = CitasService;
