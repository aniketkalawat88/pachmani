"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carouselSchema = new mongoose_1.Schema({
    desktopFileId: {
        type: String,
        required: true,
    },
    desktopUrl: {
        type: String,
        required: true,
    },
    mobileFileId: {
        type: String,
        required: true,
    },
    mobileUrl: {
        type: String,
        required: true,
    },
});
const pageSchema = new mongoose_1.Schema({
    pageName: {
        type: String,
        required: true,
        unique: true,
    },
    carousels: [carouselSchema],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Page", pageSchema);
