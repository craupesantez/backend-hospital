const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  // logger.debug('Ingreso a funcion validatorHandler');
  return (req, res, next) => {
    const data = req[property];
    // logger.debug("validatorHandler: " + data);
    const { error } = schema.validate(data, {abortEarly: true});
    if (error) {
      return next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
