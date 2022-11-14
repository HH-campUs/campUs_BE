import dotenv from 'dotenv';
dotenv.config();
type Config = {
  username: string;
  password: string;
  database: string;
  host: string;
  [key: string]: string; //객체에 키와 벨류가 있으면키도 문자 밸류도 문자
};
interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: IConfigGroup = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD!,
    database: 'campus',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD!,
    database: 'campus',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD!,
    database: 'campus',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

export default config;
