import express from "express";
import { addProducts, editProducts } from "../controller/product.controller.js";
import { TokenGuard } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/addProducts", TokenGuard, addProducts);

router.post("/editProducts", TokenGuard, editProducts);

export default router;
