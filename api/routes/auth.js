import express from "express";
import { } from "../controller/auth.js";
import { login } from "../controller/auth.js";
import { register } from "../controller/auth.js";
import { logout } from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);

export default authRouter