import mongoose from "mongoose";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const CartSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    require: true,
  },
  products: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        require: true,
      },
      quantity: {
        type: String,
        default: "1",
      },
    },
  ],
});

const Cart = mongoose.model("cart", CartSchema);

export default Cart;
