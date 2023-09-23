const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes.js');

const app = express();

app.use('/', authRoutes)

const port = 8000;

app.listen(port, () => console.log(`Server running at port ${port}`))