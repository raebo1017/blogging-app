import { db } from "../connect.js"
import jwt from "async-jsonwebtoken"

export const getUser = async (req, res) => {
    const userid = req.params.userid;
    const q = "SELECT * FROM users WHERE id=?"
    let rows;

    try {
        [rows,] = await db.query(q, [userid]);
        const { password, ...info } = rows[0];
        return res.send(info)
    } catch (err) {
        return res.status(500).send(err)
    }

}

export const updateUser = async (req, res) => {
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

    const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE id=?"
    let rows;
    try {
        [rows,] = await db.query(q, [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.coverPic,
            req.body.profilePic,
            result[0].id]);
        return res.status(200).send("updated!")
    } catch (err) {
        return res.status(500).send(err)
    }

}
