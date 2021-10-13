import "dotenv/config";
import { connect } from "./config/database.js";
import express from "express";
import { userLogin, userRegister } from "./controllers/userController.js"

const app = express();
app.use(express.json());
connect();

app.post("/login", userLogin);
app.post("/register", userRegister);

export { app };
