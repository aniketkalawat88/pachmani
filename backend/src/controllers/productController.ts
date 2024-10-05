import { Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import Product, { IProduct } from "../models/productModel";
import productVariantSchema from "../models/productVariant";
import ProductVariant from "../models/productVariant";
import mongoose, { FilterQuery, Types } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import jwt from "jsonwebtoken";

import path from "path";

import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel";

interface IReviewImage {
  fileId: string;
  url: string;
}

interface IReview {
  text?: string;
  rating?: number;
  images?: IReviewImage[];
}

interface UploadedFile {
  name: string;
  tempFilePath: string;
  mimetype: string;
  mv: (path: string, callback: (err: any) => void) => void;
}

cloudinary.config({
  cloud_name: "draw7t9sz",
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

const calculatePriceAfterDiscount = (
  price: number,
  discount: number
): number => {
  return price - (price * discount) / 100;
};

export const createProduct = catchAsyncError(
  async (req: Request, res: Response) => {
    let { productData, variantData } = req.body;
    productData = JSON.parse(productData);
    variantData = JSON.parse(variantData);
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
      productData.thumbnail = {
        fileId: heroImageUpload.public_id,
        url: heroImageUpload.secure_url,
      };
    }
    if (req.files) {
      const detailedImageKeys = Object.keys(req.files).filter((key) =>
        key.startsWith("detailedImage")
      );
      if (detailedImageKeys.length > 0) {
        const imageUrls = [];
        for (const key of detailedImageKeys) {
          const image = Array.isArray(req.files[key])
            ? (req.files[key] as UploadedFile[])[0]
            : (req.files[key] as UploadedFile);
          const modifiedName = `ecommerce-${Date.now()}${path.extname(
            image.name
          )}`;
          const imageUpload = await cloudinary.uploader.upload(
            image.tempFilePath,
            {
              folder: "detailed_images",
              public_id: modifiedName,
            }
          );
          imageUrls.push({
            fileId: imageUpload.public_id,
            url: imageUpload.secure_url,
          });
        }
        productData.images = imageUrls;
      }
    }
    const product = await Product.create(productData);
    const newVariants = await Promise.all(
      variantData.map(async (data: any) => {
        data.product = product._id;
        const newVariant = await ProductVariant.create(data);
        newVariant.priceAfterDiscount = calculatePriceAfterDiscount(
          data.price,
          data.discount
        );
        return await newVariant.save();
      })
    );
    product.variants = newVariants.map((variant: any) => variant._id);
    await product.save();
    res.status(201).json({ success: true, product });
  }
);

export const getProductById = catchAsyncError(
  async (req: Request, res: Response) => {
    const productId = new ObjectId(req.params.productId);
    // const userId = req.user ? new ObjectId(req.user._id) : null;
    const product = await Product.findById(productId)
      .populate("variants")
      .exec();
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // const likedByUsers = await User.find({ _id: { $in: product.likedBy } }, '_id').exec();
    // const likedBy = likedByUsers.map(user => user._id);

    // const reviews = product.reviews ?? [];
    // const validRatings = reviews
    //   .map(review => review.rating)
    //   .filter((rating): rating is number => rating !== undefined);
    // const averageRating = validRatings.length
    //   ? validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length
    //   : 0;

    // const isLiked = userId ? likedBy.includes(userId) : false;

    // const { reviews: productReviews, likedBy: likedByField, ...productData } = product.toObject();

    res.status(200).json({
      success: true,
      product,
    });
  }
);

export const updateProductVariant = catchAsyncError(
  async (req: Request, res: Response) => {
    const variantId = req.params.variantId;
    const variantData = req.body; // Partial<IProductVariant> to allow updating only specific fields
    const updatedVariant = await ProductVariant.findByIdAndUpdate(
      variantId,
      variantData,
      { new: true }
    );
    if (!updatedVariant) {
      return res
        .status(404)
        .json({ success: false, message: "Product variant not found" });
    }
    updatedVariant.priceAfterDiscount = calculatePriceAfterDiscount(
      updatedVariant.price,
      updatedVariant.discount ?? 0
    );
    await updatedVariant.save();
    res.status(200).json({ success: true, variant: updatedVariant });
  }
);

export const updateProduct = catchAsyncError(
  async (req: Request, res: Response) => {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  }
);

export const deleteProduct = catchAsyncError(
  async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  }
);

export const createProductVariant = catchAsyncError(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const variantData = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const newVariant = new ProductVariant({
      ...variantData,
      product: productId,
    });
    newVariant.priceAfterDiscount = calculatePriceAfterDiscount(
      newVariant.price,
      newVariant.discount || 0
    );
    await newVariant.save();
    product.variants.push(newVariant.id);
    await product.save();
    res.status(201).json({ success: true, variant: newVariant });
  }
);

