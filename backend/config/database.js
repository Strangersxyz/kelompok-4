import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', // Sesuaikan dengan username anda
    pass: process.env.DB_PASS || '', // sesuaikan dengan password kamu jika pakai
    database: process.env.DB_NAME || 'db_speeksy',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;