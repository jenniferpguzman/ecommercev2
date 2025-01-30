import express from 'express';
//library to connect to mysql db using promises, essentially makes it easier to
//handle async operations
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


//calls my environment variables
dotenv.config();


//setting up express application and port server will run
const app = express();
const port = process.env.PORT || 3000;


//telling server to serve static files in dist directory
//where built react will be at
app.use(express.static(path.join(__dirname, "../../dist")));

app.use(cors({
    //middleware allowing requests
    origin: process.env.DB_HOST,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type'],
}));


//creating the connection to my db using credentials in .env
//await keyword because this is a asyn operation
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});


// Log the connection details for debugging
console.log(process.env.DB_USER, '<< db ')
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

//route listening for a GET request at 'api/products'
app.get('/api/products', async (req, res) => {
    //when requesting through this route it will query the db for the products
    //and send back data as a response
    try {
        const [rows] = await db.query("SELECT * FROM products");
        console.log(rows, '<< data');
        res.send(rows)
    } catch (err) {
        //if there is an error it will log the error and throw back a 500 status code
        console.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


//
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


//telling server what port to start on 
app.listen(port, () => {
    console.log(`listening ${port}`);
});