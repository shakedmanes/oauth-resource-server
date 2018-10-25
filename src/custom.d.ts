// custom.d

declare module Express {
  export interface Request {
    token?: any;
  }
}