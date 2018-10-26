"use strict";
// oauth.utils
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const axios_1 = __importDefault(require("axios"));
const node_forge_1 = __importDefault(require("node-forge"));
const config_1 = __importDefault(require("../config"));
const error_types_1 = require("../error/error.types");
var PublicKeyType;
(function (PublicKeyType) {
    PublicKeyType[PublicKeyType["JWKS"] = 0] = "JWKS";
    PublicKeyType[PublicKeyType["PEM"] = 1] = "PEM";
})(PublicKeyType = exports.PublicKeyType || (exports.PublicKeyType = {}));
class OAuthUtils {
    /**
     * Getting the client credentials for using the authorization REST API
     */
    static getClientCredentials() {
        return (Buffer.from(`${config_1.default.clientCred.id}:${config_1.default.clientCred.secret}`).toString('base64'));
    }
    /**
     * Getting the public key from local files or downloading it from the authorization server
     */
    static getOAuthPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.existsSync(config_1.default.oauthPublicKeyPath)) {
                yield OAuthUtils.downloadPublicKey();
                // Validate the public key with the certificate
                if (!(yield OAuthUtils.validatePublicKey(PublicKeyType.PEM, OAuthUtils.publicKeyContents))) {
                    throw new error_types_1.Unauthorized('Invalid corresponding public key to certificate');
                }
            }
            return OAuthUtils.publicKeyContents;
        });
    }
    /**
     * Getting the certificate from local files or donwloading it from the authorization server
     */
    static getOAuthCertificate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.existsSync(config_1.default.oauthCertificatePath)) {
                yield OAuthUtils.downloadCertificate();
            }
            return OAuthUtils.certificateContents;
        });
    }
    /**
     * Downloads public key in pem format
     */
    static downloadPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            yield OAuthUtils.downloadSSLObject(config_1.default.PUBLIC_KEY_ROUTE, config_1.default.oauthPublicKeyPath, OAuthUtils.setPublicKey);
        });
    }
    /**
     * Downloads public key in JWKS format
     */
    static downloadJWKS() {
        return __awaiter(this, void 0, void 0, function* () {
            yield OAuthUtils.downloadSSLObject(config_1.default.JWKS_ROUTE, config_1.default.oauthJWKSPath, OAuthUtils.validatePublicKey.bind({}, PublicKeyType.JWKS));
        });
    }
    /**
     * Downloads SSL certificate in pem format
     */
    static downloadCertificate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield OAuthUtils.downloadSSLObject(config_1.default.CERTIFICATE_ROUTE, config_1.default.oauthCertificatePath, OAuthUtils.setCertificate);
        });
    }
    /**
     * Downloads SSL object (certificate/public key) from specific route and save it in path
     *
     * @param route - Route for downloading the SSL Object
     * @param path - Path for saving the SSL Object
     * @param contentHandler - function to run with the input of the SSL object value
     */
    static downloadSSLObject(route, path, contentHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            // Getting the SSL object from authorization server
            const response = yield axios_1.default.get(route);
            // Saving the SSL object locally for later use
            if (response.status === 200) {
                const directory = path.substr(0, path.lastIndexOf('\\'));
                if (!fs_1.existsSync(directory)) {
                    fs_1.mkdirSync(directory);
                }
                fs_1.writeFileSync(path, response.data);
                if (contentHandler)
                    contentHandler(response.data);
            }
        });
    }
    /**
     * Setting the public key for quick access
     *
     * @param publicKey - Public key to set
     */
    static setPublicKey(publicKey) {
        OAuthUtils.publicKeyContents = publicKey;
    }
    /**
     * Setting the certificate for quick access
     *
     * @param certificate - Certificate to set
     */
    static setCertificate(certificate) {
        OAuthUtils.certificateContents = certificate;
    }
    /**
     * Validates the public key with the current certificate
     *
     * @param publicKey - Public key value to validate
     * @returns Boolean value indicates if the public key is belong to the current certificate
     */
    static validatePublicKey(keyType = PublicKeyType['PEM'], publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // Gets the certificate for validating the public key
            const certificate = yield OAuthUtils.getOAuthCertificate();
            // Exporting the public key from the certificate
            const forgeCertificate = node_forge_1.default.pki.certificateFromPem(certificate);
            // Formating the raw public key into pem
            const publicKeyPem = node_forge_1.default.pki.publicKeyToPem(forgeCertificate.publicKey);
            // Checking if the public keys are equals
            if (keyType === PublicKeyType.PEM) {
                return publicKeyPem === publicKey;
            }
            // TODO: Checking when key type is JWKS
            return true;
        });
    }
}
OAuthUtils.publicKeyContents = (fs_1.existsSync(config_1.default.oauthPublicKeyPath)) ?
    fs_1.readFileSync(config_1.default.oauthPublicKeyPath).toString() : null;
OAuthUtils.certificateContents = (fs_1.existsSync(config_1.default.oauthCertificatePath)) ?
    fs_1.readFileSync(config_1.default.oauthCertificatePath).toString() : null;
exports.OAuthUtils = OAuthUtils;
//# sourceMappingURL=oauth.utils.js.map