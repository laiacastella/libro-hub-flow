import mysql from 'mysql2/promise';

// Creamos un "Pool" (una piscina de conexiones)
// Es mejor que una conexión única porque permite que varios 
const pool = mysql.createPool({
  host: 'sql7.freesqldatabase.com',
  user: 'sql7815900', 
  password: 'r8gZB1Zc9x', 
  database: 'sql7815900',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export { pool as db };