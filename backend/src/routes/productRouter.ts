import { Router } from "express";
const router = Router();
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductVariant,
  postReview,
  getProductReviews,
  toggleWishlistProduct,
  getAllWishlistItems,
  createProductVariant,
  deleteProductVariant,
  getCategoryItemCounts,
} from "../controllers/productController";
import isAdmin from "../middlewares/adminJwt";
import authenticateToken from "../middlewares/JWTtoken";

router.post("/", isAdmin, createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.patch("/variant/:variantId", isAdmin, updateProductVariant);
router.patch("/:productId", isAdmin, updateProduct);
router.delete("/:productId", isAdmin, deleteProduct);
router.post("/review/:productId", authenticateToken, postReview);
router.get("/review/:productId", authenticateToken, getProductReviews);
router.post("/wishlist", authenticateToken, getAllWishlistItems);
router.post("/wishlist/:productId", authenticateToken, toggleWishlistProduct);
router.post('/category-item-counts', getCategoryItemCounts);

// router.post("varian/:productId", createProductVariant);
export default router;
