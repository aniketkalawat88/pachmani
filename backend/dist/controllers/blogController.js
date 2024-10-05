"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const ErrorHandler_1 = __importDefault(require("../middlewares/ErrorHandler"));
const blogModel_1 = __importDefault(require("../models/blogModel"));
exports.createBlog = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author, tags } = req.body;
    if (!title || !content || !author) {
        return next(new ErrorHandler_1.default("Title, content, and author are required.", 400));
    }
    const newBlog = new blogModel_1.default({
        title,
        content,
        author,
        tags,
    });
    yield newBlog.save();
    res.status(201).json({
        success: true,
        message: "Blog post created successfully",
        data: newBlog,
    });
}));
exports.getAllBlogs = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blogModel_1.default.find();
    res.status(200).json({
        success: true,
        data: blogs,
    });
}));
exports.getBlogById = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const blog = yield blogModel_1.default.findById(id);
    if (!blog) {
        return next(new ErrorHandler_1.default("Blog post not found", 404));
    }
    res.status(200).json({
        success: true,
        data: blog,
    });
}));
exports.updateBlog = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, author, tags } = req.body;
    const updatedBlog = yield blogModel_1.default.findByIdAndUpdate(id, { title, content, author, tags }, { new: true, runValidators: true });
    if (!updatedBlog) {
        return next(new ErrorHandler_1.default("Blog post not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Blog post updated successfully",
        data: updatedBlog,
    });
}));
exports.deleteBlog = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedBlog = yield blogModel_1.default.findByIdAndDelete(id);
    if (!deletedBlog) {
        return next(new ErrorHandler_1.default("Blog post not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Blog post deleted successfully",
    });
}));
