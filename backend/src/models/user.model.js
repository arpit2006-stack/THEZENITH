import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role:{
    type:String,
    require:true,
    default:"customer",
  }
},{timestamps:true});

const User =  mongoose.model("User",UserSchema);

export default User;
