const bcrypt = require('bcrypt');

async function verifyPassword(){
  const myPassword = 'admin123';
  const hash = '$2b$10$DQGOHIma8Mt8mMUkUOEouuvcIs2/Gw0c4bvl8efL31R2LcilMdeia';
  const isMacth = await bcrypt.compare(myPassword, hash);
  console.log(isMacth);
}

verifyPassword();
