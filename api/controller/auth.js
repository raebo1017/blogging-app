import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "async-jsonwebtoken"


export const register = async (req, res) => {
    // check if exist
    const a = "SELECT * FROM users WHERE username= ?"
    try {
        const [rows, cols] = await db.query(a, [req.body.username]);
        if (rows.length) {
            return res.status(400).send("username already exists")
        }
    } catch (error) {
        return res.status(500).send(error)
    }


    // create a new user (hash password)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (username,email,password,name) VALUES (?,?,?,?)";
    const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
    try {
        await db.query(q, values)
        return res.status(200).send("User has been created")
    }
    catch (error) {
        return res.status(500).send(err);

    }


}

export const login = async (req, res) => {
    //check user, if no, return error
    const q = "SELECT * FROM users WHERE username = ?";
    let rows;
    try {
        [rows,] = await db.query(q, [req.body.username])
        if (rows.length === 0) {
            return res.status(404).send("User not found")
        }
    } catch (error) {
        return res.status(500).send(err)
    }

    const checkPassword = bcrypt.compareSync(req.body.password, rows[0].password)
    if (!checkPassword) {
        return res.status(400).send("Wrong passwords or username")
    }
    const { password, ...other } = rows[0];
    const token = await jwt.sign({ id: rows[0].id }, "securitykey");
    res.cookie("accessToken", token, { httponly: true }).status(200).send(other)
}


export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out")
}