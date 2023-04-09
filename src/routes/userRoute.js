import express from "express";
import {
  addUserRecord,
  updateUserRecord,
  deleteUserRecord,
  getUserRecord,
  addPost,
} from "../controllers/userController.js";
import { checkToken } from "../middleware/tokenValidation.js";
import { checkValidation } from "../middleware/validation.js";

export const userRoute = express.Router();

userRoute.post("/add", checkValidation("register"), addUserRecord);
userRoute.put("/update", updateUserRecord);
userRoute.delete("/delete/:id", deleteUserRecord);
userRoute.get("/getUser", getUserRecord);

userRoute.post("/post/add", checkToken, addPost);
// userRoute.put('/post/update')
// userRoute.delete('/post/delete')