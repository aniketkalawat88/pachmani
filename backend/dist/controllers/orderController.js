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
exports.verifyDirectPurchasePayment = exports.directPurchase = exports.paymentVerification = exports.checkout = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = exports.instance = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const cardModel_1 = __importDefault(require("../models/cardModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const ErrorHandler_1 = __importDefault(require("../middlewares/ErrorHandler"));
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const productModel_1 = __importDefault(require("../models/productModel"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const productVariant_1 = __importDefault(require("../models/productVariant"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const axios = require("axios");
const DELIVERY_CHARGE = 100;
(0, axios_retry_1.default)(axios, {
    retries: 3,
    retryDelay: (retryCount, error) => {
        return retryCount * 1000;
    },
});
exports.instance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});
exports.createOrder = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.user._id;
    const cartItems = yield cardModel_1.default.find({ user: userId })
        .populate("variant")
        .populate("product");
    if (cartItems.length === 0) {
        throw new ErrorHandler_1.default("No items found in the cart.", 400);
    }
    // Calculate total price of the order
    let totalPrice = 0;
    for (const cartItem of cartItems) {
        const product = yield productModel_1.default.findById(cartItem.product).populate("variants");
        if (!product) {
            throw new ErrorHandler_1.default("Product not found.", 404);
        }
        const variant = product.variants.find((v) => String(v._id) === String(cartItem.variant._id));
        if (!variant) {
            throw new ErrorHandler_1.default("Variant not found.", 404);
        }
        totalPrice += variant.price * cartItem.quantity;
        variant.stock -= cartItem.quantity;
        yield variant.save();
    }
    // Create order
    const order = new orderModel_1.default({
        user: userId,
        items: cartItems.map((item) => ({
            product: item.product,
            variant: item.variant,
            quantity: item.quantity,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        totalPrice,
        status: "pending",
        paymentStatus: "unpaid",
    });
    // Save order
    yield order.save();
    // Delete cart items
    for (const cartItem of cartItems) {
        yield cardModel_1.default.findByIdAndDelete(cartItem._id);
    }
    const user = yield userModel_1.default.findById(userId);
    if (user) {
        (_a = user.orders) === null || _a === void 0 ? void 0 : _a.push(order === null || order === void 0 ? void 0 : order.id);
        user.save();
    }
    res
        .status(201)
        .json({ success: true, message: "Order created successfully." });
}));
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, username, startDate, endDate, id, } = req.query;
        const filters = {};
        const pageNumber = typeof page === "string" ? parseInt(page, 10) : page;
        const limitNumber = typeof limit === "string" ? parseInt(limit, 10) : limit;
        // Handle order ID search
        if (id) {
            filters._id = id;
        }
        // Handle username search
        if (username) {
            const searchRegex = new RegExp(username, "i");
            const users = yield userModel_1.default.find({ username: searchRegex }).select("_id");
            const userIds = users.map((user) => user._id);
            if (userIds.length > 0) {
                filters.user = { $in: userIds };
            }
            else {
                // If no users found, ensure no orders are returned
                filters.user = { $in: [] };
            }
        }
        // Handle date filtering
        if (startDate || endDate) {
            filters.createdAt = {};
            // Helper function to parse MM/dd/yyyy to YYYY-MM-DD format
            const parseDate = (dateStr) => {
                const [month, day, year] = dateStr.split("/").map(Number);
                return new Date(`${year}-${month.toString().padStart(2, "0")}-${day
                    .toString()
                    .padStart(2, "0")}T00:00:00Z`);
            };
            if (startDate) {
                filters.createdAt.$gte = parseDate(startDate);
            }
            if (endDate) {
                filters.createdAt.$lte = parseDate(endDate);
            }
            console.log("Filters for Dates:", filters.createdAt); // Log date filters
        }
        console.log("Final Filters:", filters); // Log final filters
        const orders = yield orderModel_1.default.find(filters)
            .populate({
            path: "user", // Populate user field
            select: "username email", // Fields to include from User model
        })
            .populate({
            path: "items.product",
            model: "Product",
        })
            .populate({
            path: "items.variant",
            model: "ProductVariant",
        })
            .sort({ _id: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        console.log("Orders found:", orders.length); // Log number of orders found
        const totalOrders = yield orderModel_1.default.countDocuments(filters);
        res.status(200).json({
            totalOrders,
            totalPages: Math.ceil(totalOrders / limitNumber),
            currentPage: pageNumber,
            orders,
        });
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield orderModel_1.default.findById(orderId).populate("items.product");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrderById = getOrderById;
exports.updateOrder = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, paymentStatus, orderId } = req.body;
    const updatedOrder = yield orderModel_1.default.findByIdAndUpdate(orderId, { status, paymentStatus }, { new: true }).populate("user");
    if (!updatedOrder) {
        return res
            .status(404)
            .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order: updatedOrder });
    /* TODO */
    // req.body.email = updatedOrder.user.email;
    // sendmail(req, res, next, generateBill(updatedOrder.user));
}));
exports.checkout = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    const order = yield exports.instance.orders.create(options);
    res.status(200).json({
        success: true,
        order,
    });
}));
exports.paymentVerification = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto_1.default
        .createHmac("sha256", "dy3eb94FbZCwHfoR8Bu8nwPG")
        .update(body.toString())
        .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        const userId = req.user._id;
        const cartItems = yield cardModel_1.default.find({ user: userId })
            .populate("variant")
            .populate("product");
        if (cartItems.length === 0) {
            throw new ErrorHandler_1.default("No items found in the cart.", 400);
        }
        const user = yield userModel_1.default.findById(userId);
        const shippingAddressIndex = parseInt(req.params.shippingAddressIndex, 10);
        if (!user) {
            throw new ErrorHandler_1.default("User not found.", 404);
        }
        if (!user.addresses ||
            shippingAddressIndex < 0 ||
            shippingAddressIndex >= user.addresses.length) {
            throw new ErrorHandler_1.default("Invalid shipping address index.", 400);
        }
        const address = user.addresses[shippingAddressIndex];
        const delivery = 100;
        let totalPrice = 0 + delivery;
        for (const cartItem of cartItems) {
            const product = yield productModel_1.default.findById(cartItem.product).populate("variants");
            if (!product) {
                throw new ErrorHandler_1.default("Product not found.", 404);
            }
            const variant = product.variants.find((v) => String(v._id) === String(cartItem.variant._id));
            if (!variant) {
                throw new ErrorHandler_1.default("Variant not found.", 404);
            }
            totalPrice +=
                (_b = variant.priceAfterDiscount) !== null && _b !== void 0 ? _b : variant.price * cartItem.quantity;
            variant.stock -= cartItem.quantity;
            yield variant.save();
        }
        // Create order
        const order = new orderModel_1.default({
            user: userId,
            items: cartItems.map((item) => ({
                product: item.product,
                variant: item.variant,
                quantity: item.quantity,
            })),
            shippingAddress: address,
            paymentMethod: "online",
            totalPrice,
            status: "pending",
            paymentStatus: "paid",
        });
        yield order.save();
        // Delete cart items
        for (const cartItem of cartItems) {
            yield cardModel_1.default.findByIdAndDelete(cartItem._id);
        }
        if (user.orders) {
            user.orders.push(order.id);
        }
        else {
            user.orders = [order.id];
        }
        yield user.save();
        res.redirect(`${process.env.FRONTEND_URL}/order-detail/`);
    }
    else {
        res.status(400).send({ message: "Payment failed" });
    }
}));
exports.directPurchase = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { productId, variantId, quantity, shippingAddress, paymentMethod } = req.body;
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        throw new ErrorHandler_1.default("Product not found.", 404);
    }
    const variant = yield productVariant_1.default.findById(variantId);
    if (!variant) {
        throw new ErrorHandler_1.default("Product variant not found.", 404);
    }
    if (variant.stock < quantity) {
        throw new ErrorHandler_1.default("Insufficient stock.", 400);
    }
    const totalPrice = ((_c = variant.priceAfterDiscount) !== null && _c !== void 0 ? _c : variant.price) * quantity +
        DELIVERY_CHARGE;
    const razorpayOptions = {
        amount: totalPrice * 100, // Amount in paise (INR)
        currency: "INR",
        receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
    };
    const razorpayOrder = yield exports.instance.orders.create(razorpayOptions);
    res.status(201).json({
        success: true,
        message: "Payment initiation successful.",
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
    });
}));
exports.verifyDirectPurchasePayment = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    const { razorpay_order_id: razorpayOrderId, razorpay_payment_id: razorpayPaymentId, razorpay_signature: razorpaySignature, } = req.body;
    const { productId, variantId, quantity, shippingAddress, amount } = req.query;
    if (!razorpayOrderId ||
        !razorpayPaymentId ||
        !razorpaySignature ||
        !productId ||
        !variantId ||
        !quantity ||
        !shippingAddress) {
        console.error("Missing required fields in the request body:", {
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
            productId,
            variantId,
            quantity,
            shippingAddress,
        });
        return res.status(400).json({
            success: false,
            message: "Missing required fields in the request body.",
        });
    }
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto_1.default
        .createHmac("sha256", "dy3eb94FbZCwHfoR8Bu8nwPG")
        .update(body.toString())
        .digest("hex");
    const isAuthentic = expectedSignature === razorpaySignature;
    if (isAuthentic) {
        const product = yield productModel_1.default.findById(productId);
        if (!product) {
            throw new ErrorHandler_1.default("Product not found.", 404);
        }
        const variant = yield productVariant_1.default.findById(variantId);
        if (!variant) {
            throw new ErrorHandler_1.default("Product variant not found.", 404);
        }
        if (variant.stock < Number(quantity)) {
            throw new ErrorHandler_1.default("Insufficient stock.", 400);
        }
        const totalPrice = ((_e = variant.priceAfterDiscount) !== null && _e !== void 0 ? _e : variant.price) * Number(quantity) +
            DELIVERY_CHARGE;
        const order = new orderModel_1.default({
            user: userId,
            items: [
                {
                    product: productId,
                    variant: variantId,
                    quantity: Number(quantity),
                },
            ],
            shippingAddress: JSON.parse(shippingAddress),
            paymentMethod: "Razorpay",
            totalPrice,
            status: "processing",
            paymentStatus: "paid",
        });
        variant.stock -= Number(quantity);
        yield variant.save();
        yield order.save();
        const user = yield userModel_1.default.findById(userId);
        if (user) {
            (_f = user.orders) === null || _f === void 0 ? void 0 : _f.push(order.id);
            yield user.save();
        }
        res.redirect(302, `${process.env.FRONTEND_URL}/order-detail`);
        // res.status(200).json({ success: true, message: "Payment verified successfully.", order });
    }
    else {
        console.error("Payment verification failed. Expected signature:", expectedSignature, "Actual signature:", razorpaySignature);
        res
            .status(400)
            .json({ success: false, message: "Payment verification failed." });
    }
}));
