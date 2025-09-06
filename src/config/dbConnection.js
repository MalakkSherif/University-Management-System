const mongoose = require('mongoose')

const connection = ()=>{
    mongoose.connect('mongodb://localhost:27017/University-Management-System').then(()=>{
        console.log('Connected to db')
    })
}

module.exports = connection