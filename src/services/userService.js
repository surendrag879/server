import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

//Add user
export const addUser = async (body) => {
  const { username, mobileNo, email, password } = body;

  const hasPassword = await bcrypt.hash(password, 7);
  const date = new Date();

  try {
    const userData = userModel({
      date: date,
      username: username,
      mobileNo: mobileNo,
      email: email,
      password: hasPassword,
    });
    const result = await userData.save();
    return result;
  } catch (error) {
    return error;
  }
};

//Update user
export const updateUser = async (query, body) => {
  const {userId} = query;
  const date = new Date();
  try {
    const updateData = {
      updateDate: date,
      username: body.username,
      mobileNo: body.mobileNo,
    };
    const result = await userModel.findOneAndUpdate({ _id: userId },updateData,{ new: true });
    return result;
  } catch (error) {
    return error;
  }
};

//Delete user
export const deleteUser = async (id) => {
  const result = await userModel.findByIdAndRemove({_id:id})
  return result;
}