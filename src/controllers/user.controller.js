const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Student = require("../models/student.model");
//const Teacher = require("../models/teacher.model");

/*
async function register(req, res) {
    try {
        const { email, password, role, ...detailedData } = req.body;

        if (req.user.role !== "admin") {
            return res.status(403).json({
                status: "ERROR",
                message: "Only admins can register new users"
            });
        }

        const userFromDB = await User.findOne({ email });
        if (userFromDB) {
            return res.status(400).json({
                status: "ERROR",
                message: "Email already in use"
            });
        }


        const user = await User.create({ email, password, role });

        if (role === "student") {
           await addStudent(user._id, detailedData);
        }

        if (role === "teacher") {
           await addTeacher(user._id, detailedData);
        }

        res.status(201).json({
            status: "OK",
            message:
                "User registered successfully. Please login to continue.",
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            redirect: "/login"
        });

    } catch (err) {
        res.status(500).json({
            status: "ERROR",
            message: err.message
        });
    }
}

*/


async function login(req,res) {
    try{

        const { email, password} = req.body;
        const user = await User.findOne({ email: email });

        if (!user || !(await user.comparePass(password))) {
            return res.status(400).json({ message: ' Invalid email or password' });
        }

        const token = jwt.sign({id : user._id, role : user.role} , process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRE})

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};


async function changePassword(req,res) {
    try{
        const {oldPass , newPass , confirm} = req.body;

        const user = await User.findById(req.user.id).select("+password"); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isMatch = await user.comparePass(oldPass);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        if (newPass !== confirm) {
            return res.status(400).json({ message: "Passwords must be the same" });
        }

        user.password = newPass;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    }

    catch(err){
        res.status(500).json({message : err.message});
    }
};

module.exports = {
    login,
    changePassword,
    //register
}
