const express=require('express')
const courseController=require('../controllers/Courses.controller')
const{Validation}=require('../middlewares/Validation')
// const VerifyToken=require('../middlewares/VerifyToken')
// const{restrictTo}=require('../middlewares/restrictTo')

let router=express.Router()
router.route('/').get(courseController.getAllCourses)
                 .post(Validation,courseController.createCourse)

router.route('/:courseId')
                .get(courseController.getCourseById)
                .patch(Validation,courseController.updateCourse)
                .delete(courseController.deleteCourse)
/
router.route('/:courseId/:studentId').post(courseController.addStudentToCourse)

module.exports=router   