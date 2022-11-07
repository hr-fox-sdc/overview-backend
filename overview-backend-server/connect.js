const Pool = require('pg').Pool;
require('dotenv').config();

const config = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432
};

const connectionPool = new Pool(config);

module.exports = connectionPool;