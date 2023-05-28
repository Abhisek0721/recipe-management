import express from "express";
import UserController from "../controllers/UserController";
const router = express.Router();

router.route("/signup").post(UserController.signup);

router.route("/login").post(UserController.login);

export default router;