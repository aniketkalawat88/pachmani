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
exports.deleteContactUsMessage = exports.getAllContactUsMessages = exports.createContactUs = void 0;
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const contactModel_1 = __importDefault(require("../models/contactModel"));
const ErrorHandler_1 = __importDefault(require("../middlewares/ErrorHandler"));
exports.createContactUs = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, phoneNumber, message } = req.body;
    if (!email || !name || !phoneNumber || !message) {
        return next(new ErrorHandler_1.default("All fields are required.", 400));
    }
    const newContactUs = new contactModel_1.default({
        email,
        name,
        phoneNumber,
        message,
    });
    yield newContactUs.save();
    res
        .status(201)
        .json({ success: true, message: "Message sent successfully" });
}));
exports.getAllContactUsMessages = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contactUsMessages = yield contactModel_1.default.find();
    res.status(200).json({ success: true, contactUsMessages });
}));
exports.deleteContactUsMessage = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const contactUsMessage = yield contactModel_1.default.findById(id);
    if (!contactUsMessage) {
        return next(new ErrorHandler_1.default("Message not found.", 404));
    }
    yield contactModel_1.default.findByIdAndDelete(id);
    res
        .status(200)
        .json({ success: true, message: "Message deleted successfully" });
}));
