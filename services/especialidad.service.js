const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');

class EspecialidadesService{
  constructor(){
    // this.personas =[];
  }

  async create(data){
    // const newUsuario = await models.Usuario.create(data.usuario);
    // const newPersona = await models.Persona.create({
    //   ...data,
    //   usuarioId: newUsuario.id
    // });
    const newEspecialidad = await models.Especialidad.create(data);
    return newEspecialidad;
  }

  async find(){
    const rta = await models.Especialidad.findAll();
    return rta;
  }

  async findOne(id){
    const especialidad = await models.Especialidad.findByPk(id);
    if(!especialidad){
      throw boom.notFound('especialidad no encontrado');
    }
    return especialidad;
  }

  async update(id, changes){
    const especialidad = await this.findOne(id);
    const rta = await especialidad.update(changes);
    return rta;
  }

  async delete(id){
    const especialidad = await this.findOne(id);
    await especialidad.destroy();
    return { id };
  }
}

module.exports = EspecialidadesService;
