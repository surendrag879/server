import express from "express";
import { login} from "../controllers/userController.js";
import { checkValidation } from "../middleware/validation.js";

export const loginRoute = express.Router();

loginRoute.post("/login",checkValidation("login"), login)