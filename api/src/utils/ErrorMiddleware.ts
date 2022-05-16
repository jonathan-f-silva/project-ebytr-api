import { NextFunction, Request, Response } from 'express';
import ErrorMessage from './ErrorMessage';
import ExpressError from './ExpressError';

const ErrorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ExpressError) {
    const { code, message } = err;
    res.status(code).send({ error: message }).end();
  } else if (err) {
    res.status(500).send({ message: ErrorMessage.SERVER_ERROR }).end();
  } else {
    next(err);
  }
};

export default ErrorMiddleware;
