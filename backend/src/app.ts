import express, { response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { Server } from "socket.io";
import http from "http";

import { connectDB } from "./models/dbconnection";
import ErrorHandler from "./middlewares/ErrorHandler";

import userRouter from "./routes/userRouter";
import orderRouter from "./routes/orderRouter";
import addressRouter from "./routes/addressRouter";
import carouselRouter from "./routes/carouselRouter";
import cartRouter from "./routes/addToCardRouter";
import productRouter from "./routes/productRouter";
import faqRouter from "./routes/faqRouter";
import blogRouter from "./routes/blogRouter";


import cors from "cors";
import adminRouter from "./routes/adminRouter";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cloudinaryImage from "./routes/imageUpload";
import {
  createProductVariant,
  deleteProductVariant,
} from "./controllers/productController";
import isAdmin from "./middlewares/adminJwt";
import errorMiddleware from "./middlewares/errorMiddleware";
import contactRouter from "./routes/contactRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
export { io };

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
connectDB();

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/user/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cloudinary", cloudinaryImage);
app.use("/api/carousel", carouselRouter);
app.use("/api/contact", contactRouter);
app.use("/api/blogs",blogRouter)
app.use("/api/faq", faqRouter);
app.post("/api/product/variant/:productId", isAdmin, createProductVariant);

app.delete(
  "/api/product/variant/:productId/:variantId",
  isAdmin,
  deleteProductVariant
);

app.use("*", (req, res, next) => {
  return next(new ErrorHandler("Page not found", 404));
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
