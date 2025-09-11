const express = require("express");
const { login, changePassword } = require("../controllers/user.controller.js");
const { authMiddleware, restrictTo } = require("../middlewares/auth.middleware.js");

const authRouter = express.Router();


// authRouter.post("/register", authMiddleware, restrictTo("admin"), register);

authRouter.post("/login", login);
authRouter.post("/change-password", authMiddleware, changePassword);

module.exports = authRouter;
