import { Router } from "express";
import { loginUser, registerUser, logoutUser, resetPassword, uploadAvatar, deleteAvatar, updateAccountDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()
router.route("/register").post(registerUser)

router.route("/login").post(loginUser)
// Secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/reset-password").post(resetPassword)
router.route("/avatar").post(verifyJWT, upload.single("avatar"), uploadAvatar).delete(verifyJWT, deleteAvatar)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

export default router