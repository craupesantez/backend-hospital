const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    console.log(data);
    const { error } = schema.validate(data, {abortEarly: true});
    if (error) {
      return next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
