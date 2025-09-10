const express = require('express');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth.routes.js');

dotenv.config();
const app = express();


app.use(express.json());



app.use('/api/ideas', ideaRouter);


export default app;