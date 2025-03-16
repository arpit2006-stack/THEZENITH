import express from "express";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart.routes.js";
import path from "path";
import viewProduct from "./routes/viewproduct.routes.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";

import categoryRoutes from "./routes/category.routes.js";

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

app.get("/getproducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

<<<<<<< HEAD
app.get("/api/admin/getProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

=======
<<<<<<< HEAD
app.get("/allUsers", async (req, res) => {
=======
>>>>>>> cef81eff31c2202e3bcc3e09a3558458512f9bdf

app.delete('/deleteproduct', async (req, res) => {
  const { id } = req.body;
  try {
     const product = await Product.findByIdAndDelete(id);
     
     if (!product) {
        return res.status(404).json({ message: "Product not found" });
     }

     res.status(200).json({ message: "The Product was deleted successfully", product });
  } catch (error) {
     res.status(500).json({ message: 'Server Error', error: error.message });
  }
});



app.get('/allUsers', async (req, res) => {
>>>>>>> 768b98940464e02f1ab258605b2dd497f1b317b9
  try {
    const AllUser = await User.find();
    res.json(AllUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.use("/api/user", cartRoutes);
app.use("/api/user", categoryRoutes);
app.use("/api/user", viewProduct);

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
