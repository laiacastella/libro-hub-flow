import mysql from "mysql2/promise";

const pool = mysql.createPool("mysql://root:QVFgabtNsCOwIxvIkhkzKyzwcbflNdVz@gondola.proxy.rlwy.net:48378/railway");

export default pool;
