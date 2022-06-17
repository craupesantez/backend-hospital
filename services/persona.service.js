const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');

class PersonasService{
  constructor(){
    // this.personas =[];
  }

  async create(data){
    const newPersona = await models.Persona.create(data);
    return newPersona;
  }

  async find(){
    const rta = await models.Persona.findAll();
    return rta;
  }

  async findOne(id){
    const persona = await models.Persona.findByPk(id);
    if(!persona){
      throw boom.notFound('persona no encontrado');
    }
    return persona;
  }

  async update(id, changes){
    const persona = await this.findOne(id);
    const rta = await persona.update(changes);
    return rta;
  }

  async delete(id){
    const persona = await this.findOne(id);
    await persona.destroy();
    return { id };
  }
}

module.exports = PersonasService;
