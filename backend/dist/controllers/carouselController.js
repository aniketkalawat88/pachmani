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
exports.deletePage = exports.updatePage = exports.createPage = exports.getPageByName = exports.getAllPages = void 0;
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const carouselModel_1 = __importDefault(require("../models/carouselModel"));
exports.getAllPages = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pages = yield carouselModel_1.default.find();
    res.status(200).json({ success: true, pages });
}));
exports.getPageByName = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pageName = req.params.name;
    const page = yield carouselModel_1.default.findOne({ pageName });
    if (!page) {
        return res
            .status(404)
            .json({ success: false, message: "getPageByName not found" });
    }
    res.status(200).json({ success: true, page });
}));
exports.createPage = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageName, carousels } = req.body;
    const newPage = new carouselModel_1.default({ pageName, carousels });
    yield newPage.save();
    res.status(201).json({ success: true, page: newPage });
}));
exports.updatePage = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageName, carousels } = req.body;
    let page = yield carouselModel_1.default.findOne({ pageName });
    if (!page) {
        return res
            .status(404)
            .json({ success: false, message: "Page not found" });
    }
    page.pageName = pageName;
    page.carousels = carousels;
    yield page.save();
    res.status(200).json({ success: true, page });
}));
exports.deletePage = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield carouselModel_1.default.findByIdAndDelete(req.params.id);
    if (!page) {
        return res
            .status(404)
            .json({ success: false, message: "Page not found" });
    }
    res
        .status(200)
        .json({ success: true, message: "Page deleted successfully" });
}));
