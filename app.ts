import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet'; //악성 스크립트 보호
import { sequelize } from './src/database/models/sequlize';
import indexRouter from './src/api/routes/index';
import createData from './src/database/data';
import error from './src/middlewares/errorhandler';

dotenv.config();
const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3000);

app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
//에러발생시 logger로 넘어옴
app.use(error.errorLogger);
//에러발생시 Handler로 이동
app.use(error.errorHandler);

app.listen(app.get('port'), async () => {
  console.log(`${app.get('port')}로 실행중`);
  createData; //날씨 저장
  sequelize
    .authenticate()
    .then(async () => {
      console.log('DB 연결완료');
    })
    .catch((err) => {
      console.log(err);
      console.log('DB 연결실패');
    });
});
