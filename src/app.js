const express = require('express')
const studentRouter = require('./routes/student.route.js')
const connection = require('./config/dbConnection.js')


const app = express();

app.use(express.json());

app.use('/api/students',studentRouter)

connection()

app.listen(8080, ()=>{
    console.log('Listening on port 8080...')
})