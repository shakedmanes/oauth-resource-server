const fs = require('fs');
const config = require('./config');

function generateEnvFile(port, nodeEnv) {
  // Creates .env file for configuration
  fs.writeFileSync('.env', `PORT=${port}\r\nNODE_ENV=${nodeEnv}`);
}

generateEnvFile(config.PORT, config.NODE_ENV);