import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet'; //악성 스크립트 보호
// import { sequelize } from './models';
import { Request, Response, NextFunction } from 'express';
import { sequelize } from './src/database/models/sequlize';
import indexRouter from './src/api/routes/index';
import createData from './src/database/data';
import error from './src/middlewares/errorhandler';
import { Error } from 'sequelize';
dotenv.config();
const app = express();
const port = 3000;
// const prod: boolean = process.env.NODE_ENV === 'production';

// app.set('port', prod ? process.env.PORT : 3000);
// sequelize
//   .sync({ force: false }) //true일시 테이블 초기화
//   .then(() => {
//     console.log('데이터베이스 연결 성공');
//   })
//   .catch((err: Error) => {
//     console.error(err);
//   });

// if (prod) {
//   app.use(helmet());
//   app.use(
//     cors({
//       origin: '*',
//       credentials: true,
//     })
//   );
// } else {
//   app.use(
//     cors({
//       origin: true,
//       credentials: true,
//     })
//   );
// }

app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
//에러발생시 logger로 넘어옴
app.use(error.errorLogger);
//에러발생시 Handler로 이동
app.use(error.errorHandler);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('서버 에러 발생! 서버 콘솔을 확인하세요.');
});

app.listen(port, async () => {
  console.log(`${port}로 실행중`);
  // await createData; //날씨 저장
  // authenticate 메소드로 연결 확인
  await sequelize
    .authenticate()
    .then(async () => {
      console.log('DB 연결완료');
    })
    .catch((e) => {
      console.log(e);
    });
});
