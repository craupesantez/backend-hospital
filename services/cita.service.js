const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Sequelize }  = require('Sequelize');


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

  async contarCitasEspecialidad() {
    const rta = await models.Cita.count({
      attributes:[
        'especialidadId',
         [sequelize.fn('count', sequelize.col('id')), 'total']
      ],
      group: especialidadId,
      order: ['especialidadId', 'ASC'],
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

  async findPedidoExamenes() {
    const rta = await models.CitaExamen.findAll();
    // rta.map((item) =>
    //   delete item.dataValues.usuario.dataValues.contrasenia
    // )
    return rta;
  }

  async findReceta() {
    const rta = await models.CitaMedicamento.findAll();
    // rta.map((item) =>
    //   delete item.dataValues.usuario.dataValues.contrasenia
    // )
    return rta;
  }

  async findOnePedidoExamenes(id) {
    const pedido = await models.CitaExamen.findByPk(id,
    //    {
    //   include: ['estado', 'paciente', 'medico', 'pedidos', 'recetas'],
    // }
    );
    if (!pedido) {
      throw boom.notFound('pedido no encontrado');
    }
    return pedido;
  }

  async findOneReceta(id) {
    const receta = await models.CitaMedicamento.findByPk(id,
    //    {
    //   include: ['estado', 'paciente', 'medico', 'pedidos', 'recetas'],
    // }
    );
    if (!receta) {
      throw boom.notFound('receta no encontrado');
    }
    return receta;
  }

  async update(id, changes) {
    const cita = await this.findOne(id);
    const rta = await cita.update(changes);
    return rta;
  }

  async updatePedidoExamenes(id, changes) {
    const pedido = await this.findOnePedidoExamenes(id);
    const rta = await pedido.update(changes);
    return rta;
  }

  async updateReceta(id, changes) {
    const receta = await this.findOneReceta(id);
    const rta = await receta.update(changes);
    return rta;
  }

  async delete(id) {
    const cita = await this.findOne(id);
    await cita.destroy();
    return { id };
  }

  async deletePedido(id) {
    const pedido = await this.findOnePedidoExamenes(id);
    await pedido.destroy();
    return { id };
  }

  async deleteReceta(id) {
    const receta = await this.findOneReceta(id);
    await receta.destroy();
    return { id };
  }

}

module.exports = CitasService;
