import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    token: {type: String}
});

const User = mongoose.model("user", userSchema);

export { User };
