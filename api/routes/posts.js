import express from "express";
import { getPosts, addPost, deletePost } from "../controller/post.js";

const postRouter = express.Router();

postRouter.get("/", getPosts)
postRouter.post("/", addPost)
postRouter.delete("/:id", deletePost)

export default postRouter