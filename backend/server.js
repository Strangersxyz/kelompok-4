import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { errorHandler } from './middlewares/errorHandler.js';

// Load .env files
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
let db;
const connectToDB = async () => {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
        console.log('✅ Connected to MySQL')
    } catch(err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    }
};

// Start Server
app.listen(PORT, async () => {
    await connectToDB();
    console.log(`🚀 Server running at http://localhost:${PORT}`);
})

// Set Routes Here...

app.use(errorHandler);