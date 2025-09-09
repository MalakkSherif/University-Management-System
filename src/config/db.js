const mongoose=require('mongoose')
const connection=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/courseApp')
    .then(()=>console.log('DB Connected'))
    .catch((err)=>console.log('DB Connection Error:', err))
}
module.exports=connection