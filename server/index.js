const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes.js');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Database not connected', err))


app.use(express.json())//this passes the data
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));

app.use('/', authRoutes)

const port = 8000;

app.listen(port, () => console.log(`Server running at port ${port}`))