import { db } from "../connect.js";
import jwt from "async-jsonwebtoken"

export const getRelationships = async (req, res) => {
    const q = "SELECT followerUserId from relationships WHERE `followedUserId`=? "

    let rows;
    try {
        [rows,] = await db.query(q, [req.query.followedUserId]);
        return res.status(200).send(rows.map((relationship) => relationship.followerUserId));
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const addRelationship = async (req, res) => {
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

    const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?) "

    const values = [
        result[0].id,
        req.body.userid
    ]
    let rows;
    try {
        [rows,] = await db.query(q, [values]);
        return res.status(200).send("Following");
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const deleteRelationship = async (req, res) => {

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

    const q = "DELETE from relationships WHERE `followerUserId`= ? AND `followedUserId`=? "

    let rows;
    try {
        [rows,] = await db.query(q, [result[0].id, req.query.userid]);
        return res.status(200).send("Unfollowing");
    } catch (err) {
        return res.status(500).send(err);
    }
}