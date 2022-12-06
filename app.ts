import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet'; //악성 스크립트 보호
import indexRouter from './src/api/routes/index';
import createData from './src/database/data';
import {errorHandler,errorLogger} from './src/middlewares/errorhandler';
import { sequelize } from './src/database/models/sequlize';

dotenv.config();
const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3000);

if (prod) {
  app.use(helmet());
  app.use(
    cors({
      origin: '*',
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
//에러발생시 logger로 넘어옴
app.use(errorLogger);
//에러발생시 Handler로 이동
app.use(errorHandler);

app.listen(app.get('port'), async () => {
  console.log(`${app.get('port')}로 실행중`);
  // createData(); 
  await sequelize.authenticate()
    .then(async () => {
      console.log('DB 연결완료');
    })
    .catch((err) => {
      console.log(err);
      console.log('DB 연결실패');
    });
});