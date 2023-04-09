import { loginService } from "../services/loginService.js";
import { addUser, updateUser, deleteUser } from "../services/userService.js";
import jwt from "jsonwebtoken";

import { postModel, userModel } from "../models/userModel.js";

//login
export const login = async (req, res) => {
  const body = req.body;
  const data = await loginService(body);
  if (data && !data.message) {
    const { id, username, email } = data;
    let jwtSecretKey = process.env.jwtSecretKey || "demo";
    const token = jwt.sign(
      {
        id,
        email,
        username,
      },
      jwtSecretKey,
      {
        expiresIn: 60 * 60 * 24 * 30,
        algorithm: "HS256",
      }
    );
    res.setHeader("Authorization", "Bearer " + token);

    res.status(200).json({
      success: true,
      message: "Login Success",
      id: id,
      username: username,
      email: email,
      authorization: token,
    });
  } else if (data.message) {
    res.status(401).json({
      success: false,
      message: data.message,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Login failed",
    });
  }
};

//Add User
export const addUserRecord = async (req, res) => {
  const body = req.body;
  const result = await addUser(body);

  if (result) {deleteUserRecord
    res.status(200).json({
      success: true,
      status: "success",
      message: "User Registered Successfully",
      data: result,
    });
  } else {
    res.status(401).json({
      success: false,
      status: "failed",
      message: "User Not Registered",
    });
  }
};

//Update user
export const updateUserRecord = async (req, res) => {
  const query = req.query;
  const body = req.body;
  const result = await updateUser(query, body);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Record Successfully Updated",
      data: result,
    });
  } else {
    res.status(204).json({
      success: false,
      message: "Record not updated",
    });
  }
};

//Delete user
export const deleteUserRecord= async (req, res) => {
  const result = await deleteUser(req.params.id);
    if(!result){
      res.status(401).json({error:err, message:"something is wrong"})
    }else{
      res.status(200).json({message:"User deleted", data:result})
    }
}

//Get all user
export const getUserRecord = async (req, res) => {
  try {
    const result = await userModel.find();
    if (result) {
      res.status(200).json({
        status: "success",
        // const {number} = req.query
        message: "user get successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error,
    });
  }
};

//post
export const addPost = async (req, res) => {
  const { title, description } = req.body;
  const user_id = req.user.id;
  try {
    const postData = postModel({
      date: new Date(),
      userId: user_id,
      title: title,
      description: description,
    });

    const result = await postData.save();

    if (result) {
      res.status(200).json({
        message: "post successfully created",
        status: "success",
        data: result,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error,
    });
  }
};
