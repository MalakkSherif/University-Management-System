// controllers/enrollment.controller.js
const Enrollment = require('../models/Enrollment');


exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('student', 'name email') 
      .populate('course', 'title description'); 

    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.enrollmentId)
      .populate('student', 'name email')
      .populate('course', 'title description');

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.addEnrollment = async (req, res) => {
  try {
    const { student, course } = req.body;

    
    const exists = await Enrollment.findOne({ student, course });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Student already enrolled in this course' });
    }

    const newEnrollment = await Enrollment.create({ student, course });
    res.status(201).json({ success: true, data: newEnrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.enrollmentId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.enrollmentId);

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    res.status(200).json({ success: true, message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
