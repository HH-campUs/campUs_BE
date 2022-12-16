import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../interface/Error';

export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  next(err); // errorLogger -> errorHandler
};

//에러 핸들러를 사용
export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //error.status가 있을때 ||없으면  400 반환
  const status = err.status || 400;
  res.status(status);
  //해당하는 error메세지를 띄워준다.
  res.json({ errorMessage: err.message });
};
