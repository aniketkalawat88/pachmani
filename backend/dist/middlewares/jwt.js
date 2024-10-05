"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token ||
        req.headers.authorization ||
        req.cookies["next-auth.session-token"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decodedToken;
        next();
    });
};
exports.default = authenticateToken;
