import dotenv from 'dotenv';
dotenv.config();
type Config = {
  username: string;
  password: string;
  database: string;
  host: string;
  [key: string]: string | boolean; //객체에 키와 벨류가 있으면키도 문자 밸류도 문자
};
interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config
}
const config :IConfigGroup = {
  development: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: 'mysql1',
  },
  test: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: 'mysql',
  },
};

export default config;