export const postReview = catchAsyncError(
  async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const { text, rating } = req.body;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Create review object
    const review: IReview = {
      text,
      rating,
      images: [],
    };

    // Check if images are uploaded
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (const image of images) {
        const modifiedName = `ecommerce-${Date.now()}${path.extname(
          image.name
        )}`;

        // Upload each image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(
          image.tempFilePath,
          {
            folder: "review_images",
            public_id: modifiedName,
          }
        );

        if (!review.images) {
          review.images = [];
        }

        // Add image URL to review
        review.images.push({
          fileId: imageUpload.public_id,
          url: imageUpload.secure_url,
        });
      }
    }

    if (!product.reviews) {
      product.reviews = [];
    }

    // Add the review to the product
    product.reviews.push(review);
    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Review posted successfully" });
  }
);

export const getProductReviews = catchAsyncError(
  async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, reviews: product.reviews });
  }
);

export const deleteProductVariant = catchAsyncError(
  async (req: Request, res: Response) => {
    const { productId, variantId } = req.params;

    if (!ObjectId.isValid(productId) || !ObjectId.isValid(variantId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product or variant ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const variantIndex = product.variants.indexOf(variantId as any);
    if (variantIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Variant not found in product" });
    }

    product.variants.splice(variantIndex, 1);
    await product.save();

    const variant = await ProductVariant.findByIdAndDelete(variantId);
    if (!variant) {
      return res
        .status(404)
        .json({ success: false, message: "Variant not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Variant removed successfully" });
  }
);

export const getAllProducts = catchAsyncError(
  async (req: Request, res: Response) => {
    const token =
      req.cookies.token ||
      req.headers.token ||
      req.cookies["next-auth.session-token"];

    let userId: mongoose.Types.ObjectId | null = null;
    let userWishlist: mongoose.Types.ObjectId[] = [];

    if (token) {
      try {
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as any;
        userId = new mongoose.Types.ObjectId(decodedToken._id);
        const user = await User.findById(userId).select("wishlist");
        if (user && user.wishlist) {
          userWishlist = user.wishlist.map(
            (id: any) => new mongoose.Types.ObjectId(id)
          );
        }
      } catch (err) {}
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const searchQuery: any = {};

    if (req.query.search) {
      searchQuery.productName = {
        $regex: new RegExp(req.query.search as string, "i"),
      };
    }

    if (req.query.category) {
      searchQuery.category = req.query.category;
    }

    if (req.query.maxPrice) {
      const variants = await ProductVariant.find({
        price: { $lte: req.query.maxPrice },
      });
      const productIds = variants.map((variant) => variant.product);
      searchQuery._id = { $in: productIds };
    }

    const totalProducts = await Product.countDocuments(searchQuery);

    let products = await Product.aggregate([
      { $match: searchQuery },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "variants",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating" },
        },
      },
    ]);

    // Explicitly check if the product is liked by the user and if it's in their wishlist
    products = products.map((product) => {
      if (userId) {
        product.isLiked = userWishlist.some((id: mongoose.Types.ObjectId) => {
          return id.equals(product._id);
        });
      } else {
        product.isLiked = false;
      }
      return product;
    });

    res.status(200).json({
      success: true,
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  }
);

export const getAllWishlistItems = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = req.user;
    const user = await User.findById(userId).populate("wishlist");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, wishlist: user.wishlist });
  }
);

export const toggleWishlistProduct = catchAsyncError(
  async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const userId = req.user._id;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const wishlistIndex = user.wishlist.indexOf(productId as any);
    const likedByIndex = product.likedBy.indexOf(userId as any);

    if (wishlistIndex === -1 && likedByIndex === -1) {
      user.wishlist.push(productId as any);
      product.likedBy.push(userId as any);
    } else {
      user.wishlist.splice(wishlistIndex, 1);
      product.likedBy.splice(likedByIndex, 1);
    }

    await user.save();
    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Wishlist updated successfully" });
  }
);

export const getCategoryItemCounts = catchAsyncError(
  async (req: Request, res: Response) =>{
    try {
      const healthcare = await Product.countDocuments({ category: "healthcare" });
      const mens = await Product.countDocuments({ category: "mens" });
      const skincare = await Product.countDocuments({ category: "skincare" });
      const hairCare = await Product.countDocuments({ category: "hairCare" });
      res.status(200).json({
        success: true,
        data: { healthcare, mens, skincare, hairCare },
      });
    } catch (error) {
      console.error("Error fetching category item count:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);
