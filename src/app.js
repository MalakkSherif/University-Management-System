const express = require('express')
const studentRouter = require('./routes/student.route.js')
const connection = require('./config/dbConnection.js')
const courseRoute=require('./routes/Courses.route')
const enrollmentRoutes = require('./routes/enrollment.route');
const path=require('node:path')


const app = express();

app.use(express.json());

app.use('/api/students',studentRouter)
app.use('/api/courses',courseRoute)
app.use('/api/enrollments', enrollmentRoutes);

connection()

app.listen(8080, ()=>{
    console.log('Listening on port 8080...')
})









