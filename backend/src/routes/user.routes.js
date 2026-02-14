import { Router } from "express";
import { loginUser, registerUser, logoutUser, resetPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()
router.route("/register").post(registerUser)

router.route("/login").post(loginUser)
// Secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/reset-password").post(resetPassword)

export default router