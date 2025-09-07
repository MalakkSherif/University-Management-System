const jwt = require('jsonwebtoken');

const User = require('../models/user.model');


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
