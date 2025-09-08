const mongoose = require('mongoose')
const validator = require('validator')

const studentSchema = mongoose.Schema({
    studentId:{
        type: String,
        required: true,
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
        required: true,
        validate: {
        validator: function (pass) {
        return validator.isStrongPassword(pass, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        });
        },
        message:
        "Password must be at least 8 chars and include upper, lower, number, and special char"},
    },
    // address:{
    //     type: String
    // },
    email:{
        type: String,
        validate:[validator.isEmail, 'Invalid email format'],
        unique: true,
    }
    
})

const studentModel = mongoose.model('Student',studentSchema)


module.exports = studentModel