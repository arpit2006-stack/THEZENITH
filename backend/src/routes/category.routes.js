import express from "express";
import { Tshirt } from "../controller/category.controller.js";

const router = express.Router();

router.get("/productsfind", Tshirt);

export default router;
