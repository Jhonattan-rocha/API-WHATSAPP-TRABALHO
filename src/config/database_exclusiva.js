require('dotenv').config(); 

module.exports = [
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'mssql',
  }
];
