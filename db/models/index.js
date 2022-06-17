const{Persona,PersonaSchema}=require('./persona.model');
function setupModels(sequelize){
  Persona.init(PersonaSchema,Persona.config(sequelize));
}
module.exports=setupModels;
