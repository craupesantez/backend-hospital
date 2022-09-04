const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler')
const Logger = require('./utils/logger/logger')
const logger = new Logger()

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://myapp.co'];
const options = {
  origin: (origin, callback)=>{
    if (whitelist.includes(origin)|| !origin){
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  },
}
app.use(cors());
require('./utils/auth');

app.get('/', (req, res) => {
  res.send('hola mi server en express');
})

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('hola soy una nueva ruta');
})


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  logger.info('Mi port: ' + port);
  //logger.info('Mensaje informativo')
  //logger.warn('Mensaje de advertencia')
  //logger.error('Mensaje de error')
  //logger.info('Mensaje con datos', { user: 'John Smith' })
});
