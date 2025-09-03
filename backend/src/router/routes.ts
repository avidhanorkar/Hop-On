import { Router } from "express";
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import ticketController from "../controller/ticketController.js";

const router = Router();

router.post("/auth/register", authController.registerUser);
router.post("/auth/verify-email", authController.verifyEmail);
router.post("/auth/login", authController.loginUser);
router.post("/auth/resetPassReq", authController.requestForChangePass);
router.post("/auth/passReset/:token", authController.resetPassword);

router.get("/user/getProfile", authMiddleware.isLoggedIn, userController.getUserProfile);
router.patch("/user/updateProfile", authMiddleware.isLoggedIn, userController.updateUserDetails);
router.delete("/user/delete", authMiddleware.isLoggedIn, userController.deleteAccount);

router.post("/ticket/create", authMiddleware.isLoggedIn, ticketController.createTicket);
router.get("/ticket/allTix", ticketController.getTickets);
router.get("/ticket/tix", ticketController.getById);
router.patch("/ticket/updateTix",authMiddleware.isLoggedIn, ticketController.updateTicket);
router.delete("/ticket/delete", authMiddleware.isLoggedIn, ticketController.deleteTicket);
router.patch("/ticket/markSold", authMiddleware.isLoggedIn, ticketController.markSold);

export default router;