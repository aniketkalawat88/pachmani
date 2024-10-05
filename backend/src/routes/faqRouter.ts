// routes/faq.routes.ts
import express, { Request, Response } from "express";
import faq from "../models/faqmodel";
import catchAsyncError from "../middlewares/catchAsyncError";
const router = express.Router();

router.post(
  "/",
  catchAsyncError(async (req: Request, res: Response) => {
    const { question, answer }: { question: string; answer: string } = req.body;
    const newFAQ = await faq.create({ question, answer });
    const savedFAQ = await newFAQ.save();
    res.status(201).json(savedFAQ);
  })
);
router.get(
  "/",
  catchAsyncError(async (req: Request, res: Response) => {
    const faqs = await faq.find();
    res.json(faqs);
  })
);
router.patch(
  "/:id",
  catchAsyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { question, answer }: { question: string; answer: string } = req.body;
    const updatedFAQ = await faq.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );
    if (!updatedFAQ) {
      throw new Error("FAQ not found");
    }
    res.json(updatedFAQ);
  })
);
router.delete(
  "/:id",
  catchAsyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedFAQ = await faq.findByIdAndDelete(id);
    if (!deletedFAQ) {
      throw new Error("FAQ not found");
    }
    res.json({ message: "FAQ deleted" });
  })
);

export default router;
