"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorLogger = void 0;
const errorLogger = (err, req, res, next) => {
    console.error(err);
    next(err); // errorLogger -> errorHandler
};
exports.errorLogger = errorLogger;
//에러 핸들러를 사용
const errorHandler = (err, req, res, next) => {
    //error.status가 있을때 ||없으면  400 반환
    const status = err.status || 400;
    res.status(status);
    //해당하는 error메세지를 띄워준다.
    res.json({ errorMessage: err.message });
};
exports.errorHandler = errorHandler;
