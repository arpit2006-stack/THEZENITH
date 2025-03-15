import Product from "../models/product.model.js";

export const Tshirt = async (req, res, next) => {
  try {
    // Fetch products where category is "t-shirts"
    const tshirts = await Product.find({ category: "tshirt" }).select(
      "image productName price description category"
    );

    // If no products found
    if (!tshirts.length) {
      return res.status(404).json({ message: "No t-shirts found" });
    }

    // Return the fetched products
    res.json({ tshirts });
  } catch (error) {
    console.error("Error fetching t-shirts:", error);
    next(error); // Pass error to Express error handler
  }
};



export const Shirt = async (req, res, next) => {
  try {
    // Fetch products where category is "t-shirts"
    const shirts = await Product.find({ category: "shirt" }).select(
      "image productName price description category"
    );

    // If no products found
    if (!shirts.length) {
      return res.status(404).json({ message: "No Shirts found" });
    }

    // Return the fetched products
    res.json({ shirts });
  } catch (error) {
    console.error("Error fetching Shirts:", error);
    next(error); // Pass error to Express error handler
  }
};



export const Shoes = async (req, res, next) => {
  try {
    // Fetch products where category is "t-shirts"
    const Shoes = await Product.find({ category: "shoes" }).select(
      "image productName price description category"
    );

    // If no products found
    if (!Shoes.length) {
      return res.status(404).json({ message: "No Shoes found" });
    }

    // Return the fetched products
    res.json({ Shoes });
  } catch (error) {
    console.error("Error fetching Shoes:", error);
    next(error); // Pass error to Express error handler
  }
};



export const Hoodies = async (req, res, next) => {
  try {
    // Fetch products where category is "Hoodies"
    const Hoodies = await Product.find({ category: "hoodies" }).select(
      "image productName price description category"
    );

    // If no products found
    if (!Hoodies.length) {
      return res.status(404).json({ message: "No Hoodies found" });
    }

    // Return the fetched products
    res.json({ Hoodies });
  } catch (error) {
    console.error("Error fetching Hoodies:", error);
    next(error); // Pass error to Express error handler
  }
};



export const Watches = async (req, res, next) => {
  try {
    // Fetch products where category is "Watches"
    const Watches = await Product.find({ category: "watches" }).select(
      "image productName price description category"
    );

    // If no products found
    if (!Watches.length) {
      return res.status(404).json({ message: "No Watches found" });
    }

    // Return the fetched products
    res.json({ Watches });
  } catch (error) {
    console.error("Error fetching Watches:", error);
    next(error); // Pass error to Express error handler
  }
};




