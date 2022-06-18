const { Persona, PersonaSchema } = require('./persona.model');
const { Usuario, UsuarioSchema } = require('./usuario.model');
const { Catalogo, CatalogoSchema } = require('./catalogo.model');
const { Especialidad, EspecialidadSchema } = require('./especialidad.model');
const { PersonaEspecialidad, PersonaEspecialidadSchema} = require('./persona-especialidad.model');
const { Rol, RolSchema } = require('./rol.model');
const { PersonaRol, PersonaRolSchema }= require('./persona-rol.model');

function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Persona.init(PersonaSchema, Persona.config(sequelize));
  Catalogo.init(CatalogoSchema, Catalogo.config(sequelize));
  Especialidad.init(EspecialidadSchema, Especialidad.config(sequelize));
  PersonaEspecialidad.init(PersonaEspecialidadSchema, PersonaEspecialidad.config(sequelize));
  Rol.init(RolSchema, Rol.config(sequelize));
  PersonaRol.init(PersonaRolSchema, PersonaRol.config(sequelize));

  Usuario.associate(sequelize.models);
  Persona.associate(sequelize.models);
  Catalogo.associate(sequelize.models);
}
module.exports = setupModels;
