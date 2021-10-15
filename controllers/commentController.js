import { Comment } from "../models/comment.js";
import { Thread } from "../models/thread.js";

const commentCreate = async (req, res) => {
    try {
        const { thread_id, content } = req.body;
        if (!(thread_id && content)) {
            res.status(400).send("All input is required.");
            return;
        }
        const thread = await Thread.findById(thread_id);
        if (!thread || thread.deleted) {
            res.status(404).send("Thread doesn't exist.");
            return;
        }
        const currentDate = new Date();
        thread.updatedAt = currentDate;
        const { user_id, username, email } = req.user;
        const comment = await Comment.create({
            author: { user_id, username, email },
            thread_id,
            createdAt: currentDate,
            updatedAt: currentDate,
            content
        });
        thread.save();
        const { _id, author, createdAt, updatedAt } = comment;
        res.status(201).json({ _id, author, thread_id, createdAt, updatedAt, content });
    } catch(err) {
        console.log(err);
    }
};

const commentGetById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(id)) {
            req.statusCode(400).send("An id is required.");
            return;
        }
        const comment = await Comment.findById(id);
        if (!comment || comment.deleted) {
            res.status(404).send("Comment doesn't exist.");
            return;
        }
        const { _id, author, thread_id, createdAt, updatedAt, content } = comment;
        res.status(200).json({ _id, author, thread_id, createdAt, updatedAt, content });
    } catch(err) {
        console.log(err);
    }
};

const commentUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        if (!(id)) {
            res.status(400).send("An id is required.");
            return;
        } else if (!(content)) {
            res.status(400).send("All input is required.");
            return;
        }
        const comment = await Comment.findById(id);
        if (!comment || comment.deleted) {
            res.status(404).send("Comment doesn't exist.");
            return;
        }
        if (comment.author.user_id.toString() !== req.user.user_id) {
            res.status(403).send("Permission denied.");
            return;
        }
        comment.content = content;
        comment.updatedAt = new Date();
        comment.save();
        const { _id, author, thread_id, createdAt, updatedAt } = comment;
        res.status(200).json({ _id, author, thread_id, createdAt, updatedAt, content });
    } catch(err) {
        console.log(err);
    }
};

const commentDelete = async (req, res) => {
    try {
        const { id } = req.params;
        if (!(id)) {
            res.status(400).send("An id is required.");
            return;
        }
        const comment = await Comment.findById(id);
        if (!comment || comment.deleted) {
            res.status(404).send("Comment doesn't exist.");
            return;
        }
        if (comment.author.user_id.toString() !== req.user.user_id) {
            res.status(403).send("Permission denied.");
            return;
        }
        comment.deleted = true;
        comment.updatedAt = new Date();
        comment.save();
        res.status(200).send("Comment deleted.");
    } catch(err) {
        console.log(err);
    }
};

export { commentCreate, commentGetById, commentUpdate, commentDelete };
