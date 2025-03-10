import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res, next) => {
  console.log(req);
  const { fullName, email, password, role } = req.body;
  console.log(fullName, email, password, role);
  try {
    if (!fullName || !email || !password) {
      const error = new Error("All Fields Requested");
      error.statuscode = 400;
      next(error);
      return;
    }

    if (password.length < 6) {
      const error = new Error("Password should be greater than 4 characters");
      error.statuscode = 400;
      next(error);
      return;
    }

    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("Email address already exists");
      error.statuscode = 400;
      next(error);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      role: role,
    });

    console.log(newUser._id);
    res
      .status(201)
      .json({ message: `Welcome to your shopping destination ${fullName}` });
  } catch (error) {
    next(error);
    return;
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      const error = new Error("All Fields Requested");
      error.statuscode = 400;
      next(error);
      return;
    }

    if (password.length < 6) {
      const error = new Error("Invalid password");
      error.statuscode = 403;
      next(error);
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statuscode = 403;
      next(error);
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Invalid Email or Password");
      error.statusCode = 404;
      next(error);
      return;
    }

    generateToken(user._id, res);

    res.status(200).json({
      message: `Welcome Back ${user.fullName}`,
      fullName: user.fullName,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { fullName: newName } = req.body;
    const userID = req.user._id; // Assuming you're getting the user from auth middleware

    const user = await User.findById(userID); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newName === user.fullName) {
      return res.status(400).json({ message: "Enter a new name" });
    }

    user.fullName = newName;
    await user.save();

    console.log("Updated Successfully");
    res.status(200).json({ message: "Name Changed" });
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      const error = new Error("All Fields Requested");
      error.statuscode = 400;
      next(error);
      return;
    }

    if (password.length < 6) {
      const error = new Error("Invalid password");
      error.statuscode = 403;
      next(error);
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.statuscode = 403;
      next(error);
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Invalid Email or Password");
      error.statusCode = 404;
      next(error);
      return;
    }

    if (user.role === "admin") {
      generateToken(user._id, res);

      res.status(200).json({
        message: `Welcome Back ${user.fullName}`,
        fullName: user.fullName,
        email: user.email,
        id: user._id,
      });
    }

    if(user.role==="customer"){
      const error = new Error("Invalid Access");
      error.statusCode = 403;
      next(error);
      return;
    }
  } catch (error) {
    next(error);
  }
};
