"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const contactController_1 = require("../controllers/contactController");
const JWTtoken_1 = __importDefault(require("../middlewares/JWTtoken"));
// Routes for ContactUs
router.post("/", contactController_1.createContactUs);
router.get("/", JWTtoken_1.default, contactController_1.getAllContactUsMessages);
router.delete("/:id", JWTtoken_1.default, contactController_1.deleteContactUsMessage);
exports.default = router;
