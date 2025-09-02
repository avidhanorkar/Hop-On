import { Router } from "express";
import authController  from "../controller/authController.js";
const router = Router();

router.post("/auth/register", authController.registerUser);
router.post("/auth/login", authController.loginUser);





export default router;