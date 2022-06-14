const faker = require('faker');
const boom = require('@hapi/boom');

class PersonasService{

  constructor(){
    this.personas =[];
  }

  async create(data){
    const newPersona = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.personas.push(newPersona);
    return newPersona;
  }

  async find(){
    return this.personas;
  }

  async findOne(id){
    const persona = this.personas.find(item => item.id === id);
    if(!persona){
      throw boom.notFound('persona no encontrado');
    }
    if( persona.isBlock){
      throw boom.notFound('persona esta bloqueada');
    }
    return persona;
  }

  async update(id, changes){
    const index = this.personas.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('persona no encontrado');//new Error('Persona no encontrada');
    }
    const persona = this.personas[index];
    this.personas[index] = {
      ...persona,
      ...changes
    };
    return this.personas[index];
  }

  async delete(id){
    const index = this.personas.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('persona no encontrado');
    }
    this.personas.splice(index, 1);
    return { id };
  }
}

module.exports = PersonasService;
