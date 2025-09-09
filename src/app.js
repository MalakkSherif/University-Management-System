const express=require('express')
const courseRoute=require('./routes/Courses.route')
const connection=require('./config/db')
const path=require('node:path')

const app=express()


app.use(express.json())
app.use('/api/courses',courseRoute)
connection()

app.listen(3000,()=>
    console.log('Server is running on port 3000'))

