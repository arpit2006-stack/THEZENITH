import { view } from "../controller/viewproduct.controller.js";
import express from "express";

const router = express.Router();

router.post("/viewproduct", view);

export default router;
