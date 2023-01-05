import { db } from "../connect.js"
import jwt from "async-jsonwebtoken";
import moment from "moment";

export const getPosts = async (req, res) => {
    const userid = req.query.userid;
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json("Not logged in")
    }

    let result;
    try {
        result = await jwt.verify(token, "securitykey")
    } catch (err) {
        return res.status(403).send("Token is not valid")
    }

    const q = userid !== "undefined" ? `SELECT p.*, u.id AS userid, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid) WHERE p.userid = ? ORDER BY p.createDate DESC` :
        `SELECT p.*, u.id AS userid, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid)
    LEFT JOIN relationships AS r ON (p.userid = r.followedUserId) WHERE r.followerUserId= ? OR p.userid = ?
    ORDER BY p.createDate DESC`
    let rows;
    const value = [userid !== "undefined" ? [userid] : result[0].id, result[0].id]
    try {
        [rows,] = await db.query(q, value);
        return res.status(200).send(rows);
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const addPost = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json("Not logged in")
    }

    let result;
    try {
        result = await jwt.verify(token, "securitykey")
    } catch (err) {
        return res.status(403).send("Token is not valid")
    }

    const q = "INSERT INTO posts (`desc`, `img`, `createDate`,`userid`) VALUES (?) "
    console.log(req.body)
    const values = [
        req.body.desc,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        result[0].id
    ]

    let rows;
    try {
        [rows,] = await db.query(q, [values]);
        return res.status(200).send("post has been created");
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const deletePost = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json("Not logged in")
    }

    let result;
    try {
        result = await jwt.verify(token, "securitykey")
    } catch (err) {
        return res.status(403).send("Token is not valid")
    }

    const q = "DELETE FROM posts WHERE `id`=? AND `userid`=? "
    let rows;
    try {
        [rows,] = await db.query(q, [req.params.id, result[0].id]);
        return res.status(200).send("post has been deleted");
    } catch (err) {
        return res.status(500).send(err);
    }
}