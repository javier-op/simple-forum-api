import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author: {type: mongoose.ObjectId},
    thread: {type: mongoose.ObjectId},
    createdAt: {type: Date},
    updatedAt: {type: Date},
    content: {type: String},
    deleted: {type: Boolean}
});

const Comment = mongoose.model("comment", commentSchema);

export { Comment };
