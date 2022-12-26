import express from "express";
import { authUser, register } from "../controller/userController.js";
const router = express.Router();

router.post("/login", authUser);
router.post("/register", register);

export default router;
