import express from "express";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart.routes.js";
import path from "path";

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
