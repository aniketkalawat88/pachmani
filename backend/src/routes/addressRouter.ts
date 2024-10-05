// addressRouter.ts
import express from "express";
import {
  addAddress,
  viewAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController";
import  authenticateToken  from "../middlewares/JWTtoken";

const router = express.Router();

router.post("/", authenticateToken, addAddress);
router.put("/", authenticateToken, updateAddress);
router.delete("/:addressIndex", authenticateToken, deleteAddress);
router.get("/", authenticateToken, viewAddresses);

export default router;
