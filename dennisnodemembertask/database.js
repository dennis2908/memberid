var pg = require('pg')
var config = {
  user: 'postgres',
  host: 'dbnodemembertask',
  database: 'postgres',
  password: 'postgres',
  port: 5432
 }
var pool = new pg.Pool(config);
module.exports = pool;