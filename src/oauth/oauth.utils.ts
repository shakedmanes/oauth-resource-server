// oauth.utils

import { writeFileSync, readFileSync, existsSync } from 'fs';
import axios from 'axios';
import { default as forge } from 'node-forge';
import config from '../config';

export enum PublicKeyType { 'JWKS', 'PEM' }

export class OAuthUtils {

  static publicKeyContents: string | any =
  (existsSync(config.oauthPublicKeyPath)) ?
  readFileSync(config.oauthPublicKeyPath).toString() : null;

  static certificateContents: string | any =
  (existsSync(config.oauthCertificatePath)) ?
  readFileSync(config.oauthCertificatePath).toString() : null;

  /**
   * Getting the client credentials for using the authorization REST API
   */
  static getClientCredentials() {
    return (Buffer.from(`${config.clientCred.id}:${config.clientCred.secret}`).toString('base64'));
  }

  /**
   * Getting the public key from local files or downloading it from the authorization server
   */
  static async getOAuthPublicKey() {
    if (!existsSync(config.oauthPublicKeyPath)) {
      await OAuthUtils.downloadPublicKey();
      // TODO: Adding validation of the public key by the pem certificate
      return OAuthUtils.publicKeyContents;
    }

    return OAuthUtils.publicKeyContents;
  }

  /**
   * Getting the certificate from local files or donwloading it from the authorization server
   */
  static async getOAuthCertificate() {
    if (!existsSync(config.oauthCertificatePath)) {
      await OAuthUtils.downloadCertificate();
      return OAuthUtils.certificateContents;
    }

    return OAuthUtils.certificateContents;
  }

  /**
   * Downloads public key in pem format
   */
  private static async downloadPublicKey() {
    await OAuthUtils.downloadSSLObject(
      config.PUBLIC_KEY_ROUTE,
      config.oauthPublicKeyPath,
      OAuthUtils.setPublicKey,
    );
  }

  /**
   * Downloads public key in JWKS format
   */
  private static async downloadJWKS() {
    await OAuthUtils.downloadSSLObject(
      config.JWKS_ROUTE,
      config.oauthJWKSPath,
      OAuthUtils.validatePublicKey.bind({}, PublicKeyType.JWKS),
    );
  }

  /**
   * Downloads SSL certificate in pem format
   */
  private static async downloadCertificate() {
    await OAuthUtils.downloadSSLObject(
      config.CERTIFICATE_ROUTE,
      config.oauthCertificatePath,
      OAuthUtils.setCertificate,
    );
  }

  /**
   * Downloads SSL object (certificate/public key) from specific route and save it in path
   *
   * @param route - Route for downloading the SSL Object
   * @param path - Path for saving the SSL Object
   * @param contentHandler - function to run with the input of the SSL object value
   */
  private static async downloadSSLObject(route: string,
                                         path: string,
                                         contentHandler?: (value: any) => void) {
    // Getting the SSL object from authorization server
    const response = await axios.get(route);

    // Saving the SSL object locally for later use
    if (response.status === 200) {
      writeFileSync(path, response.data);
      if (contentHandler) contentHandler(response.data);
    }
  }

  /**
   * Setting the public key for quick access
   *
   * @param publicKey - Public key to set
   */
  private static setPublicKey(publicKey: string) {
    OAuthUtils.publicKeyContents = publicKey;
  }

  /**
   * Setting the certificate for quick access
   *
   * @param certificate - Certificate to set
   */
  private static setCertificate(certificate: string) {
    OAuthUtils.certificateContents = certificate;
  }

  /**
   * Validates the public key with the current certificate
   *
   * @param publicKey - Public key value to validate
   * @returns Boolean value indicates if the public key is belong to the current certificate
   */
  private static async validatePublicKey(keyType: PublicKeyType = PublicKeyType['PEM'],
                                         publicKey: string) {

    // Gets the certificate for validating the public key
    const certificate = await OAuthUtils.getOAuthCertificate();

    // Exporting the public key from the certificate
    const forgeCertificate = forge.pki.certificateFromPem(certificate);
    const publicKeyPem = forge.pki.publicKeyFromPem(forgeCertificate.publicKey);

    // Checking if the public keys are equals
    if (keyType === PublicKeyType.PEM) {
      return publicKeyPem === publicKey;
    }

    // TODO: Checking when key type is JWKS
    return true;
  }
}
