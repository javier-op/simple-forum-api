import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author: {type: mongoose.ObjectId},
    thread: {type: mongoose.ObjectId},
    creationDate: {type: Date},
    lastUpdate: {type: Date},
    content: {type: String}
});

const Comment = mongoose.model("comment", commentSchema);

export { Comment };
