// error.jwt

import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

export class JWTErrorParser {

  /**
   * Checking if given error is JWT error.
   *
   * @param error - error to check
   */
  static isJWTError(error: any) {
    return (error instanceof JsonWebTokenError ||
            error instanceof TokenExpiredError ||
            error instanceof NotBeforeError);
  }

  /**
   * Parsing a JWT error into corresponding error details for error handler.
   *
   * @param error - JWT error to parse
   * @returns Object with status and message for the error handler.
   */
  static parse(error: any) {

    switch (error.constructor) {

      // Error occured in JWT format (signature validation, etc.)
      case JsonWebTokenError:
        return { status: 400, message: 'Invalid JWT Provided.' };

      // Token exp claim already expired
      case TokenExpiredError:
        return { status: 400, message: 'Token expired.' };

      // Token nbf claim later than current time (token used before usage time)
      case NotBeforeError:
        return { status: 400, message: 'Token not active yet.' };

      default:
        return { status: 500, message: 'Internal Server Error' };
    }
  }
}
