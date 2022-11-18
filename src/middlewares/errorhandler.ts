import { Request, Response, NextFunction } from 'express';
import { SystemError } from '../interface/Error';

const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  next(err); // errorLogger -> errorHandler
};

//에러 핸들러를 사용
const errorHandler = (
  err: SystemError,
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
//밖으로 내보내준다

export default { errorHandler, errorLogger };
