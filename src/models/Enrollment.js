const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student:{ type: mongoose.Schema.Types.ObjectId, ref:"User", required:true },
  course:{ type: mongoose.Schema.Types.ObjectId, ref:"Course", required:true },
  status:{ type:String, enum:["ENROLLED","WAITLISTED","DROPPED"], default:"ENROLLED" },
  grade:{ type:String }
},{timestamps:true}).index({ student:1, course:1 }, { unique:true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
