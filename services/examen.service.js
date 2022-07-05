const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');

class ExamenesService{
  constructor(){
    // this.personas =[];
  }

  async create(data){
    // const newUsuario = await models.Usuario.create(data.usuario);
    // const newPersona = await models.Persona.create({
    //   ...data,
    //   usuarioId: newUsuario.id
    // });
    const newExamen = await models.Examen.create(data);
    return newExamen;
  }

  async find(){
    const rta = await models.Examen.findAll();
    return rta;
  }

  async findOne(id){
    const examen = await models.Examen.findByPk(id);
    if(!examen){
      throw boom.notFound('examen no encontrado');
    }
    return examen;
  }

  async update(id, changes){
    const examen = await this.findOne(id);
    const rta = await examen.update(changes);
    return rta;
  }

  async delete(id){
    const examen = await this.findOne(id);
    await examen.destroy();
    return { id };
  }
}

module.exports = ExamenesService;
