// oauth.middlewares

import { Request, Response, NextFunction } from 'express';
import { OAuthController } from './oauth.controller';

export class OAuthMiddlewares {

  /**
   * Middleware to protect routes and ensure validation of an access token
   * by public key signature signing.
   *
   * @param req - Express request object.
   * @param res - Express response object.
   * @param next - Express next function.
   */
  static async ensureAccessTokenBySignature(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization;

    // Check if access token provided
    if (accessToken) {
      try {
        const decodedToken = await OAuthController.validateTokenBySignature(accessToken);
        req.token = decodedToken;
        return next();
      } catch (err) {
        // Invalid access token signature
        return next(new Error('Invalid access token signature.'));
      }
    }

    return next(new Error('Invalid access token provided.'));
  }

  /**
   * Middleware to protect routes and ensure validation of an access token
   * via token introspection endpoint.
   *
   * @param req - Express request object.
   * @param res - Express response object.
   * @param next - Express next function.
   */
  static async ensureAccessTokenByIntrospection(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization;

    // Check if access token provided
    if (accessToken) {
      try {
        const decodedToken = await OAuthController.validateTokenByIntrospection(accessToken);
        req.token = decodedToken;
        return next();
      } catch (err) {
        return next(new Error('Invalid acces token provided.'));
      }
    }

    return next(new Error('Invalid access token provided.'));
  }
}
