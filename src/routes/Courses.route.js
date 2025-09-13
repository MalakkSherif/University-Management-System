const express=require('express')
const courseController=require('../controllers/Courses.controller')
const{Validation}=require('../middlewares/Validation')
const {authMiddleware , restrictTo} =require('../middlewares/auth.middleware.js')

let router=express.Router()
router.route('/').get(courseController.getAllCourses)
                 .post(authMiddleware,restrictTo('Admin'),Validation,courseController.createCourse)

router.route('/:courseId')
                .get(courseController.getCourseById)
                .patch(authMiddleware,restrictTo('Admin'),Validation,courseController.updateCourse)
                .delete(authMiddleware,restrictTo('Admin'),courseController.deleteCourse)

router.route('/:courseId/:studentId').post(courseController.addStudentToCourse)

module.exports=router   