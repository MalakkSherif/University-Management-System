const { validationResult } = require('express-validator');
const Course=require('../models/coursesModel.js')

const createCourse=async(req,res)=>{
    try {
        let errors=validationResult(req)
        console.log(errors)
        if (!errors.isEmpty())return res.status(400).json({message:'Bad Request',error:errors.array()})
        const{title,department,staffId}=req.body
        let newCourse=await Course.create({title,department,staffId})

        res.status(201).json({message:'Created successfully'})

        
    } catch (err) {
        res.status(500).json({message:'Error from Server',error:err})
    }
}

const updateCourse=async(req,res)=>{
    try {
        let id=req.params.courseId;
        //findOneAndUpdate({_id:id},{$set:{...req.body}})
        let updatedCourse=await Course.findOneAndUpdate({_id:id},{$set:{...req.body}},{new:true})
        if (!updatedCourse)return res.status(404).json({error:'Course not found'})
        res.status(200).json({message:'Updated successfully'})
        
    } catch (err) {
        res.status(500).json({message:'Error from Server',error:err})
    }

}

const deleteCourse=async(req,res)=>{
    try {
        let id=req.params.courseId;
        let deletedCourse=await Course.findByIdAndDelete(id)
        if (!deletedCourse)return res.status(404).json({error:'Course not found'})
        res.status(200).json({message:'Deleted successfully'})
        
    } catch (err) {
        res.status(500).json({message:'Error from Server',error:err})
    }

}

const getAllCourses=async(req,res)=>{
    try {
        let allCourses=await Course.find({},{'__v':false})
        res.status(200).json(allCourses)
    } catch (err) {
        res.status(500).json({message:'Error from Server',error:err})
    }
}
const getCourseById=async(req,res)=>{
    try {
        let id=req.params.courseId;
        let course=await Course.findById(id,{'__v':false})
        if (!course)return res.status(404).json({error:'Course not found'})
        res.status(200).json(course)
    } catch (err) {
        res.status(500).json({message:'Error from Server',error:err})
    }

}

module.exports={
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseById,
}
