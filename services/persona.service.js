const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');
const bcrypt = require('bcrypt');

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
    const hash = await bcrypt.hash(data.usuario.contrasenia, 10);
    const newData = {
      ...data,
      usuario: {
        ...data.usuario,
        contrasenia: hash
      }
    }
    const newPersona = await models.Persona.create(newData,{
      include: ['usuario']
    });
      delete newPersona.dataValues.usuario.dataValues.contrasenia;
    return newPersona;
  }

  async addEspecialidad(data){
    const newRama = await models.PersonaEspecialidad.create(data);
    return newRama;
  }

  async addRol(data){
    const newRol = await models.PersonaRol.create(data);
    return newRol;
  }

  async find(){
    const rta = await models.Persona.findAll({
      include: ['usuario','catalogo', 'roles'],
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
