const jwt  = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJwZXJzb25hIiwiaWF0IjoxNjU1NjA2ODA3fQ.fTeWjYfdEM35bJhVO428DWtxnA21hBQ6uuxSUtBlkSY';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
