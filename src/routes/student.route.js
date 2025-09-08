const express = require('express')
const studentController = require('../controllers/student.controller')

const router = express.Router()

router.route('/')
        .get(studentController.getAllStudents)
        .post(studentController.addStudent)


module.exports = router