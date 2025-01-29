import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
// const __dirname = dirname(__filename);
// const distPath = path.join(__dirname, '..', '..', 'dist');
// dotenv.config(path.join(__dirname, "../../dist"));
dotenv.config();



const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../../dist")));

app.use(cors({
    origin: process.env.DB_HOST,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type'],
}));

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

console.log(process.env.DB_USER, '<< db ')

// Log the connection details for debugging
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

// app.get('/', (req, res) => {
//     console.log('hit, home')
//     return res.json("From backend");
// });

// Products route
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        console.log(rows, '<< data');
        res.send(rows)
    } catch (err) {
        console.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(port, () => {
    console.log(`listening ${port}`);
});



