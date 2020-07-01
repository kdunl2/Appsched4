const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "arana320",
    host: "localhost",
    port: 5432,
    database: "pernappointment"
});

module.exports = pool;