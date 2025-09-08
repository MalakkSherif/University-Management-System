const mongoose = require('mongoose')
const validator = require('validator')

const studentSchema = mongoose.Schema({
    studentId:{
        type: String,
        required: [true, 'Student Id is required'],
        validate:{
            validator: (v)=> /^\d{8}$/.test(v),
            message: 'Student id must be 8 digits'
        },
        unique: true,
    },
    name:{
        type: String,
        minLength: [3, 'Name can\'t be less than 3 characters']
    },
    phone:{
        type: String,
        validate: {
            validator: (v)=> /^\d{11}$/.test(v),
            message: 'Phone number must be 11 digits'
        },
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
    // address:{
    //     type: String
    // },
    email:{
        type: String,
        required: [true, 'Email is required'],
        validate:[validator.isEmail, 'Invalid email format'],
        unique: true,
    }
    
})

const studentModel = mongoose.model('Student',studentSchema)


module.exports = studentModel