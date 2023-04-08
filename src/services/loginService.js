import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

//Login
export const loginService = async (body) => {
  let errResponse = {};
  const result = await userModel.findOne({ email: body.email });
  if (!result) {
    errResponse.message = "username not exits";
    return errResponse;
  } else {
    const hasPassword = await bcrypt.compare(body.password, result.password);
    if (hasPassword) {
      return result;
    } else {
      errResponse.message = "password does not match";
      return errResponse;
    }
  }
};
