import mongoose, { model } from "mongoose";

//User Schema
const userSchema = new mongoose.Schema({
  date: { type: Date },
  username: { type: String, required: true },
  mobileNo: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//Post Schema
const postSchema = new mongoose.Schema({
  date :{type:Date},
  userId:{type:String, required:true},
  title:{type:String, required:true},
  description:{type:String, required:true},
  // image:{type:String}
})
//export usermodel
export const userModel = mongoose.model("login", userSchema);
export const postModel = mongoose.model("post", postSchema)
