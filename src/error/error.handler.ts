// error.handler

import { Request, Response, NextFunction } from 'express';
import { BaseError } from './error.types';
import { JWTErrorParser } from './error.jwt';

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {

  // Checking if the error caused by server
  if (error instanceof BaseError) {
    return res.status(error.status).send({ message: error.message });
  }

  // Checking if the error caused by token verification
  if (JWTErrorParser.isJWTError(error)) {
    const errorDetails = JWTErrorParser.parse(error);
    return res.status(errorDetails.status).send({ message: errorDetails.message });
  }

  // Unexcepted error catched
  return res.status(500).send('Internal Server Error');

}
