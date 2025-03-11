import express from "express";
import { addProducts, editProducts } from "../controller/product.controller.js";
import { TokenGuard } from "../middleware/user.middleware.js";
import path from 'path'
import multer from 'multer';

const router = express.Router();

const rootPath = path.join(process.env.UPLOAD_FILE_PATH,"inventory");

import fs from "fs";
if (!fs.existsSync(rootPath)) {
  fs.mkdirSync(rootPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, rootPath); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
  });

router.post("/addProducts",TokenGuard,upload.single("image"), addProducts);

router.post("/editProducts", TokenGuard, editProducts);

export default router;
