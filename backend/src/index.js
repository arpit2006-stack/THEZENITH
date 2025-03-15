import express from "express";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart.routes.js";
import path from "path";
<<<<<<< HEAD
import Product from "./models/product.model.js";
=======
import categoryRoutes from "./routes/category.routes.js";
>>>>>>> 5c486e71ffdf307cf46bc3b32cfe0c3bd38b0f66

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const rootPath = path.join(process.env.UPLOAD_FILE_PATH, "inventory");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/inventory", express.static(rootPath));

app.use(cookieParser());

app.use("/api/user", userRoutes);

app.use("/api/admin", productRoutes);

app.get('/getproducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.use("/api/user", cartRoutes);
app.use("/api/user", categoryRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  const StatusCode = err.statusCode || 500;
  res.status(StatusCode).json({ message: err.message });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`PORT CONNECTED AT ${PORT}`);
  connectDB();
});
