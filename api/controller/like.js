import { db } from "../connect.js";
import jwt from "async-jsonwebtoken"

export const getLikes = async (req, res) => {
    const q = "SELECT userid from likes WHERE postid=? "

    let rows;
    try {
        [rows,] = await db.query(q, [req.query.postid]);
        return res.status(200).send(rows.map((like) => like.userid));
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const addLike = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json("Not logged in")
    }

    let result;
    try {
        result = await jwt.verify(token, "securitykey")
    } catch (err) {
        console.log(err)
        return res.status(403).send("Token is not valid")
    }

    const q = "INSERT INTO likes (`userid`,`postid`) VALUES (?) "

    const values = [
        result[0].id,
        req.body.postid
    ]
    let rows;
    try {
        [rows,] = await db.query(q, [values]);
        return res.status(200).send("like has been created");
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const deleteLike = async (req, res) => {

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

    const q = "DELETE from likes WHERE `userid`= ? AND `postid`=? "

    let rows;
    try {
        console.log(result[0].id, req.query.postid);
        [rows,] = await db.query(q, [result[0].id, req.query.postid]);
        return res.status(200).send("disliked");
    } catch (err) {
        return res.status(500).send(err);
    }
}