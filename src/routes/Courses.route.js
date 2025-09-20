const express=require('express')
const courseController=require('../controllers/Courses.controller')
const{Validation}=require('../middlewares/Validation')
const {authMiddleware , restrictTo} =require('../middlewares/auth.middleware.js')

let router=express.Router()
router.route('/').get(courseController.getAllCourses)
                 .post(restrictTo('admin'),Validation,courseController.createCourse)

router.route('/:courseId')
                .get(courseController.getCourseById)
                .patch(restrictTo('admin'),Validation,courseController.updateCourse)
                .delete(restrictTo('admin'),courseController.deleteCourse)


module.exports=router   