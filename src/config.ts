// config

import { join } from 'path';

const config = {
  // HTTPS configuration
  privateKeyPath: join(__dirname, 'certs/files/privatekey.pem'),
  certificatePath: join(__dirname, 'certs/files/certificate.pem'),

  // OAuth server configuration
  OAUTH_BASE_URL: 'https://localhost:1337',
  get PUBLIC_KEY_ROUTE() { return `${this.OAUTH_BASE_URL}/.well-known/publickey.pem`; },
  get JWKS_ROUTE() { return `${this.OAUTH_BASE_URL}/.well-known/jwks.json`; },
  get CERTIFICATE_ROUTE() { return `${this.OAUTH_BASE_URL}/.well-known/certificate.pem`; },

  // Local OAuth files (public key, certificate)
  oauthPublicKeyPath: join(__dirname, 'certs/oauth/publickey.pem'),
  oauthJWKSPath: join(__dirname, 'certs/oauth/jwks.json'),
  oauthCertificatePath: join(__dirname, 'certs/oauth/certificate.pem'),
};

export default config;