import { NextFunction, Request, Response } from "express";
import Order from "../models/orderModel";
import CartItem from "../models/cardModel";
import User from "../models/userModel";
import ErrorHandler from "../middlewares/ErrorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import Product from "../models/productModel";
import retry from "axios-retry";
import ProductVariant from "../models/productVariant";
import Razorpay from "razorpay";
import crypto from "crypto";
const axios = require("axios");
const DELIVERY_CHARGE = 100;

interface CartItemRequest extends Request {
  user?: any;
}

retry(axios, {
  retries: 3,
  retryDelay: (retryCount, error) => {
    return retryCount * 1000;
  },
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY as string,
  key_secret: process.env.RAZORPAY_APT_SECRET as string,
});

export const createOrder = catchAsyncError(
  async (req: CartItemRequest, res: Response) => {
    const userId = req.user._id;
    const cartItems = await CartItem.find({ user: userId })
      .populate("variant")
      .populate("product");
    if (cartItems.length === 0) {
      throw new ErrorHandler("No items found in the cart.", 400);
    }

    // Calculate total price of the order
    let totalPrice = 0;
    for (const cartItem of cartItems) {
      const product = await Product.findById(cartItem.product).populate(
        "variants"
      );
      if (!product) {
        throw new ErrorHandler("Product not found.", 404);
      }
      const variant = product.variants.find(
        (v) => String(v._id) === String((cartItem.variant as any)._id)
      );
      if (!variant) {
        throw new ErrorHandler("Variant not found.", 404);
      }
      totalPrice += variant.price * cartItem.quantity;

      variant.stock -= cartItem.quantity;
      await variant.save();
    }

    // Create order
    const order = new Order({
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
    await order.save();

    // Delete cart items
    for (const cartItem of cartItems) {
      await CartItem.findByIdAndDelete(cartItem._id);
    }

    const user = await User.findById(userId);
    if (user) {
      user.orders?.push(order?.id);
      user.save();
    }
    res
      .status(201)
      .json({ success: true, message: "Order created successfully." });
  }
);

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      username,
      startDate,
      endDate,
      id,
    }: {
      page?: string | number;
      limit?: string | number;
      username?: string;
      startDate?: string;
      endDate?: string;
      id?: string;
    } = req.query;

    const filters: any = {};

    const pageNumber = typeof page === "string" ? parseInt(page, 10) : page;
    const limitNumber = typeof limit === "string" ? parseInt(limit, 10) : limit;

    // Handle order ID search
    if (id) {
      filters._id = id;
    }

    // Handle username search
    if (username) {
      const searchRegex = new RegExp(username, "i");
      const users = await User.find({ username: searchRegex }).select("_id");
      const userIds = users.map((user) => user._id);
      if (userIds.length > 0) {
        filters.user = { $in: userIds };
      } else {
        // If no users found, ensure no orders are returned
        filters.user = { $in: [] };
      }
    }

    // Handle date filtering
    if (startDate || endDate) {
      filters.createdAt = {};

      // Helper function to parse MM/dd/yyyy to YYYY-MM-DD format
      const parseDate = (dateStr: string) => {
        const [month, day, year] = dateStr.split("/").map(Number);
        return new Date(
          `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}T00:00:00Z`
        );
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

    const orders = await Order.find(filters)
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

    const totalOrders = await Order.countDocuments(filters);

    res.status(200).json({
      totalOrders,
      totalPages: Math.ceil(totalOrders / limitNumber),
      currentPage: pageNumber,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, paymentStatus, orderId } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status, paymentStatus },
      { new: true }
    ).populate("user");

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order: updatedOrder });
    /* TODO */
    // req.body.email = updatedOrder.user.email;
    // sendmail(req, res, next, generateBill(updatedOrder.user));
  }
);

export const checkout = catchAsyncError(async (req: Request, res: Response) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
});

