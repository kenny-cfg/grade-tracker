const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
// TODO: .env
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'student',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool;