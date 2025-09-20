const express = require('express')
const studentController = require('../controllers/student.controller')
const {authMiddleware, restrictTo} = require('../middlewares/auth.middleware.js')
const router = express.Router()

router.route('/')
        .get(//authMiddleware,restrictTo('Admin'),
                studentController.getAllStudents)
        .post(//authMiddleware,restrictTo('Admin'),
        studentController.addStudent)

router.route('/searchStudent')
        .get(//authMiddleware,restrictTo('Admin'),
                studentController.searchStudent)        

router.route('/:studentId')
        .get(//authMiddleware,restrictTo('Admin'),
                studentController.getStudentById)
        .patch(//authMiddleware,restrictTo('Admin'),
                studentController.updateStudent)
        .delete(//authMiddleware,restrictTo('Admin'),
                studentController.deleteStudent)



module.exports = router