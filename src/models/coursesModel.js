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
        enum:["Computer Science","Information systems","Artificial Intelligence"],
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