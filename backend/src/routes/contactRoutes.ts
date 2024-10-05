import { Router } from "express";
const router = Router();

import {
  createContactUs,
  getAllContactUsMessages,
  deleteContactUsMessage
} from "../controllers/contactController";
import authenticateToken from "../middlewares/JWTtoken";

// Routes for ContactUs
router.post("/", createContactUs);
router.get("/", authenticateToken, getAllContactUsMessages);
router.delete("/:id", authenticateToken, deleteContactUsMessage);

export default router;
