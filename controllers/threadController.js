import { Comment } from "../models/comment.js";
import { Thread } from "../models/thread.js";

const threadCreate = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!(title && content)) {
            req.status(400).send("All input is required.");
            return;
        }
        const currentDate = new Date();
        const { user_id, username, email } = req.user;
        const thread = await Thread.create({
            author: { user_id, username, email },
            createdAt: currentDate,
            updatedAt: currentDate,
            title,
            content
        });
        const { _id, author, createdAt, updatedAt } = thread;
        res.status(201).json({ _id, author, createdAt, updatedAt, title, content });
    } catch(err) {
        console.log(err);
    }
};

const threadGetById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(id)) {
            req.statusCode(400).send("An id is required.");
            return;
        }
        const thread = await Thread.findById(id);
        if (!thread || thread.deleted) {
            res.status(404).send("Thread doesn't exist.");
            return;
        }
        const { _id, author, createdAt, updatedAt, title, content } = thread;
        res.status(200).json({ _id, author, createdAt, updatedAt, title, content });
    } catch(err) {
        console.log(err);
    }
};

const threadList = async (req, res) => {
    try {
        const threads = await Thread.find({deleted: false}).select("-deleted").sort({updatedAt: -1});
        res.status(200).json(threads);
    } catch(err) {
        console.log(err);
    }
};

const threadUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        // a thread's title can't be edited
        if (!(id)) {
            res.status(400).send("An id is required.");
            return;
        } else if (!(content)) {
            res.status(400).send("All input is required.");
            return;
        }
        const thread = await Thread.findById(id);
        if (!thread || thread.deleted) {
            res.status(404).send("Thread doesn't exist.");
            return;
        }
        // threads can only be edited by his author
        if (thread.author.user_id.toString() !== req.user.user_id) {
            res.status(403).send("Permission denied.");
            return;
        }
        thread.content = content;
        thread.updatedAt = new Date();
        thread.save();
        const { _id, author, createdAt, updatedAt, title } = thread;
        res.status(200).json({ _id,  author, createdAt, updatedAt, title, content });
    } catch(err) {
        console.log(err);
    }
};

const threadDelete = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(id)) {
            res.status(400).send("An id is required.");
            return;
        }
        const thread = await Thread.findById(id);
        if (!thread || thread.deleted) {
            res.status(404).send("Thread doesn't exist.");
            return;
        }
        if (thread.author.user_id.toString() !== req.user.user_id) {
            res.status(403).send("Permission denied.");
            return;
        }
        // deletion is made by a flag, for moderation reasons
        thread.deleted = true;
        thread.updatedAt = new Date();
        thread.save();
        res.status(200).send("Thread deleted.");
    } catch(err) {
        console.log(err);
    }
};

export { threadCreate, threadGetById, threadList, threadUpdate, threadDelete };
