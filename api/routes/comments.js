import express from "express";
import { getComments, addComments } from "../controller/comment.js";

const commentRouter = express.Router();

commentRouter.get("/", getComments
)
commentRouter.post("/", addComments)

export default commentRouter