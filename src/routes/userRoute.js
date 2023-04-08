import express from "express";
import { register ,postAdd} from "../controllers/userController.js";
import { checkToken } from "../middleware/tokenValidation.js";
import { checkValidation } from "../middleware/validation.js";
export const userRoute = express.Router();

userRoute.post("/add",checkValidation("register"), register)
// userRoute.put("/update")
// userRoute.delete("/delete")

userRoute.post('/post/add',checkToken, postAdd)
// userRoute.put('/post/update')
// userRoute.delete('/post/delete')