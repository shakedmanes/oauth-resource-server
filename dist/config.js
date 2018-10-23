"use strict";
// config
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var config = {
    // HTTPS configuration
    privateKeyPath: path_1.join(__dirname, 'certs/files/privatekey.pem'),
    certificatePath: path_1.join(__dirname, 'certs/files/certificate.pem'),
};
exports.default = config;
//# sourceMappingURL=config.js.map