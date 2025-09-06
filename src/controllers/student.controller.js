const student = require('../models/student.model')


const getAllUsers = async (req,res)=>{
    try{
        let students = await student.find()
        res.status(200).json(students)
    }catch(err){
        res.status(500).json({message: 'Error from server'})
    }
}

module.exports = {
    getAllUsers,

}