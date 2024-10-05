import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import pageModel from "../models/carouselModel";

interface PageRequest extends Request {
  body: {
    pageName: string;
    carousels: {
      desktopFileId: string;
      desktopUrl: string;
      mobileFileId: string;
      mobileUrl: string;
    }[];
  };
}

export const getAllPages = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const pages = await pageModel.find();
    res.status(200).json({ success: true, pages });
  }
);

export const getPageByName = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const pageName = req.params.name;
    const page = await pageModel.findOne({ pageName });
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "getPageByName not found" });
    }
    res.status(200).json({ success: true, page });
  }
);

export const createPage = catchAsyncError(
  async (req: PageRequest, res: Response, next: NextFunction) => {
    const { pageName, carousels } = req.body;
    const newPage = new pageModel({ pageName, carousels });
    await newPage.save();
    res.status(201).json({ success: true, page: newPage });
  }
);

export const updatePage = catchAsyncError(
  async (req: PageRequest, res: Response, next: NextFunction) => {
    const { pageName, carousels } = req.body;
    let page = await pageModel.findOne({ pageName });
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }
    page.pageName = pageName;
    page.carousels = carousels;
    await page.save();
    res.status(200).json({ success: true, page });
  }
);

export const deletePage = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = await pageModel.findByIdAndDelete(req.params.id);
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Page deleted successfully" });
  }
);
