const pathJoin = require('path').join;

const config = {
  // Environments variables
  PORT: 6000,
  NODE_ENV: 'dev',

  // Copy paths before compilation
  copyPath: [
    { src: './src/certs/files' ,dest: './dist/certs' },
    { src: './src/files' , dest: './dist' },
  ],

  // OpenSSL and Certificates configurations
  CERTIFICATES_PATH: 'src/certs/files',
  OPENSSL_PATH: 'C:\\"Program Files"\\Git\\mingw64\\bin\\openssl.exe',  
}

module.exports = config;