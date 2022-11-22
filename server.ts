import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet'; //악성 스크립트 보호
import HTTPS from 'https';
import fs from 'fs';
import { sequelize } from './src/database/models/sequlize';
import indexRouter from './src/api/routes/index';
import createData from './src/database/data';
import error from './src/middlewares/errorhandler';

dotenv.config();
const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';

const Domain = process.env.DOMAIN

app.set('port', prod ? process.env.PORT : 3000);

app.use(helmet())
app.use(
  cors({
    // origin: ['https://fantastic-narwhal-f05420.netlify.app/','http://localhost:3000/','https://campus99.shop/'],
    origin: '*',
    // methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
  );
 

app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
//에러발생시 logger로 넘어옴
app.use(error.errorLogger);
//에러발생시 Handler로 이동
app.use(error.errorHandler);

if (prod) {
  try {
    const options = {
      ca: fs.readFileSync(`/etc/letsencrypt/live/${Domain}/fullchain.pem`),
      key: fs.readFileSync(`/etc/letsencrypt/live/${Domain}/privkey.pem`),
      cert: fs.readFileSync(`/etc/letsencrypt/live/${Domain}/cert.pem`),
    };
    HTTPS.createServer(options, app).listen(app.get('port'), async () => {
      console.log('https 서버가 실행되었습니다. 포트 :: ' + app.get('port'));
      createData();
      await sequelize
        .authenticate()
        .then(async () => {
          console.log('DB 연결완료');
        })
        .catch((err) => {
          console.log(err);
          console.log('DB 연결실패');
        });
    });
  } catch (err) {
    console.log('HTTPS 서버가 실행되지 않습니다.');
    console.log(err);
  }
} else {
  app.listen(app.get('port'), async () => {
    console.log('HTTPS 서버가 실행되지 않습니다.');
    console.log(`${app.get('port')}로 실행중`);
    createData();
    await sequelize
      .authenticate()
      .then(async () => {
        console.log('DB 연결완료');
      })
      .catch((err) => {
        console.log(err);
        console.log('DB 연결실패');
      });
  });
}

