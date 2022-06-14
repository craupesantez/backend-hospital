const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

})

router.get('/:idEspecialidad/personas/:idPersona',(req, res) => {
  const{idEspecialidad, idPersona} = req.params;
  res.json({
    idEspecialidad,
    idPersona
  })
})

router.post('/',(req, res) => {

})

router.patch('/',(req, res) => {

})

router.delete('/',(req, res) => {

})

module.exports = router;


