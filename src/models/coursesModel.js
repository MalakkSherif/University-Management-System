const mongoose=require("mongoose")

 const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3
    },
    department:{
        type:String,
        required:true,
        enum:["C.S","Artificial Intelligence","Data Science","Information Systems IS"],
        minlength:3

    },
    instructor:{
       type:String,
       required:true,
       minlength:3
    },
 })
 const CourseModel=mongoose.model('Course',courseSchema)
 module.exports=CourseModel