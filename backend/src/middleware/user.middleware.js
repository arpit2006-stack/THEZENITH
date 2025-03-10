import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const TokenGuard = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      const error = new Error("Access Denied");
      error.statusCode = 401;
      return next(error);
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.userID).select("-password");
    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      return next(error);
    }

    req.user = user;
    console.log("middleware", user);
    next();
  } catch (error) {
    next(error);
  }
};
