import express from 'express'
import { TokenGuard } from '../middleware/user.middleware.js'
import { addCart } from '../controller/cart.controller.js';

const router = express.Router();

router.post("/addtocart",TokenGuard,addCart);

export default router;