const boom = require('@hapi/boom');
const { models, sequelize } = require('./../libs/sequelize');
const Sequelize = require('./../libs/sequelize');




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
    try {
      const rta = await models.Cita.findAll({
        attributes: [
          'especialidadId',
          [Sequelize.fn('count', Sequelize.col('id')), 'total']
        ],
        group: ['Cita.especialidadId'],
        //  order: ['Cita.especialidadId', 'ASC']
      });
      rta.sort((a, b) => a.especialidadId - b.especialidadId)
      return rta;
    } catch (error) {
      console.log(error);
    }

  }

  async getPromedioByMedico() {
    try {
      const rta = await models.Cita.findAll({
        include: [{
          association: 'medico',
          attributes:['id','nombres','apellidos']
        }],
        attributes:[
          'medicoId',
           [Sequelize.fn('count', Sequelize.col('medicoId')), 'atenciones'],
           [Sequelize.fn('avg', Sequelize.col('calificacion')), 'promedio']
        ],
         group: ['Cita.medicoId','medico.id', 'medico.nombres', 'medico.apellidos'],
        //  order: ['Cita.especialidadId', 'ASC']
      });
      // const rta2 = rta.forEach((item) =>{
      //   item.promedio=item.promedio.toFixed(2)
      //   return item;
      // })
      return rta;
    } catch (error) {
      console.log(error);
    }

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
