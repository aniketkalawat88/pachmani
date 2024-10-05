"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const addToCardControllers_1 = require("../controllers/addToCardControllers");
const JWTtoken_1 = __importDefault(require("../middlewares/JWTtoken"));
router.get("/", JWTtoken_1.default, addToCardControllers_1.getAllCartItems);
router.post("/add", JWTtoken_1.default, addToCardControllers_1.addItemToCart);
router.delete("/remove/:itemId", JWTtoken_1.default, addToCardControllers_1.removeItemFromCart);
router.patch("/update", JWTtoken_1.default, addToCardControllers_1.updateCart);
exports.default = router;
