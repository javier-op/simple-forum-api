import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    author: {type: mongoose.ObjectId},
    creationDate: {type: Date},
    lastUpdate: {type: Date},
    title: {type: String},
    content: {type: String}
});

const Thread = mongoose.model("thread", threadSchema);

export { Thread };
