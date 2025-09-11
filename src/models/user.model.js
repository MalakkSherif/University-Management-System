
const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true , 'email is required'],
        unique: true
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minLength: [6 , 'password must be at least 6 characters']
    },
    role: { 
        type: String, 
        enum: ['admin', 'teacher', 'student'], 
        required: [true, 'role is required'] 
    }
});

userSchema.pre('save' , async function (next){
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePass = async function  (pass) {
    return await bcrypt.compare(pass , this.password);
};


module.exports = mongoose.model('User' , userSchema);
