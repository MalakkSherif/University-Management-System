const express=require('express')
const courseController=require('../controllers/Courses.controller')
const{Validation}=require('../middlewares/Validation')
const VerifyToken=require('../middlewares/VerifyToken')
const{restrictTo}=require('../middlewares/restrictTo')

let router=express.Router()
router.route('/').get(courseController.getAllCourses)
                 .post(VerifyToken,restrictTo('Admin','staff'),Validation,courseController.createCourse)

router.route('/:courseId').get(courseController.getCourseById)
                .patch(VerifyToken,restrictTo('Admin','staff'),Validation,courseController.updateCourse)
                .delete(VerifyToken,restrictTo('Admin','staff'),courseController.deleteCourse)
/
router.route('/:courseId/students').post(courseController.addStudentToCourse)

module.exports=router   