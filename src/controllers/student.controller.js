const student = require('../models/student.model')
const bcrypt = require('bcryptjs')


const getAllStudents = async (req,res)=>{
    try{
        let students = await student.find()
        res.status(200).json(students)
    }catch(err){
        res.status(500).json({message: 'Error from server'})
    }
}

const addStudent = async (req,res)=>{
    try{
        let {studentId,name,phone,password,email} = req.body

        if(await student.findOne({studentId:studentId})){
            return res.status(400).json({Error: 'This student id already exists'})
        }
        if(await student.findOne({email:email})){
            return res.status(400).json({Error: 'This email already exists'})
        }

        let hashedPassword = bcrypt.hashSync(password,10)

        let newStudent = new student({
            studentId,
            name,
            phone,
            password: hashedPassword,
            email
        })
        await newStudent.save()
        res.status(201).json({message: 'Student added successfully'})

    }catch (err) {
        if(err.name === 'ValidationError'){
            let errors = {};
            for(let field in err.errors){
                errors[field] = err.errors[field].message
            }
            return res.status(400).json({errors})
        }
        res.status(500).json({message: 'Error from server'})
    }
}


module.exports = {
    getAllStudents,
    addStudent

}