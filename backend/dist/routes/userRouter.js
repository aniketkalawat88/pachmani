"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userController_1 = require("../controllers/userController");
const JWTtoken_1 = __importDefault(require("../middlewares/JWTtoken"));
router.post("/login", userController_1.login);
router.post("/sign-up", userController_1.signup);
router.post("/", JWTtoken_1.default, userController_1.LoginUser);
router.post("/verify-otp", userController_1.verifyOtp);
router.get("/logout", JWTtoken_1.default, userController_1.logout);
router.patch("/profile", JWTtoken_1.default, userController_1.updateProfile);
router.post("/request-otp", userController_1.requestOTP);
router.post("/verify-otPassword", userController_1.verifyOTPassword);
exports.default = router;
