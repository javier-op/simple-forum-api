import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    author: {
        user_id: {type: mongoose.ObjectId},
        username: {type: String},
        email: {type: String}
    },
    createdAt: {type: Date},
    updatedAt: {type: Date},
    title: {type: String},
    content: {type: String},
    deleted: {type: Boolean, select: false, default: false}
});

const Thread = mongoose.model("thread", threadSchema);

export { Thread };
