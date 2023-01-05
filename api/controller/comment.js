import { db } from "../connect.js";
import jwt from "async-jsonwebtoken"
import moment from "moment"


export const getComments = async (req, res) => {
    const q = `SELECT c.*, u.id AS userid, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userid)
    WHERE c.postid=? ORDER BY c.createdAt DESC`
    let rows;
    try {
        [rows,] = await db.query(q, [req.query.postid]);
        return res.status(200).send(rows);
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const addComments = async (req, res) => {
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

    const q = "INSERT INTO comments (`desc`, `createdAt`,`userid`, `postid`) VALUES (?) "

    const values = [
        req.body.desc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        result[0].id,
        req.body.postid
    ]

    let rows;
    try {
        [rows,] = await db.query(q, [values]);
        return res.status(200).send("comments has been created");
    } catch (err) {
        return res.status(500).send(err);
    }
}