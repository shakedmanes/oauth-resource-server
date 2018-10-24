const openssl = require('openssl-wrapper').exec;
const fs = require('fs');

const rawPem = fs.readFileSync('src/certs/files/certificate.pem');
const publicKey = fs.readFileSync('src/certs/files/publickey.pem');

openssl('x509', rawPem, { inform: 'pem', outform: 'pem' }, (err, buffer) => {
  const publicKeyTest = buffer.toString('utf8'); // PEM encoded public key safe to use now
  console.log(publicKey);
  console.log(publicKeyTest);
  console.log(publicKey === publicKeyTest);  
})
