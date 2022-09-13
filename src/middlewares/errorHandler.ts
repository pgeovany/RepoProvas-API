import { NextFunction, Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';

export interface CustomError {
  type: string;
  message: string;
}

function errorHandler(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorType = httpStatus[error.type];

  if (errorType) {
    return res.status(errorType).send(error.message);
  }

  res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}

export default errorHandler;
