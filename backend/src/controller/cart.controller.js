import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const addCart = async (req, res, next) => {
  try {
    // const Userid = req.user._id;
    // const productid = req.product._id;

    const { Userid, productID } = req.body;

    const product = await Product.findById({ productID });
    if (!product) {
      const error = new Error("No such product exist");
      error.statuscode = 400;
      next(error);
      return;
    }

    const usercart = await Cart.findById({ Userid });

    if (!usercart) {
      newCart = await Cart.create({
        Userid,
        products: [{ productID, quantity }],
      });
    } else {
      const cartProduct = usercart.products.find(
        (p) => p.productID.toString() === productID
      );

      if (cartProduct) {
        cartProduct.quantity += 1;
      } else {
        usercart.products.push({ productID, quantity: 1 });
      }
    }

    await userCart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: userCart,
    });
  } 
  catch (error) {
    next(error);
  }
};
