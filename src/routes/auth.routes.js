const express = require("express");
const { login, changePassword } = require("../controllers/user.controller.js");
const { authMiddleware, restrictTo } = require("../middlewares/auth.middleware.js");
const {loginValidation , changePasswordValidation, validate} = require('../middlewares/auth.validation.js')

const authRouter = express.Router();


// authRouter.post("/register", authMiddleware, restrictTo("admin"), register);

authRouter.post("/login", loginValidation, validate, login);
authRouter.post("/change-password", authMiddleware, changePasswordValidation, validate, changePassword);

module.exports = authRouter;
