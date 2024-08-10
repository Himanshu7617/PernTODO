const { password, host, database } = require('pg/lib/defaults');

const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    password : "database123",
    host : "localhost",
    port : 5432,
    database : "todo_web",
})

module.exports = pool;