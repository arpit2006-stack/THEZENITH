import express from "express";
import { TokenGuard } from "../middleware/user.middleware.js";
import { adminLogin, login, signup, update } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.put("/update", TokenGuard, update);

router.post("/adminlogin",adminLogin);

export default router;
