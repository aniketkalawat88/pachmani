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
exports.getCategoryItemCounts = exports.toggleWishlistProduct = exports.getAllWishlistItems = exports.getAllProducts = exports.deleteProductVariant = exports.getProductReviews = exports.postReview = exports.createProductVariant = exports.deleteProduct = exports.updateProduct = exports.updateProductVariant = exports.getProductById = exports.createProduct = void 0;
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const productModel_1 = __importDefault(require("../models/productModel"));
const productVariant_1 = __importDefault(require("../models/productVariant"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const userModel_1 = __importDefault(require("../models/userModel"));
cloudinary_1.v2.config({
    cloud_name: "draw7t9sz",
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
});
const calculatePriceAfterDiscount = (price, discount) => {
    return price - (price * discount) / 100;
};
exports.createProduct = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { productData, variantData } = req.body;
    productData = JSON.parse(productData);
    variantData = JSON.parse(variantData);
    if (req.files && req.files.heroImage) {
        const heroImage = Array.isArray(req.files.heroImage)
            ? req.files.heroImage[0]
            : req.files.heroImage;
        const modifiedName = `ecommerce-${Date.now()}${path_1.default.extname(heroImage.name)}`;
        const heroImageUpload = yield cloudinary_1.v2.uploader.upload(heroImage.tempFilePath, {
            folder: "hero_images",
            public_id: modifiedName,
        });
        productData.thumbnail = {
            fileId: heroImageUpload.public_id,
            url: heroImageUpload.secure_url,
        };
    }
    if (req.files) {
        const detailedImageKeys = Object.keys(req.files).filter((key) => key.startsWith("detailedImage"));
        if (detailedImageKeys.length > 0) {
            const imageUrls = [];
            for (const key of detailedImageKeys) {
                const image = Array.isArray(req.files[key])
                    ? req.files[key][0]
                    : req.files[key];
                const modifiedName = `ecommerce-${Date.now()}${path_1.default.extname(image.name)}`;
                const imageUpload = yield cloudinary_1.v2.uploader.upload(image.tempFilePath, {
                    folder: "detailed_images",
                    public_id: modifiedName,
                });
                imageUrls.push({
                    fileId: imageUpload.public_id,
                    url: imageUpload.secure_url,
                });
            }
            productData.images = imageUrls;
        }
    }
    const product = yield productModel_1.default.create(productData);
    const newVariants = yield Promise.all(variantData.map((data) => __awaiter(void 0, void 0, void 0, function* () {
        data.product = product._id;
        const newVariant = yield productVariant_1.default.create(data);
        newVariant.priceAfterDiscount = calculatePriceAfterDiscount(data.price, data.discount);
        return yield newVariant.save();
    })));
    product.variants = newVariants.map((variant) => variant._id);
    yield product.save();
    res.status(201).json({ success: true, product });
}));
exports.getProductById = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = new ObjectId(req.params.productId);
    // const userId = req.user ? new ObjectId(req.user._id) : null;
    const product = yield productModel_1.default.findById(productId)
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
}));
exports.updateProductVariant = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const variantId = req.params.variantId;
    const variantData = req.body; // Partial<IProductVariant> to allow updating only specific fields
    const updatedVariant = yield productVariant_1.default.findByIdAndUpdate(variantId, variantData, { new: true });
    if (!updatedVariant) {
        return res
            .status(404)
            .json({ success: false, message: "Product variant not found" });
    }
    updatedVariant.priceAfterDiscount = calculatePriceAfterDiscount(updatedVariant.price, (_a = updatedVariant.discount) !== null && _a !== void 0 ? _a : 0);
    yield updatedVariant.save();
    res.status(200).json({ success: true, variant: updatedVariant });
}));
exports.updateProduct = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
}));
exports.deleteProduct = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findByIdAndDelete(req.params.productId);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }
    res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
}));
exports.createProductVariant = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const variantData = req.body;
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }
    const newVariant = new productVariant_1.default(Object.assign(Object.assign({}, variantData), { product: productId }));
    newVariant.priceAfterDiscount = calculatePriceAfterDiscount(newVariant.price, newVariant.discount || 0);
    yield newVariant.save();
    product.variants.push(newVariant.id);
    yield product.save();
    res.status(201).json({ success: true, variant: newVariant });
}));
exports.postReview = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const { text, rating } = req.body;
    // Find the product
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }
    // Create review object
    const review = {
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
            const modifiedName = `ecommerce-${Date.now()}${path_1.default.extname(image.name)}`;
            // Upload each image to cloudinary
            const imageUpload = yield cloudinary_1.v2.uploader.upload(image.tempFilePath, {
                folder: "review_images",
                public_id: modifiedName,
            });
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
    yield product.save();
    res
        .status(201)
        .json({ success: true, message: "Review posted successfully" });
}));
exports.getProductReviews = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, reviews: product.reviews });
}));
exports.deleteProductVariant = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, variantId } = req.params;
    if (!ObjectId.isValid(productId) || !ObjectId.isValid(variantId)) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid product or variant ID" });
    }
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }
    const variantIndex = product.variants.indexOf(variantId);
    if (variantIndex === -1) {
        return res
            .status(404)
            .json({ success: false, message: "Variant not found in product" });
    }
    product.variants.splice(variantIndex, 1);
    yield product.save();
    const variant = yield productVariant_1.default.findByIdAndDelete(variantId);
    if (!variant) {
        return res
            .status(404)
            .json({ success: false, message: "Variant not found" });
    }
    res
        .status(200)
        .json({ success: true, message: "Variant removed successfully" });
}));
exports.getAllProducts = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token ||
        req.headers.token ||
        req.cookies["next-auth.session-token"];
    let userId = null;
    let userWishlist = [];
    if (token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            userId = new mongoose_1.default.Types.ObjectId(decodedToken._id);
            const user = yield userModel_1.default.findById(userId).select("wishlist");
            if (user && user.wishlist) {
                userWishlist = user.wishlist.map((id) => new mongoose_1.default.Types.ObjectId(id));
            }
        }
        catch (err) { }
    }
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const searchQuery = {};
    if (req.query.search) {
        searchQuery.productName = {
            $regex: new RegExp(req.query.search, "i"),
        };
    }
    if (req.query.category) {
        searchQuery.category = req.query.category;
    }
    if (req.query.maxPrice) {
        const variants = yield productVariant_1.default.find({
            price: { $lte: req.query.maxPrice },
        });
        const productIds = variants.map((variant) => variant.product);
        searchQuery._id = { $in: productIds };
    }
    const totalProducts = yield productModel_1.default.countDocuments(searchQuery);
    let products = yield productModel_1.default.aggregate([
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
            product.isLiked = userWishlist.some((id) => {
                return id.equals(product._id);
            });
        }
        else {
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
}));
exports.getAllWishlistItems = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const user = yield userModel_1.default.findById(userId).populate("wishlist");
    if (!user) {
        return res
            .status(404)
            .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, wishlist: user.wishlist });
}));
exports.toggleWishlistProduct = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const userId = req.user._id;
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "Product not found" });
    }
    const user = yield userModel_1.default.findById(userId);
    if (!user) {
        return res
            .status(404)
            .json({ success: false, message: "User not found" });
    }
    const wishlistIndex = user.wishlist.indexOf(productId);
    const likedByIndex = product.likedBy.indexOf(userId);
    if (wishlistIndex === -1 && likedByIndex === -1) {
        user.wishlist.push(productId);
        product.likedBy.push(userId);
    }
    else {
        user.wishlist.splice(wishlistIndex, 1);
        product.likedBy.splice(likedByIndex, 1);
    }
    yield user.save();
    yield product.save();
    res
        .status(200)
        .json({ success: true, message: "Wishlist updated successfully" });
}));
exports.getCategoryItemCounts = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const healthcare = yield productModel_1.default.countDocuments({ category: "healthcare" });
        const mens = yield productModel_1.default.countDocuments({ category: "mens" });
        const skincare = yield productModel_1.default.countDocuments({ category: "skincare" });
        const hairCare = yield productModel_1.default.countDocuments({ category: "hairCare" });
        res.status(200).json({
            success: true,
            data: { healthcare, mens, skincare, hairCare },
        });
    }
    catch (error) {
        console.error("Error fetching category item count:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}));
