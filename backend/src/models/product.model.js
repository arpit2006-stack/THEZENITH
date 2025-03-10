import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
      default: "",
    },
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product",ProductSchema);

export default Product;
