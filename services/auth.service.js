const boom = require('@hapi/boom');
const UsuarioService = require('./usuario.service');
const service = new UsuarioService();
const Logger  = require('./../utils/logger/logger');
const logger = new Logger();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const nodemailer = require('nodemailer');



class AuthService {
  async getUsuario(username, contrasenia){
    const usuario = await service.findByUsername(username);
      if (!usuario) {
        logger.error("Error de logeo " )
        throw boom.unauthorized();
      }
      const isMatch = await bcrypt.compare(contrasenia, usuario.contrasenia);
      if (!isMatch) {
        logger.error("Error de logeo ")
        throw boom.unauthorized();
      }else{
        delete usuario.dataValues.contrasenia;
        return usuario;
      }
  }

  signToken(user){
      const payload = {
        sub: user.id,
        role: [user.dataValues.persona.dataValues.roles]
      }
      const token = jwt.sign(payload, config.jwtSecret);
      return({
        // roles: [user.dataValues.persona.dataValues.roles],
        user,
        token
      });
  }

  async sendRecovery(correo){
    const usuario = await service.findByCorreo(correo);
      if (!usuario) {
        throw boom.unauthorized();
      }
     const payload ={sub: usuario.dataValues.id} ;
     const token = jwt.sign(payload, config.jwtSecret, {expiresIn:'15min'});
     const link = `http://localhost:8081/change-password?token=${token}`;
     await service.update(usuario.dataValues.id, {recoveryToken: token});
     const  mail = {
      from: config.smtpEmail, // sender address
      to: correo, // list of receivers
      subject: "Email para recuperar contraseña", // Subject line
      // text: "Hello world?", // plain text body
      html: `<b>Ingresa a este link => ${link}</b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }
  async changePassword(token, newPassword){
    try {
      const payload =jwt.verify(token, config.jwtSecret );
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {recoveryToken: null, contrasenia: hash});
      return{message: 'contraseña cambiada'}
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail){

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
          user: config.smtpEmail,
          pass: config.smtpPassword
      }
    });

    await transporter.sendMail(infoMail);

    return {message: 'mensaje enviado'}
  }
}

module.exports = AuthService;
