import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet'; //악성 스크립트 보호
import HTTPS from 'https';
import fs from 'fs';
import hpp from 'hpp'
import indexRouter from './src/api/routes/index';
import createData from './src/database/data';
import {errorLogger, errorHandler} from './src/middlewares/errorhandler';
import { sequelize } from './src/database/models/sequlize';

dotenv.config();
const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3000);
app.use(helmet())
app.use(hpp())

// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,POST,PUT,DELETE,PATCH",
//     credentials: true,
//   })
//   );
  
const whitelist = [
  "http://localhost:3000",
  process.env.Client_1,
  undefined
]
const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (whitelist.indexOf(origin) !== -1) {
      // 만일 whitelist 배열에 origin인자가 있을 경우
      callback(null, true); // cors 허용
    } else {
      callback(new Error("Not Allowed Origin!")); // cors 비허용
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true,
};
  
app.use(cors(corsOptions)) //옵션 추가한 cors 미들웨어 추가
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
//에러발생시 logger로 넘어옴
app.use(errorLogger);
//에러발생시 Handler로 이동
app.use(errorHandler);

if (prod) {
  try {
    const options = {
      ca: fs.readFileSync(`${process.env.CA}`),
      key: fs.readFileSync(`${process.env.KEY}`),
      cert: fs.readFileSync(`${process.env.CERT}`),
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

