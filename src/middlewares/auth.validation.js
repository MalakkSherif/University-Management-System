const { body, validationResult } = require("express-validator");

const loginValidation = [
  body("email")
    .isEmail().withMessage("Please enter a valid email"),
  body("password")
    .notEmpty().withMessage("Password is required")
];

const changePasswordValidation = [
  body("oldPass")
    .notEmpty().withMessage("Old password is required"),
  body("newPass")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.newPass) {
        throw new Error("Passwords must be the same");
      }
      return true;
    })
];



const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "ERROR",
      errors: errors.array().map(err => err.msg)
    });
  }
  next();
};



module.exports ={
    loginValidation,
    changePasswordValidation,
    validate
}