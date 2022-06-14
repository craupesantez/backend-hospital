const express = require('express');
const router = express.Router();



router.get('/login', (req, res) => {
  res.json({
    correo: 'craupesantez@gmail.com',
    password: 'cesarin2486'
  });
})

router.get('/recovery', (req, res) => {

})

router.post('/chance-password', (req, res) => {

})


module.exports = router;
