import mysql from "mysql2/promise";

const poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 6, 
    queueLimit: 0,
    dateStrings: true
};

export const db = global.globalDbPool || mysql.createPool(poolConfig);

if (process.env.NODE_ENV !== "production") {
    global.globalDbPool = db;
}