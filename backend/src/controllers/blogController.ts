import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../middlewares/ErrorHandler";
import Blog, { BlogDocument } from "../models/blogModel";

export const createBlog = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, author, tags } = req.body;

    if (!title || !content || !author) {
      return next(
        new ErrorHandler("Title, content, and author are required.", 400)
      );
    }

    const newBlog: BlogDocument = new Blog({
      title,
      content,
      author,
      tags,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: newBlog,
    });
  }
);

export const getAllBlogs = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogs: BlogDocument[] = await Blog.find();
    res.status(200).json({
      success: true,
      data: blogs,
    });
  }
);

export const getBlogById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const blog: BlogDocument | null = await Blog.findById(id);

    if (!blog) {
      return next(new ErrorHandler("Blog post not found", 404));
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  }
);

export const updateBlog = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content, author, tags } = req.body;

    const updatedBlog: BlogDocument | null = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, tags },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return next(new ErrorHandler("Blog post not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: updatedBlog,
    });
  }
);

export const deleteBlog = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedBlog: BlogDocument | null = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return next(new ErrorHandler("Blog post not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  }
);
