// oauth.controller

import axios from 'axios';
import { default as jwt } from 'jsonwebtoken';
import { OAuthUtils } from './oauth.utils';
import config from '../config';
import { resources } from '../resources/resources.mock';
import { Unauthorized } from '../error/error.types';

export class OAuthController {

  /**
   * Validates access token by its public key and audience and authorized clients
   *
   * @param accessToken - Access token to validate
   */
  static async validateTokenBySignature(accessToken: string) {
    const decodedToken = <any>(jwt.verify(accessToken, await OAuthUtils.getOAuthPublicKey()));

    // Checking if token audience is ours url and subject is in resources
    if (decodedToken.aud === config.AUDIENCE_URL && decodedToken.sub in resources) {
      return decodedToken;
    }

    throw new Unauthorized('Unauthorized access token provided.');
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

    // Checking if token audience is ours url and subject is in resources
    if (response.status === 200) {
      if (response.data.active &&
          response.data.aud === config.AUDIENCE_URL &&
          response.data.sub in resources) {
        return response.data;
      }

      throw new Unauthorized('Unauthorized access token provided.');
    }
  }
}
