//디비 만들기 폴더
import { QueryInterface, Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

class options implements Options {
  dialect!: 'mysql';
  username!: string;
  password!: string;
}

const createDBOptions = new options();
createDBOptions.username = process.env.DB_USER || 'root';
createDBOptions.password = process.env.DB_PASSWORD || 'your password';
createDBOptions.dialect = 'mysql';

let db_name = process.env.DB_NAME || 'new DataBase';

const dbCreateSequelize = new Sequelize(createDBOptions);

console.log(`======Create DataBase : ${db_name}======`);

dbCreateSequelize
  .getQueryInterface()
  .createDatabase(db_name)
  .then(() => {
    console.log('✅db create success!');
  })
  .catch((e) => {
    console.log('❗️error in create db : ', e);
  });
