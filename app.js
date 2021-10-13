import "dotenv/config";

import bcrypt from "bcryptjs";
import { connect } from "./config/database.js";
import jwt from "jsonwebtoken";
import express from "express";
import { User } from "./model/user.js";

const app = express();
app.use(express.json());
connect();

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            req.statusCode(400).send("All input is required.");
        }

        const usernameMatch = await User.findOne({ username });
        const emailMatch = await User.findOne({ email });
        console.log(usernameMatch);
        if (usernameMatch) {
            return res.status(409).send("Username already exists. Please login.");
        } else if (emailMatch) {
            return res.status(409).send("Email already in use. Please use another.");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

app.post("/login", (req, res) => {

});

export { app };
