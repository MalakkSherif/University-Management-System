const express = require('express')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const studentRouter = require('./routes/student.route.js')
const connection = require('./config/dbConnection.js')
const courseRoute=require('./routes/Courses.route')
const enrollmentRoutes = require('./routes/enrollment.route');
const authRouter = require('./routes/auth.routes.js');
const path=require('node:path')
const cors = require('cors');


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/students',studentRouter)
app.use('/api/courses',courseRoute)
app.use('/api/enrollments', enrollmentRoutes);

connection()

const port = process.env.PORT || 8080;

app.listen(port , ()=>{
    console.log(`Listening on port ${port}...`)
})