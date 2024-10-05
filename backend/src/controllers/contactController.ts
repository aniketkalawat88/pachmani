import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import ContactUs from "../models/contactModel";
import ErrorHandler from "../middlewares/ErrorHandler";

interface ContactUsRequest extends Request {}

export const createContactUs = catchAsyncError(
  async (req: ContactUsRequest, res: Response, next: NextFunction) => {
    const { email, name, phoneNumber, message } = req.body;
    if (!email || !name || !phoneNumber || !message) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    const newContactUs = new ContactUs({
      email,
      name,
      phoneNumber,
      message,
    });

    await newContactUs.save();

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  }
);

export const getAllContactUsMessages = catchAsyncError(
  async (req: ContactUsRequest, res: Response, next: NextFunction) => {
    const contactUsMessages = await ContactUs.find();
    res.status(200).json({ success: true, contactUsMessages });
  }
);

export const deleteContactUsMessage = catchAsyncError(
  async (req: ContactUsRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const contactUsMessage = await ContactUs.findById(id);
    if (!contactUsMessage) {
      return next(new ErrorHandler("Message not found.", 404));
    }
    await ContactUs.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Message deleted successfully" });
  }
);
