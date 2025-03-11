import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import path from "path";


const rootPath = path.join(process.env.UPLOAD_FILE_PATH,"inventory");

export const addProducts = async (req, res, next) => {
  console.log(req);
  const { productName, price, description, category } = req.body;
  console.log( productName, price, description, category);
  try {
    console.log("Require File ",req.file);
    const image = req.file?`${rootPath}/${req.file.filename}`:null;

    if (!productName || !price || !category || !image) {
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

    console.log("Sending to Cloudinary: ",image);
    const uploadImage = await cloudinary.uploader.upload(image,{
      folder:"Product_Image"
    })

    console.log("File Uploaded to cloudinary: ",uploadImage);
    const finalImage = uploadImage.secure_url;

    const addProduct = await Product.create({
      image:finalImage,
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
