const express = require('express')
const studentController = require('../controllers/student.controller')
const {authMiddleware, restrictTo} = require('../middlewares/auth.middleware.js')
const router = express.Router()

router.route('/')
        .get(//authMiddleware,restrictTo('Admin'),
                studentController.getAllStudents)
        .post(//authMiddleware,restrictTo('Admin'),
        studentController.addStudent)

router.route('/:studentId')
        .patch(//authMiddleware,restrictTo('Admin'),
                studentController.updateStudent)
        .delete(//authMiddleware,restrictTo('Admin'),
                studentController.deleteStudent)

router.route('/searchStudent')
        .get(//authMiddleware,restrictTo('Admin'),
                studentController.searchStudent)



module.exports = router