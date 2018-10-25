"use strict";
// oauth.controller
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
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const oauth_utils_1 = require("./oauth.utils");
const config_1 = __importDefault(require("../config"));
const resources_mock_1 = require("../resources/resources.mock");
class OAuthController {
    /**
     * Validates access token by its public key and audience and authorized clients
     *
     * @param accessToken - Access token to validate
     */
    static validateTokenBySignature(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = (jsonwebtoken_1.default.verify(accessToken, yield oauth_utils_1.OAuthUtils.getOAuthPublicKey()));
            // Checking if token audience is ours url and substance is in resources
            if (decodedToken.aud === config_1.default.AUDIENCE_URL && decodedToken.sub in resources_mock_1.resources) {
                return decodedToken;
            }
            throw new Error('Unauthorized access token provided.');
        });
    }
    /**
     * Validates access token by token introspection endpoint
     *
     * @param accessToken - Access token to validate
     */
    static validateTokenByIntrospection(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(config_1.default.OAUTH_TOKEN_INTROSPECTION_ROUTE, { token: accessToken }, { headers: { Authorization: `Basic ${oauth_utils_1.OAuthUtils.getClientCredentials()}` } });
                // If request successfully
                if (response.status === 200) {
                    if (response.data.active &&
                        response.data.aud === config_1.default.AUDIENCE_URL &&
                        response.data.sub in resources_mock_1.resources) {
                        return response.data;
                    }
                    throw new Error('Unauthorized access token provided.');
                }
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
}
exports.OAuthController = OAuthController;
//# sourceMappingURL=oauth.controller.js.map