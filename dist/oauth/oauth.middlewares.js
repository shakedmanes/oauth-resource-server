"use strict";
// oauth.middlewares
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const oauth_controller_1 = require("./oauth.controller");
class OAuthMiddlewares {
    /**
     * Middleware to protect routes and ensure validation of an access token
     * by public key signature signing.
     *
     * @param req - Express request object.
     * @param res - Express response object.
     * @param next - Express next function.
     */
    static ensureAccessTokenBySignature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = req.headers.authorization;
            // Check if access token provided
            if (accessToken) {
                try {
                    const decodedToken = yield oauth_controller_1.OAuthController.validateTokenBySignature(accessToken);
                    req.token = decodedToken;
                    return next();
                }
                catch (err) {
                    // Invalid access token signature
                    return next(new Error('Invalid access token signature.'));
                }
            }
            return next(new Error('Invalid access token provided.'));
        });
    }
    /**
     * Middleware to protect routes and ensure validation of an access token
     * via token introspection endpoint.
     *
     * @param req - Express request object.
     * @param res - Express response object.
     * @param next - Express next function.
     */
    static ensureAccessTokenByIntrospection(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = req.headers.authorization;
            // Check if access token provided
            if (accessToken) {
                try {
                    const decodedToken = yield oauth_controller_1.OAuthController.validateTokenByIntrospection(accessToken);
                    req.token = decodedToken;
                    return next();
                }
                catch (err) {
                    return next(new Error('Invalid acces token provided.'));
                }
            }
            return next(new Error('Invalid access token provided.'));
        });
    }
}
exports.OAuthMiddlewares = OAuthMiddlewares;
//# sourceMappingURL=oauth.middlewares.js.map