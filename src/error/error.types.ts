// error

export class BaseError extends Error {

  status: number;

  constructor(status: number, message: string) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
  }
}

export class InvalidParameter extends BaseError {

  constructor(message?: string) {
    super(400, message || 'Invalid Parameter Provided');
  }
}

export class Unauthorized extends BaseError {

  constructor(message?: string) {
    super(401, message || 'Unauthorized');
  }
}

export class NotFound extends BaseError {

  constructor(message?: string) {
    super(404, message || 'Not Found');
  }
}
