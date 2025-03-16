import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import path from "path";


const rootPath = path.join(process.env.UPLOAD_FILE_PATH,"inventory");

export const addProducts = async (req, res, next) => {
  console.log(req);
  const { productName, price, Quantity, description, category } = req.body;
  console.log( productName, price, Quantity, description, category);
  try {
    console.log("Require File ",req.file);
    const image = req.file ? req.file.path : null;

    if (!productName || !price || !category || !Quantity) {
      const error = new Error("Please Fill out all the details");
      error.statuscode = 400;
      next(error);
      return;
    }
    if (price < 0 || Quantity < 0) {
      const error = new Error("Please Enter a valid Price & Quantity");
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
      image: finalImage,
      productName: productName,
      price: price,
      Quantity: Quantity,
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
    const { productID, 
      
      image: newImage,
       productName: newProductName, 
       price: newPrice, 
       description: newDescription, 
       category: newCategory 
      
      } = req.body;

    // Find product by ID
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(400).json({ message: "No Such Product" });
    }

    // Check if anything has changed
    if (
      newImage === product.image &&
      newProductName === product.productName &&
      newPrice === product.price &&
      newDescription === product.description &&
      newCategory === product.category
    ) {
      return res.status(400).json({ message: "Nothing to Change" });
    }

    // Update product
    await Product.findByIdAndUpdate(
      productID,
      {
        image: newImage,
        productName: newProductName,
        price: newPrice,
        description: newDescription,
        category: newCategory,
      },
      { new: true } // Return updated document
    );

    res.status(200).json({ message: "Product details successfully updated" });
  } catch (error) {
    next(error);
  }
};


