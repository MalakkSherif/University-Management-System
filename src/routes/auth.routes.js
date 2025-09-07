const express = require("express");
const { login, changePassword } = require("../controllers/auth.controller");
const { authMiddleware, restrictTo } = require("../middleware/auth.middleware");

const authRouter = express.Router();


// authRouter.post("/register", authMiddleware, restrictTo("admin"), register);

authRouter.post("/login", login);
authRouter.post("/change-password", authMiddleware, changePassword);

module.exports = authRouter;
