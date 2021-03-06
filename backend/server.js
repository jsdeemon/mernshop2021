import path from 'path';
// const express = require('express');
import express from 'express'; 
import dotenv from 'dotenv';
//middleware not found and error handler 
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// colors
import colors from 'colors';
import morgan from 'morgan'
// connecion to db
import connectDB from './config/db.js';
// routes
import productRoutes from './routes/productRoutes.js'; 
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// import products from './data/products.js';


dotenv.config()

// connecting to database
connectDB();

const app = express(); 

// using morgan logger in development mode 
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// adding body parser 
app.use(express.json())



// use Product routes 
app.use("/api/products", productRoutes)

// use User routes 
app.use("/api/users", userRoutes)

// use Order routes
app.use("/api/orders", orderRoutes)

// use Upload routes 
app.use('/api/upload', uploadRoutes)

// PayPal config 
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


// making upload folder static 
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}



// not found
app.use(notFound)

// middleware for error handling 
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow.bold ));