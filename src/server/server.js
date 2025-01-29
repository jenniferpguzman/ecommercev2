import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();


const app = express()

const PORT = 3000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type'],
}))

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER ,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

app.get('/',(req,res)=> {
    return res.json("From backend");
})





app.get('/products', (req,res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    })

})

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
})

app.listen(process.env.PORT || PORT ,()=> {
    console.log(`listening ${PORT}`);
})

// app.listen(8081,()=> {
//     console.log("listening");
// })