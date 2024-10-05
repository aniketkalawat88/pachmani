"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
    },
    tags: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
