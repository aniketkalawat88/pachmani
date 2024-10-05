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
// routes/faq.routes.ts
const express_1 = __importDefault(require("express"));
const faqmodel_1 = __importDefault(require("../models/faqmodel"));
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const router = express_1.default.Router();
router.post("/", (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, answer } = req.body;
    const newFAQ = yield faqmodel_1.default.create({ question, answer });
    const savedFAQ = yield newFAQ.save();
    res.status(201).json(savedFAQ);
})));
router.get("/", (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faqs = yield faqmodel_1.default.find();
    res.json(faqs);
})));
router.patch("/:id", (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { question, answer } = req.body;
    const updatedFAQ = yield faqmodel_1.default.findByIdAndUpdate(id, { question, answer }, { new: true });
    if (!updatedFAQ) {
        throw new Error("FAQ not found");
    }
    res.json(updatedFAQ);
})));
router.delete("/:id", (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedFAQ = yield faqmodel_1.default.findByIdAndDelete(id);
    if (!deletedFAQ) {
        throw new Error("FAQ not found");
    }
    res.json({ message: "FAQ deleted" });
})));
exports.default = router;
