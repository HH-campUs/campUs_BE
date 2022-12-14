//디비 만들기 폴더
import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
//options 구현 옵션
class options implements Options {
  dialect!: 'mysql';
  username!: string;
  password!: string;
  host!:string
}
//데이터베이스 옵션
const createDBOptions = new options();
createDBOptions.username = process.env.DB_USER || 'root';
createDBOptions.password = process.env.DB_PASSWORD || 'your password';
createDBOptions.host = process.env.DB_HOST!;
createDBOptions.dialect = 'mysql';
//DB_NAME 없을시 new DateBase 생성
let db_name = process.env.DB_NAME || 'new DataBase';
//시퀄라이즈 생성 메서드
const dbCreateSequelize = new Sequelize(createDBOptions);

console.log(`======Create DataBase : ${db_name}======`);
//데이터베이스 생성 메서드
dbCreateSequelize
  .getQueryInterface() //인스턴스 반환
  .createDatabase(db_name)
  .then(() => {
    console.log('✅db create success!');
  })
  .catch((e) => {
    console.log('❗️error in create db : ', e);
  });
