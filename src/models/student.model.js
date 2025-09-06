const mongoose = require('mongoose')
const validator = require('validator')

const studentSchema = mongoose.Schema({
    studentId:{
        type: Number,
        required: true,
        min: [8,'Invalid id length, it should be 8 numbers'],
        unique: true,
    },
    password:{
        type: String,
        min: [3, 'Name can\'t be less than 3 characters']
    },
    name:{
        type: String,
        min: [3, 'Name can\'t be less than 3 characters']
    },
    phone:{
        type: Number,
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
        "Password must be at least 8 chars and include upper, lower, number, and special char",
    },
    },
    // address:{
    //     type: String
    // },
    email:{
        type: String,
        validator:[validator.isEmail, 'Invalid email format']
    }
    
})

const studentModel = mongoose.model('Student',studentSchema)


module.exports = studentModel