import express from "express";
import { Tshirt, Shirt, Shoes, Watches, Hoodies } from "../controller/category.controller.js";

const router = express.Router();

router.get("/findtshirt", Tshirt);

router.get("/findshirt", Shirt);

router.get("/findshoes", Shoes);

router.get("/findwatches", Watches);

router.get("/findhoodies", Hoodies);

export default router;
