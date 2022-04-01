import { Sequelize } from 'sequelize';

import 'dotenv/config';

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_host,
  dialect: 'mysql',
  timezone: '-03:00'
});

export default connection;