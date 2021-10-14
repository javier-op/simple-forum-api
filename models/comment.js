import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author: {
        user_id: {type: mongoose.ObjectId},
        username: {type: String},
        email: {type: String}
    },
    thread_id: {type: mongoose.ObjectId},
    createdAt: {type: Date},
    updatedAt: {type: Date},
    content: {type: String},
    deleted: {type: Boolean, select: false, default: false}
});

const Comment = mongoose.model("comment", commentSchema);

export { Comment };
