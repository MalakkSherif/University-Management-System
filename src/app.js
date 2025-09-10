const express = require('express');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth.routes.js');
const connect = require('./config/dbConnection.js');


dotenv.config();

const app = express();


app.use(express.json());

app.use('/api/auth', authRouter);



const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`DB connected & Server running on port ${port}`);
    });
  }
  
  catch (err) {
    console.log('failed to connect', err);
    process.exit(1);
  }
};

start();
