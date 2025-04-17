const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Quote = require('./Quote')(sequelize, Sequelize);

module.exports = db;
