// asyncWrapper

import { Request, Response, NextFunction } from 'express';

/**
 * Creates an async wrap for given function for letting the error handler catch errors.
 *
 * @param func - Function to wrap
 */
export function wrapAsync(func: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: Error) => next(err));
  };
}
