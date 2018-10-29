// config

import { join } from 'path';

const config = {
  // HTTPS configuration
  privateKeyPath: join(__dirname, 'certs/files/privatekey.pem'),
  certificatePath: join(__dirname, 'certs/files/certificate.pem'),

  // OAuth server configuration
  OAUTH_BASE_URL: 'https://localhost:1337',
  AUDIENCE_URL: 'https://localhost:6000', // Our URL as audience for the access token
  get PUBLIC_KEY_ROUTE() { return `${this.OAUTH_BASE_URL}/.well-known/publickey.pem`; },
  get JWKS_ROUTE() { return `${this.OAUTH_BASE_URL}/.well-known/jwks.json`; },
  get CERTIFICATE_ROUTE() { return `${this.OAUTH_BASE_URL}/.well-known/certificate.pem`; },
  get OAUTH_TOKEN_INTROSPECTION_ROUTE() { return `${this.OAUTH_BASE_URL}/oauth2/tokeninfo`; },
  clientCred: {
    id: 'jote5IxK57vyDWgmCl_6SKtZJJGqE~2Wjl7qmd0c',
    // tslint:disable-next-line:max-line-length
    secret: '_oWLDsJ1dfLgsWowynahcUminGfMKbhixsSI1JUjne06dkIU5u_q1kq0pRmtJtbvcREKFxxVToYTYVH0z1m9u~OWxrrBvB7NOWjQ',
  },

  // Local OAuth files (public key, certificate)
  oauthPublicKeyPath: join(__dirname, 'certs/oauth/publickey.pem'),
  oauthJWKSPath: join(__dirname, 'certs/oauth/jwks.json'),
  oauthCertificatePath: join(__dirname, 'certs/oauth/certificate.pem'),

  // Resources configuration
  resourcesPath(path: string) { return join(__dirname, 'files', path); },
};

export default config;
