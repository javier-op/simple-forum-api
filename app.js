import "dotenv/config";
import { connect } from "./config/database.js";
import express from "express";
import { userLogin, userRegister } from "./controllers/userController.js"
import { verifyToken as auth } from "./middleware/auth.js";

const app = express();
app.use(express.json());
connect();

app.post("/login", userLogin);
app.post("/register", userRegister);
app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🎉")
});

export { app };
