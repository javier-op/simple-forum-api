import "dotenv/config";
import { connect } from "./config/database.js";
import { commentCreate, commentGetById, commentUpdate, commentDelete } from "./controllers/commentController.js";
import express from "express";
import { threadCreate, threadGetById, threadList, threadUpdate, threadDelete } from "./controllers/threadController.js";
import { userLogin, userRegister } from "./controllers/userController.js";
import { verifyToken as auth } from "./middleware/auth.js";

const app = express();
app.use(express.json());
connect();

app.post("/login", userLogin);
app.post("/register", userRegister);
app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🎉");
});
app.post("/thread", auth, threadCreate);
app.get("/thread", auth, threadList);
app.get("/thread/:id", auth, threadGetById);
app.put("/thread/:id", auth, threadUpdate);
app.delete("/thread/:id", auth, threadDelete);
app.post("/comment", auth, commentCreate);
app.get("/comment/:id", auth, commentGetById);
app.put("/comment/:id", auth, commentUpdate);
app.delete("/comment/:id", auth, commentDelete);

export { app };
