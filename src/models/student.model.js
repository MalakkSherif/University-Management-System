const e = require('express')
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
    email:{
        type: String,
        //required: [true, 'Email is required'],
        validate:[validator.isEmail, 'Invalid email format'],
        unique: true,
    },
    phone:{
        type: String,
        validate: {
            validator: (v)=> /^\d{11}$/.test(v),
            message: 'Phone number must be 11 digits'
        },
    },
    // password:{
    //     type: String,
    //     // required: [true, 'Password is required'],
    // },
    // address:{
    //     type: String
    // },
    year:{
        type: Number,
        required: [true, 'Year is required'],
        enum: {
            values:[1,2,3,4],
            message: '{VALUE} is not a valid year. Allowed years are 1, 2, 3, 4.'}
    },
    department:{
        type: String,
        required: [true, 'Department is required']
    }
    
})

const studentModel = mongoose.model('Student',studentSchema)


module.exports = studentModel