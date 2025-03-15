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
