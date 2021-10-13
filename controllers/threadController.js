import { Thread } from "../models/thread.js"
import { Comment } from "../models/comment.js"

const threadCreate = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!(title && content)) {
            req.statusCode(400).send("All input is required.");
        }
        const currentDate = new Date();
        const thread = await Thread.create({
            author: req.user.user_id,
            createdAt: currentDate,
            updatedAt: currentDate,
            title,
            content,
            deleted: false
        });
        res.status(201).json(thread);
    } catch(err) {
        console.log(err);
    }
};

const threadGetById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!(id)) {
            req.statusCode(400).send("An id is required.");
        }
        const thread = await Thread.findById(id);
        if (thread.deleted) {
            req.statusCode(400).send("Thread was deleted.")
        }
        const comments = await Comment.find({thread: id});
        res.status(201).json({ thread, comments });
    } catch(err) {
        console.log(err);
    }
};

const threadList = async (req, res) => {
    try {
        const threads = await Thread.find({deleted: false});
        res.status(201).json({ threads });
    } catch(err) {
        console.log(err);
    }
};

const threadUpdate = async (req, res) => {
    try {
        const { id, content } = req.body;
        if (!(id)) {
            req.statusCode(400).send("An id is required.");
        }
        if (!(content)) {
            req.statusCode(400).send("All input is required.");
        }
        const thread = await Thread.findById(id);
        thread.content = content;
        res.status(201).json({ thread });
    } catch(err) {
        console.log(err);
    }
};

const threadDelete = async (req, res) => {
    try {
        const { id } = req.body;
        if (!(id)) {
            req.statusCode(400).send("An id is required.");
        }
        const thread = await Thread.findById(id);
        thread.deleted = false;
        res.status(201).json({ thread });
    } catch(err) {
        console.log(err);
    }
};
