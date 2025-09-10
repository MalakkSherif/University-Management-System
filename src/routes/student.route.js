const express = require('express')
const studentController = require('../controllers/student.controller')

const router = express.Router()

router.route('/')
        .get(studentController.getAllStudents)
        .post(studentController.addStudent)

router.route('/:studentId')
        .patch(studentController.updateStudent)
        .delete(studentController.deleteStudent)

router.route('/searchStudent')
        .get(studentController.searchStudent)



module.exports = router