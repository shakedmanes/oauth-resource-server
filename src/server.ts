// server

import * as https from 'https';
import { readFileSync } from 'fs';
import config from './config';
import app from './app';

// HTTPS options configuration
const options = {
  key: readFileSync(config.privateKeyPath),
  cert: readFileSync(config.certificatePath),
};

https.createServer(options, app).listen(app.get('port'), () => {
  console.log(`Resource Server is running at https://localhost:${app.get('port')}
               in ${app.get('env')} mode`);
});
