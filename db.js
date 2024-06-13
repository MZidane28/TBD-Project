const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "The Good Reading Bookstore Database",
    password: "Agar123Fku",
    port: 5432,
})

module.exports = pool;