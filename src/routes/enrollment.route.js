const express = require('express');
const enrollmentController = require('../controllers/enrollment.controller');

let router = express.Router();

router.route('/')
    .get(enrollmentController.getAllEnrollments) 
    .post(enrollmentController.addEnrollment);

router.route('/:enrollmentId')
    .get(enrollmentController.getEnrollmentById)
    .patch(enrollmentController.updateEnrollment)
    .delete(enrollmentController.deleteEnrollment);

module.exports = router;
