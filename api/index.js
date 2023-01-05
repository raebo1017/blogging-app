import Express from "express";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import likeRouter from "./routes/likes.js";
import commentRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";
import relationshipRouter from "./routes/relationships.js";

const app = Express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next();
})
app.use(Express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).send(file.filename);
})
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/likes", likeRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/relationships", relationshipRouter);


app.listen(8800, () => {
    console.log("API worked")
})

