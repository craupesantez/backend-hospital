const boom = require('@hapi/boom');

const { config } = require('./../config/config')

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if(user.role['0']['0'].nombre==='ADMINISTRADOR'){
    next();
  }else{
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey , checkAdminRole};
