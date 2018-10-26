"use strict";
// resources.routes
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oauth_middlewares_1 = require("../oauth/oauth.middlewares");
const resources_controller_1 = require("./resources.controller");
const resources_mock_1 = require("./resources.mock");
const error_types_1 = require("../error/error.types");
const asyncWrapper_1 = require("../asyncWrapper");
const resourcesRoutes = express_1.Router();
// Gets files containing in end-user/server folder (Checking access token by introspection)
resourcesRoutes.get('/files', asyncWrapper_1.wrapAsync(oauth_middlewares_1.OAuthMiddlewares.ensureAccessTokenByIntrospection), (req, res, next) => {
    const resourceOwner = req.token.sub;
    // Checking if the resource owner exists in resources
    if (resourceOwner in resources_mock_1.resources) {
        const filesList = resources_controller_1.ResourcesController.getFilesContaining(resources_mock_1.resources[resourceOwner].filesPath);
        return res.status(200).send(filesList);
    }
    throw new error_types_1.NotFound('Directory not found.');
});
// Gets file contents in end-user/server folder (Checking access token by signature)
resourcesRoutes.get('/files/:filename', asyncWrapper_1.wrapAsync(oauth_middlewares_1.OAuthMiddlewares.ensureAccessTokenBySignature), (req, res) => {
    const resourceOwner = req.token.sub;
    const filename = req.params.filename;
    // Checking if the resource owner exists in resources and if filename provided
    if (resourceOwner in resources_mock_1.resources && filename) {
        const fileContents = resources_controller_1.ResourcesController.getSpecificFile(`${resources_mock_1.resources[resourceOwner].filesPath}/${filename}`);
        // Checking if there's actually file (otherwise the function return null)
        if (fileContents)
            return res.status(200).send(fileContents);
    }
    throw new error_types_1.NotFound('Directory or filename not found');
});
exports.default = resourcesRoutes;
//# sourceMappingURL=resources.routes.js.map