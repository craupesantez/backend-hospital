const bcrypt = require('bcrypt');

async function hashPassword(){
  const myPassword = 'cesarin2486';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
