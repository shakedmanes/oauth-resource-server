// resources.routes

import { Router } from 'express';
import { OAuthMiddlewares } from '../oauth/oauth.middlewares';
import { ResourcesController } from './resources.controller';
import { resources } from './resources.mock';

const resourcesRoutes = Router();

// Gets files containing in end-user/server folder (Checking access token by introspection)
resourcesRoutes.get('/files', OAuthMiddlewares.ensureAccessTokenByIntrospection, (req, res) => {
  const resourceOwner = req.token.sub;

  // Checking if the resource owner exists in resources
  if (resourceOwner in resources) {
    const filesList = ResourcesController.getFilesContaining(resources[resourceOwner].filesPath);
    return res.status(200).send(filesList);
  }

  return res.status(404).send('Directory not found');
});

// Gets file contents in end-user/server folder (Checking access token by signature)
resourcesRoutes.get(
  '/files/:filename',
  OAuthMiddlewares.ensureAccessTokenBySignature,
  (req, res) => {
    const resourceOwner = req.token.sub;
    const filename = req.params.filename;

    // Checking if the resource owner exists in resources and if filename provided
    if (resourceOwner in resources && filename) {
      const fileContents =
        ResourcesController.getSpecificFile(`${resources[resourceOwner].filesPath}/${filename}`);

      // Checking if there's actually file (otherwise the function return null)
      if (fileContents) return res.status(200).send(fileContents);
    }

    return res.status(404).send('Directory or filename not found');
  },
);

export default resourcesRoutes;
