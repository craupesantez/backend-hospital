const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');

class CatalogosService{
  constructor(){
    // this.personas =[];
  }

  async create(data){
    // const newUsuario = await models.Usuario.create(data.usuario);
    // const newPersona = await models.Persona.create({
    //   ...data,
    //   usuarioId: newUsuario.id
    // });
    const newCatalogo = await models.Catalogo.create(data);
    return newCatalogo;
  }

  async find(){
    const rta = await models.Catalogo.findAll();
    return rta;
  }

  async findOne(id){
    const catalogo = await models.Catalogo.findByPk(id,{
      // include: ['personas']
    });
    if(!catalogo){
      throw boom.notFound('catalogo no encontrado');
    }
    return catalogo;
  }

  async update(id, changes){
    const catalogo = await this.findOne(id);
    const rta = await catalogo.update(changes);
    return rta;
  }

  async delete(id){
    const catalogo = await this.findOne(id);
    await catalogo.destroy();
    return { id };
  }
}

module.exports = CatalogosService;
