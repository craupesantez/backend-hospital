const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');

class PersonasService{
  constructor(){
    // this.personas =[];
  }

  async create(data){
    // const newUsuario = await models.Usuario.create(data.usuario);
    // const newPersona = await models.Persona.create({
    //   ...data,
    //   usuarioId: newUsuario.id
    // });
    const newPersona = await models.Persona.create(data, {
      include: ['usuario']
    });
    return newPersona;
  }

  async addEspecialidad(data){
    const newRama = await models.PersonaEspecialidad.create(data);
    return newRama;
  }

  async find(){
    const rta = await models.Persona.findAll({
      include: ['usuario','catalogo'],
    });
    return rta;
  }

  async findOne(id){
    const persona = await models.Persona.findByPk(id, {
      include: ['catalogo', 'ramas', 'roles'], //['usuario','catalogo']
      //'ramas'
    });
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