export const paymentVerification = catchAsyncError(
  async (req: Request, res: Response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "dy3eb94FbZCwHfoR8Bu8nwPG")
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      const userId = req.user._id;
      const cartItems = await CartItem.find({ user: userId })
        .populate("variant")
        .populate("product");
      if (cartItems.length === 0) {
        throw new ErrorHandler("No items found in the cart.", 400);
      }
      const user = await User.findById(userId);
      const shippingAddressIndex: number = parseInt(
        req.params.shippingAddressIndex,
        10
      );
      if (!user) {
        throw new ErrorHandler("User not found.", 404);
      }
      if (
        !user.addresses ||
        shippingAddressIndex < 0 ||
        shippingAddressIndex >= user.addresses.length
      ) {
        throw new ErrorHandler("Invalid shipping address index.", 400);
      }
      const address = user.addresses[shippingAddressIndex];

      const delivery = 100;
      let totalPrice = 0 + delivery;
      for (const cartItem of cartItems) {
        const product = await Product.findById(cartItem.product).populate(
          "variants"
        );
        if (!product) {
          throw new ErrorHandler("Product not found.", 404);
        }
        const variant = product.variants.find(
          (v) => String(v._id) === String((cartItem.variant as any)._id)
        );
        if (!variant) {
          throw new ErrorHandler("Variant not found.", 404);
        }
        totalPrice +=
          variant.priceAfterDiscount ?? variant.price * cartItem.quantity;

        variant.stock -= cartItem.quantity;
        await variant.save();
      }

      // Create order
      const order = new Order({
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
      await order.save();
      // Delete cart items
      for (const cartItem of cartItems) {
        await CartItem.findByIdAndDelete(cartItem._id);
      }
      if (user.orders) {
        user.orders.push(order.id);
      } else {
        user.orders = [order.id];
      }
      await user.save();
      res.redirect(`${process.env.FRONTEND_URL}/order-detail/`);
    } else {
      res.status(400).send({ message: "Payment failed" });
    }
  }
);

export const directPurchase = catchAsyncError(
  async (req: Request, res: Response) => {
    const { productId, variantId, quantity, shippingAddress, paymentMethod } =
      req.body;

    const product = await Product.findById(productId);
    if (!product) {
      throw new ErrorHandler("Product not found.", 404);
    }

    const variant = await ProductVariant.findById(variantId);
    if (!variant) {
      throw new ErrorHandler("Product variant not found.", 404);
    }

    if (variant.stock < quantity) {
      throw new ErrorHandler("Insufficient stock.", 400);
    }

    const totalPrice =
      (variant.priceAfterDiscount ?? variant.price) * quantity +
      DELIVERY_CHARGE;

    const razorpayOptions = {
      amount: totalPrice * 100, // Amount in paise (INR)
      currency: "INR",
      receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
    };

    const razorpayOrder = await instance.orders.create(razorpayOptions);

    res.status(201).json({
      success: true,
      message: "Payment initiation successful.",
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  }
);

export const verifyDirectPurchasePayment = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const {
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    } = req.body;
    const { productId, variantId, quantity, shippingAddress, amount } =
      req.query;

    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !productId ||
      !variantId ||
      !quantity ||
      !shippingAddress
    ) {
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
    const expectedSignature = crypto
      .createHmac("sha256", "dy3eb94FbZCwHfoR8Bu8nwPG")
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpaySignature;

    if (isAuthentic) {
      const product = await Product.findById(productId as string);
      if (!product) {
        throw new ErrorHandler("Product not found.", 404);
      }

      const variant = await ProductVariant.findById(variantId as string);
      if (!variant) {
        throw new ErrorHandler("Product variant not found.", 404);
      }

      if (variant.stock < Number(quantity)) {
        throw new ErrorHandler("Insufficient stock.", 400);
      }

      const totalPrice =
        (variant.priceAfterDiscount ?? variant.price) * Number(quantity) +
        DELIVERY_CHARGE;

      const order = new Order({
        user: userId,
        items: [
          {
            product: productId,
            variant: variantId,
            quantity: Number(quantity),
          },
        ],
        shippingAddress: JSON.parse(shippingAddress as string),
        paymentMethod: "Razorpay",
        totalPrice,
        status: "processing",
        paymentStatus: "paid",
      });

      variant.stock -= Number(quantity);
      await variant.save();
      await order.save();

      const user = await User.findById(userId);
      if (user) {
        user.orders?.push(order.id);
        await user.save();
      }
      res.redirect(302, `${process.env.FRONTEND_URL}/order-detail`);
      // res.status(200).json({ success: true, message: "Payment verified successfully.", order });
    } else {
      console.error(
        "Payment verification failed. Expected signature:",
        expectedSignature,
        "Actual signature:",
        razorpaySignature
      );
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed." });
    }
  }
);
