import { Router } from "express";
const router = Router();
import  isAdmin  from "../middlewares/adminJwt";
import { getDashboardStats, getDashboardTotal, getOrdersByFilter, getOrderStatusLast7Days, getStats, getTopProducts, users } from "../controllers/adminControllers";

router.get("/users", isAdmin, users);
router.get("/top-products", getTopProducts);
router.get("/order-status-last-7-days", getOrderStatusLast7Days);
router.get("/info", getDashboardStats);
router.get("/orders/filter", getDashboardStats);

export default router;
