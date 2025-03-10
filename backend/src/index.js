import express from "express";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { addProducts } from "./controller/product.controller.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/admin", addProducts);
app.use("/api/user", cartRoutes);

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
