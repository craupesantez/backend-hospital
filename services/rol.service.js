const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class RolesService {
  constructor() {
    // this.personas =[];
  }

  async create(data) {
    const newRol = await models.Rol.create(data);
    return newRol;
  }

  async find() {
    const rta = await models.Rol.findAll();
    return rta;
  }


  async findOne(id) {
    const rol = await models.Rol.findByPk(id);
    if (!rol) {
      throw boom.notFound('rol no encontrado');
    }
    return rol;
  }

  async update(id, changes) {
    const rol = await this.findOne(id);
    const rta = await rol.update(changes);
    return rta;
  }

  async delete(id) {
    const rol = await this.findOne(id);
    await rol.destroy();
    return { id };
  }
}

module.exports = RolesService;
