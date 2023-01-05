import express from "express";
import { getUser, updateUser } from "../controller/user.js";

const userRouter = express.Router();

userRouter.get("/find/:userid", getUser
)
userRouter.put("/", updateUser)

export default userRouter