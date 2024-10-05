"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const dbconnection_1 = require("./models/dbconnection");
const ErrorHandler_1 = __importDefault(require("./middlewares/ErrorHandler"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const orderRouter_1 = __importDefault(require("./routes/orderRouter"));
const addressRouter_1 = __importDefault(require("./routes/addressRouter"));
const carouselRouter_1 = __importDefault(require("./routes/carouselRouter"));
const addToCardRouter_1 = __importDefault(require("./routes/addToCardRouter"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const faqRouter_1 = __importDefault(require("./routes/faqRouter"));
const blogRouter_1 = __importDefault(require("./routes/blogRouter"));
const cors_1 = __importDefault(require("cors"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const imageUpload_1 = __importDefault(require("./routes/imageUpload"));
const productController_1 = require("./controllers/productController");
const adminJwt_1 = __importDefault(require("./middlewares/adminJwt"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
exports.io = io;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use((0, cookie_parser_1.default)());
(0, dbconnection_1.connectDB)();
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
// Middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Routes
app.use("/api/user", userRouter_1.default);
app.use("/api/user/address", addressRouter_1.default);
app.use("/api/order", orderRouter_1.default);
app.use("/api/cart", addToCardRouter_1.default);
app.use("/api/product", productRouter_1.default);
app.use("/api/admin", adminRouter_1.default);
app.use("/api/cloudinary", imageUpload_1.default);
app.use("/api/carousel", carouselRouter_1.default);
app.use("/api/contact", contactRoutes_1.default);
app.use("/api/blogs", blogRouter_1.default);
app.use("/api/faq", faqRouter_1.default);
app.post("/api/product/variant/:productId", adminJwt_1.default, productController_1.createProductVariant);
app.delete("/api/product/variant/:productId/:variantId", adminJwt_1.default, productController_1.deleteProductVariant);
app.use("*", (req, res, next) => {
    return next(new ErrorHandler_1.default("Page not found", 404));
});
app.use(errorMiddleware_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
