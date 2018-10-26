"use strict";
// config
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config = {
    // HTTPS configuration
    privateKeyPath: path_1.join(__dirname, 'certs/files/privatekey.pem'),
    certificatePath: path_1.join(__dirname, 'certs/files/certificate.pem'),
    // OAuth server configuration
    OAUTH_BASE_URL: 'https://localhost:1337',
    AUDIENCE_URL: 'https://localhost:5000',
    get PUBLIC_KEY_ROUTE() { return `${this.OAUTH_BASE_URL}/.well-known/publickey.pem`; },
    get JWKS_ROUTE() { return `${this.OAUTH_BASE_URL}/.well-known/jwks.json`; },
    get CERTIFICATE_ROUTE() { return `${this.OAUTH_BASE_URL}/.well-known/certificate.pem`; },
    get OAUTH_TOKEN_INTROSPECTION_ROUTE() { return `${this.OAUTH_BASE_URL}/oauth2/tokeninfo`; },
    clientCred: {
        id: '123456',
        secret: '123456',
    },
    // Local OAuth files (public key, certificate)
    oauthPublicKeyPath: path_1.join(__dirname, 'certs/oauth/publickey.pem'),
    oauthJWKSPath: path_1.join(__dirname, 'certs/oauth/jwks.json'),
    oauthCertificatePath: path_1.join(__dirname, 'certs/oauth/certificate.pem'),
    // Resources configuration
    resourcesPath(path) { return path_1.join(__dirname, 'files', path); },
};
exports.default = config;
//# sourceMappingURL=config.js.map