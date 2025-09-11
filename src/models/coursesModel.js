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
        minlength:3

    },
    staffId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Staff'
    },
    students:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Enrollment'
    }]

 })
 const CourseModel=mongoose.model('Course',courseSchema)
 module.exports=CourseModel