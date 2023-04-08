import { loginService } from "../services/loginService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { postModel, userModel } from "../models/userModel.js";

//Register
export const register = async (req, res) => {
  const { username, mobileNo, email, password } = req.body;
  const hasPassword = await bcrypt.hash(password, 7);
  try {
    const userData = userModel({
      date: new Date(),
      username: username,
      mobileNo: mobileNo,
      email: email,
      password: hasPassword,
    });
    const result = await userData.save();
    if (result) {
      res.status(200).json({
        success: true,
        status:'success',
        message: "User Registered Successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      status :'failed',
      message: "User Not Registered",
    });
  }
};

//login
export const login = async (req, res) => {
  const body = req.body;
  const data = await loginService(body);
  if (data && !data.message) {
    const { id, username, email } = data;
    let jwtSecretKey =process.env.jwtSecretKey || "demo";
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

//post
export const postAdd = async (req, res)=>{
    const {title, description} = req.body;
    const user_id = req.user.id;
    try {
        const postData = postModel({
            date : new Date(),
            userId : user_id,
            title : title,
            description : description
        })

        const result = await postData.save();

        if(result){
            res.status(200).json({
                message:"post successfully created",
                status : "success",
                data:result
            })
        }
    } catch (error) {
        res.status(401).json({
            status : "failed",
            message : error
        })
    }
}