import { Sequelize } from 'sequelize';
import config from '../config/config';
const env = (process.env.NODE_ENV as 'production' | 'test' | 'development')

const { username, password, database, host, dialect } = config[env];

const sequelize = new Sequelize(database, username, password,{host: host ,dialect: 'mysql'});

export { sequelize };
export default sequelize;
