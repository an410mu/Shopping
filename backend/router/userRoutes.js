import express from "express";
import { authUser, register, getUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleWare.js";
const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(register);
router.route("/profile").get(protect, getUser);

export default router;
