const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');

class MedicamentosService{
  constructor(){
    // this.personas =[];
  }

  async create(data){
    // const newUsuario = await models.Usuario.create(data.usuario);
    // const newPersona = await models.Persona.create({
    //   ...data,
    //   usuarioId: newUsuario.id
    // });
    const newMedicamento = await models.Medicamento.create(data);
    return newMedicamento;
  }

  async find(){
    const rta = await models.Medicamento.findAll();
    return rta;
  }

  async findOne(id){
    const medicamento = await models.Medicamento.findByPk(id);
    if(!medicamento){
      throw boom.notFound('medicamento no encontrado');
    }
    return medicamento;
  }

  async update(id, changes){
    const medicamento = await this.findOne(id);
    const rta = await medicamento.update(changes);
    return rta;
  }

  async delete(id){
    const medicamento = await this.findOne(id);
    await medicamento.destroy();
    return { id };
  }
}

module.exports = MedicamentosService;
