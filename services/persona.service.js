const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class PersonasService {
  constructor() {
    // this.personas =[];
  }

  async create(data) {
    const hash = await bcrypt.hash(data.usuario.contrasenia, 10);
    const newData = {
      ...data,
      usuario: {
        ...data.usuario,
        contrasenia: hash
      }
    }
    const newPersona = await models.Persona.create(newData, {
      include: ['usuario']
    });
    delete newPersona.dataValues.usuario.dataValues.contrasenia;
    const paciente = {
      personaId: newPersona.dataValues.id,
      rolId: 2
    };
    const newRolPaciente = await this.addRol(paciente);
    return newPersona;
  }

  async createPersonal(data) {
    const hash = await bcrypt.hash(data.usuario.contrasenia, 10);
    const newData = {
      ...data,
      usuario: {
        ...data.usuario,
        contrasenia: hash
      }
    }
    const newPersona = await models.Persona.create(newData, {
      include: ['usuario']
    });
    delete newPersona.dataValues.usuario.dataValues.contrasenia;
    // const paciente = {
    //   personaId: newPersona.dataValues.id,
    //   rolId: 2
    // };
    // const newRolPaciente = await this.addRol(paciente);
    return newPersona;
  }

  async addEspecialidad(data) {
    const newRama = await models.PersonaEspecialidad.create(data);
    return newRama;
  }

  async addRol(data) {
    const newRol = await models.PersonaRol.create(data);
    return newRol;
  }

  async find() {
    const rta = await models.Persona.findAll({
      include: ['usuario', 'catalogo', 'roles', 'genero', 'tipoIdentificacion'],
    });
    rta.map((item) =>
      delete item.dataValues.usuario.dataValues.contrasenia
    )
    return rta;
  }

  async findOne(id) {
    const persona = await models.Persona.findByPk(id, {
      include: ['usuario', 'catalogo', 'ramas', 'roles', 'genero', 'tipoIdentificacion'], //['usuario','catalogo']
      //'ramas'
    });
    delete persona.dataValues.usuario.dataValues.contrasenia;
    if (!persona) {
      throw boom.notFound('persona no encontrado');
    }
    return persona;
  }

  async update(id, changes) {
    const persona = await this.findOne(id);
    const rta = await persona.update(changes);
    return rta;
  }

  async delete(id) {
    const persona = await this.findOne(id);
    await persona.destroy();
    return { id };
  }

  async findIdentificacion(identificacion){
    const persona = await this.findOne({
      where:  {identificacion: identificacion},
  });
    return persona;
  }
}

module.exports = PersonasService;
