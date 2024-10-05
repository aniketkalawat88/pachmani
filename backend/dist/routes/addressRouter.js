"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// addressRouter.ts
const express_1 = __importDefault(require("express"));
const addressController_1 = require("../controllers/addressController");
const JWTtoken_1 = __importDefault(require("../middlewares/JWTtoken"));
const router = express_1.default.Router();
router.post("/", JWTtoken_1.default, addressController_1.addAddress);
router.put("/", JWTtoken_1.default, addressController_1.updateAddress);
router.delete("/:addressIndex", JWTtoken_1.default, addressController_1.deleteAddress);
router.get("/", JWTtoken_1.default, addressController_1.viewAddresses);
exports.default = router;
