import mysql from 'mysql2/promise';

// Creamos un "Pool" (una piscina de conexiones)
// Es mejor que una conexión única porque permite que varios 
// de tus 4 compañeros hagan cosas a la vez sin bloquearse.
const pool = mysql.createPool({
  host: 'sql7.freesqldatabase.com',
  user: 'sql7815900', // El que tienes en el .env
  password: 'r8gZB1Zc9x', // El que tienes en el .env
  database: 'sql7815900', // El que tienes en el .env
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;