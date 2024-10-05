import express, { Request, Response } from "express";
import path from "path";
import catchAsyncError from "../middlewares/catchAsyncError";
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();

cloudinary.config({
  cloud_name: "draw7t9sz",
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});
const uploadImage = async (req: Request, res: Response) => {
  try {
    if (req.files && req.files.heroImage) {
      const heroImage = Array.isArray(req.files.heroImage)
        ? req.files.heroImage[0]
        : req.files.heroImage;
      const modifiedName = `ecommerce-${Date.now()}${path.extname(
        heroImage.name
      )}`;
      const heroImageUpload = await cloudinary.uploader.upload(
        heroImage.tempFilePath,
        {
          folder: "hero_images",
          public_id: modifiedName,
        }
      );
      res.status(201).json({
        sucess: true,
        fileId: heroImageUpload.public_id,
        url: heroImageUpload.secure_url,
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error uploading image" });
  }
};
const deleteImage = catchAsyncError(async (req: Request, res: Response) => {
  const { fileId } = req.body;

  if (!fileId) {
    return res
      .status(400)
      .json({ success: false, message: "No file ID provided" });
  }

  // Delete image from Cloudinary
  const result = await cloudinary.uploader.destroy(fileId);

  res
    .status(200)
    .json({ success: true, message: "Image deleted successfully", result });
});
router.post("/upload-image", uploadImage);
router.delete("/delete-image", deleteImage);
export default router;
