import mongoose, { model } from "mongoose";

//User Schema
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: Date,
  username: { type: String, required: true },
  mobileNo: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  updateDate: Date,
});

//Post Schema
const postSchema = new mongoose.Schema({
  date: { type: Date },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  // image:{type:String}
});
//export usermodel
export const userModel = mongoose.model("user", userSchema);
export const postModel = mongoose.model("post", postSchema);
