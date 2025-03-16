import Product from "../models/product.model.js";

export const view = async (req, res, next) => {
  try {
    const { productId } = req.body; 

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId).select(
      "image productName price description category"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product }); 
  } catch (error) {
    next(error);
  }
};
