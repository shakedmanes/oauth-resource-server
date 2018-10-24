// oauth.controller

import axios from 'axios';
import { default as jwt } from 'jsonwebtoken';
import { OAuthUtils } from './oauth.utils';
import config from '../config';

class OAuthController {

  /**
   * Validates access token by its public key and audience and authorized clients
   *
   * @param accessToken - Access token to validate
   */
  static async validateTokenBySignature(accessToken: string) {
    return jwt.verify(accessToken, await OAuthUtils.getOAuthPublicKey());
  }

  /**
   * Validates access token by token introspection endpoint
   *
   * @param accessToken - Access token to validate
   */
  static async validateTokenByIntrospection(accessToken: string) {
    const response = await axios.post(
      config.OAUTH_TOKEN_INTROSPECTION_ROUTE,
      { token: accessToken },
      { headers: { Authorization: `Basic ${OAuthUtils.getClientCredentials()}` } },
    );

    // If request successfully
    if (response.status === 200) {
      return response.data.active;
    }
  }
}
