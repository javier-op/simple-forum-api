import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    author: {type: mongoose.ObjectId},
    createdAt: {type: Date},
    updatedAt: {type: Date},
    title: {type: String},
    content: {type: String},
    deleted: {type: Boolean}
});

const Thread = mongoose.model("thread", threadSchema);

export { Thread };
