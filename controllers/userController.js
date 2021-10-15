import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!(username && email && password)) {
            res.status(400).send("All input is required.");
            return;
        }
        const usernameMatch = await User.findOne({ username });
        const emailMatch = await User.findOne({ email });
        if (usernameMatch) {
            res.status(409).send("Username already exists. Please login.");
            return;
        } else if (emailMatch) {
            res.status(409).send("Email already in use. Please use another.");
            return;
        }
        // hash password before storing
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        // create token for login
        const token = jwt.sign(
            { user_id: user._id, username, email },
            process.env.TOKEN_KEY,
            { expiresIn: process.env.JWT_EXPIRATION_TIME }
        );
        user.token = token;
        return res.status(201).json({ username, email, token });
    } catch (err) {
        console.log(err);
    }
}

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send("Username and password are required for login.");
            return;
        }
        // find username and check password match
        const user = await User.findOne({ username });
        let passwordMatch = false;
        if (user) {
            passwordMatch = await bcrypt.compare(password, user.password);
        }
        // create login token
        if (user && passwordMatch) {
            const token = jwt.sign(
                { user_id: user._id, username, email: user.email },
                process.env.TOKEN_KEY,
                { expiresIn: process.env.JWT_EXPIRATION_TIME }
            );
            user.token = token;
            const { email } = user;
            res.status(200).json({ username, email, token });
        } else {
            res.status(400).send("Invalid credentials");
        }
    } catch (err) {
        console.log(err);
    }
    
}

export { userRegister, userLogin };
