// oauth.controller

import { default as jwt } from 'jsonwebtoken';
import { OAuthUtils } from './oauth.utils';

class OAuthController {

  /**
   * Validates access token by its public key and audience and authorized clients
   *
   * @param accessToken - Access token to validate
   */
  static async validateTokenBySignature(accessToken: string) {
    return jwt.verify(accessToken, await OAuthUtils.getOAuthPublicKey());
  }

  static validateTokenByIntrospection(accessToken: string) {

  }
}
