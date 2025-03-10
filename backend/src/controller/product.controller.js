import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import path from "path";
import { use } from "bcrypt/promises.js";

export const addProducts = async (req, res, next) => {
  console.log(req);
  const { image, productName, price, description, category } = req.body;
  console.log(image, productName, price, description, category);
  try {
    if (!productName || !price || !category) {
      const error = new Error("Please Fill out all the details");
      error.statuscode = 400;
      next(error);
      return;
    }
    if (price < 0) {
      const error = new Error("Please Enter a valid Price");
      error.statuscode = 400;
      next(error);
      return;
    }

    const addProduct = await Product.create({
      image: image,
      productName: productName,
      price: price,
      description: description,
      category: category,
    });

    console.log(addProduct._id);
    res.status(200).json({ message: "The Product was added successfully" });
  } catch (error) {
    next(error);
  }
};

export const editProducts = async (req, res, next) => {
  try {
    const { image: newImage } = req.body;
    const { productName: newProductName } = req.body;
    const { price: newPrice } = req.body;
    const { description: newDescription } = req.body;
    const { category: newCategory } = req.body;

    const userID = req.user._id;
    const user = await User.findById({ userID });
    if (!user) {
      const error = new Error("Access Denied");
      error.statuscode = 403;
      next(error);
      return;
    }

    const productID = req.product._id;
    const product = await Product.findById({ productID });
    if (!product) {
      const error = new Error("No Such Product");
      error.statuscode = 400;
      next(error);
      return;
    }

    if (
      newImage === Product.image &&
      newProductName === Product.productName &&
      newPrice === Product.price &&
      newDescription === Product.description &&
      newCategory === Product.category
    ) {
      const error = new Error("Nothing to Change");
      error.statuscode = 400;
      next(error);
      return;
    }

    await Product.findByIdAndUpdate(
      productID,
      { image: newImage },
      { productName: newProductName },
      { price: newPrice },
      { description: newDescription },
      { category: newCategory }
    );

    res
      .status(200)
      .json({ message: "Details Successfully updated of product" });
  } catch (error) {
    next(error);
  }
};
