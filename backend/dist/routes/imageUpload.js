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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const cloudinary_1 = require("cloudinary");
const router = express_1.default.Router();
cloudinary_1.v2.config({
    cloud_name: "draw7t9sz",
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
});
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files && req.files.heroImage) {
            const heroImage = Array.isArray(req.files.heroImage)
                ? req.files.heroImage[0]
                : req.files.heroImage;
            const modifiedName = `ecommerce-${Date.now()}${path_1.default.extname(heroImage.name)}`;
            const heroImageUpload = yield cloudinary_1.v2.uploader.upload(heroImage.tempFilePath, {
                folder: "hero_images",
                public_id: modifiedName,
            });
            res.status(201).json({
                sucess: true,
                fileId: heroImageUpload.public_id,
                url: heroImageUpload.secure_url,
            });
        }
    }
    catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ success: false, message: "Error uploading image" });
    }
});
const deleteImage = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileId } = req.body;
    if (!fileId) {
        return res
            .status(400)
            .json({ success: false, message: "No file ID provided" });
    }
    // Delete image from Cloudinary
    const result = yield cloudinary_1.v2.uploader.destroy(fileId);
    res
        .status(200)
        .json({ success: true, message: "Image deleted successfully", result });
}));
router.post("/upload-image", uploadImage);
router.delete("/delete-image", deleteImage);
exports.default = router;
