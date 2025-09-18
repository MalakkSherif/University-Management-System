const student = require('../models/student.model')
const bcrypt = require('bcryptjs')
const validator = require('validator')


const getAllStudents = async (req,res)=>{
    try{
        let students = await student.find({},{'_id': false,'__v': false, 'password': false})
        res.status(200).json(students)
    }catch(err){
        res.status(500).json({message: 'Error from server', err})
    }
}

const addStudent = async (req,res)=>{
    try{
        //removed password from here
        let {studentId,name,phone,email,year,department} = req.body

        if(await student.findOne({studentId:studentId})){
            return res.status(400).json({Error: 'This student id already exists'})
        }
        if(await student.findOne({email:email})){
            return res.status(400).json({Error: 'This email already exists'})
        }
        // if(!validator.isStrongPassword(password,{
        //     minLength: 8,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        //     minSymbols: 1,
        // })){
        //     return res.status(400).json({Error: 'Password must be at least 8 chars and include upper, lower, number, and special characters'})
        // }

        //let hashedPassword = bcrypt.hashSync(password,10)

        let newStudent = new student({
            studentId,
            name,
            phone,
            // password: hashedPassword,
            email,
            year,
            department
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
        res.status(500).json({message: 'Error from server', err})
    }
}

const searchStudent = async (req,res)=>{
    try{
        let {studentId,name} = req.query
        let filter ={}
        if(studentId){
            filter.studentId = {$regex: '^'+studentId}
        }
        if(name){
            filter.name = {$regex: '^'+name, $options: 'i'}
        }
        const students = await student.find(filter,{'_id': false,'__v': false, 'password': false})

        if(students.length === 0){
            return res.status(404).json({message: 'No students found'})
        }

        res.status(200).json(students)

    }catch(err){
        res.status(500).json({message: 'Error from server', err})
    }
}

const updateStudent = async (req,res)=>{
    try{
        let id = req.params.studentId

        let existingStudent = await student.findOne({studentId: id})
        if(!existingStudent){
            return res.status(404).json({message: 'Student not found'})
        }

        let students = await student.find({studentId: {$ne: id}})
        if(students.some(s => s.email === req.body.email)){
            return res.status(400).json({message: 'This email already exists'})
        }

        let updatedStudent = await student.findOneAndUpdate({studentId: id},{$set: {...req.body}})
        
        res.status(200).json({message: 'Student updated successfully'})

    }catch(err){
        res.status(500).json({message: 'Error from server', err})
    }
}

const deleteStudent = async (req,res)=>{
    try{
        let id = req.params.studentId

        let existingStudent = await student.findOne({studentId: id})
        if(!existingStudent){
            return res.status(404).json({message: 'Student not found'})
        }

        let deletedStudnet = await student.findOneAndDelete({studentId: id})

        res.status(200).json({message: 'Student deleted successfully'})

    }catch(err){
        res.status(500).json({message: 'Error from server', err})
    }
}


module.exports = {
    getAllStudents,
    addStudent,
    searchStudent,
    updateStudent,
    deleteStudent,

}