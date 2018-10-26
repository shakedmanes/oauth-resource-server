// resources.routes

import { Router, Request, Response, NextFunction } from 'express';
import { OAuthMiddlewares } from '../oauth/oauth.middlewares';
import { ResourcesController } from './resources.controller';
import { resources } from './resources.mock';
import { NotFound } from '../error/error.types';
import { wrapAsync } from '../asyncWrapper';

const resourcesRoutes = Router();

// Gets files containing in end-user/server folder (Checking access token by introspection)
resourcesRoutes.get(
  '/files',
  wrapAsync(OAuthMiddlewares.ensureAccessTokenByIntrospection),
  (req: Request, res: Response, next: NextFunction) => {
    const resourceOwner = req.token.sub;

    // Checking if the resource owner exists in resources
    if (resourceOwner in resources) {
      const filesList = ResourcesController.getFilesContaining(resources[resourceOwner].filesPath);
      return res.status(200).send(filesList);
    }

    throw new NotFound('Directory not found.');
  },
);

// Gets file contents in end-user/server folder (Checking access token by signature)
resourcesRoutes.get(
  '/files/:filename',
  wrapAsync(OAuthMiddlewares.ensureAccessTokenBySignature),
  (req: Request, res: Response) => {
    const resourceOwner = req.token.sub;
    const filename = req.params.filename;

    // Checking if the resource owner exists in resources and if filename provided
    if (resourceOwner in resources && filename) {
      const fileContents =
        ResourcesController.getSpecificFile(`${resources[resourceOwner].filesPath}/${filename}`);

      // Checking if there's actually file (otherwise the function return null)
      if (fileContents) return res.status(200).send(fileContents);
    }

    throw new NotFound('Directory or filename not found');
  },
);

export default resourcesRoutes;
