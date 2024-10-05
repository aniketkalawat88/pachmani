"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByFilter = exports.getDashboardStats = exports.getDashboardTotal = exports.getStats = exports.getOrderStatusLast7Days = exports.getTopProducts = exports.users = void 0;
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const date_fns_1 = require("date-fns");
exports.users = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find({});
    res.status(200).json({ users });
}));
function getTopProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield orderModel_1.default.aggregate([
                { $unwind: "$items" },
                { $group: { _id: "$items.product", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 },
            ]);
            const productIds = result.map((item) => item._id);
            const topProducts = yield productModel_1.default.find({ _id: { $in: productIds } });
            res.json(topProducts);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error fetching top products", error: error.message });
        }
    });
}
exports.getTopProducts = getTopProducts;
function getOrderStatusLast7Days(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const today = new Date();
            const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
            lastWeek.setHours(0, 0, 0, 0);
            const result = yield orderModel_1.default.aggregate([
                {
                    $match: {
                        createdAt: { $gte: lastWeek, $lt: today }, // Filter orders in the last 7 days
                    },
                },
                {
                    $group: {
                        _id: {
                            day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
                            dayNumber: { $dayOfWeek: "$createdAt" }, // Get the day of the week
                        },
                        statusCounts: { $addToSet: "$status" }, // Count distinct statuses per day
                    },
                },
            ]);
            const orderStatusLast7Days = result.map((item) => ({
                date: item._id.day,
                day: `Day ${item._id.dayNumber}`,
                orderCount: item.statusCounts.length,
                statusCounts: item.statusCounts,
            }));
            res.json(orderStatusLast7Days);
        }
        catch (error) {
            res.status(500).json({
                message: "Error fetching order status for the last 7 days",
                error: error.message,
            });
        }
    });
}
exports.getOrderStatusLast7Days = getOrderStatusLast7Days;
function getStats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const totalUsers = yield userModel_1.default.countDocuments();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newUsers = yield userModel_1.default.countDocuments({
            createdAt: { $gte: thirtyDaysAgo },
        });
        const totalOrders = yield orderModel_1.default.countDocuments();
        const newOrders = yield orderModel_1.default.countDocuments({
            createdAt: { $gte: thirtyDaysAgo },
        });
        const totalProducts = yield productModel_1.default.countDocuments();
        const newProducts = yield productModel_1.default.countDocuments({
            createdAt: { $gte: thirtyDaysAgo },
        });
        res.json({
            users: { total: totalUsers, new: newUsers },
            orders: { total: totalOrders, new: newOrders },
            products: { total: totalProducts, new: newProducts },
        });
    });
}
exports.getStats = getStats;
exports.getDashboardTotal = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const filter = req.query.filter; // Ensure filter is treated as string or undefined
    console.log(filter, ":filter");
    const daysAgo = (days) => new Date(new Date().setDate(today.getDate() - days));
    const getQuarterStart = (date) => new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1);
    const getDateRanges = (filter) => {
        switch (filter) {
            case 'yearly':
                return {
                    start: new Date(today.getFullYear(), 0, 1),
                    end: new Date(today.getFullYear() + 1, 0, 1),
                };
            case 'quarterly':
                const quarterStart = getQuarterStart(today);
                return {
                    start: quarterStart,
                    end: new Date(quarterStart.getFullYear(), quarterStart.getMonth() + 3, 1),
                };
            case 'monthly':
                return {
                    start: new Date(today.getFullYear(), today.getMonth(), 1),
                    end: new Date(today.getFullYear(), today.getMonth() + 1, 1),
                };
            case 'weekly':
                return { start: daysAgo(7), end: today };
            case 'daily':
                return { start: new Date(today.getFullYear(), today.getMonth(), today.getDate()), end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) };
            case 'all-time':
                return { start: new Date(0), end: today }; // All-time range
            default:
                return { start: daysAgo(7), end: today }; // Default to last 7 days
        }
    };
    const { start, end } = getDateRanges(filter || 'default'); // Use a default value if filter is undefined
    const getActivityCount = (model) => __awaiter(void 0, void 0, void 0, function* () {
        return model.countDocuments({
            createdAt: {
                $gte: start,
                $lt: end,
            },
        });
    });
    const getTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderModel_1.default.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: start,
                        $lt: end,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" },
                },
            },
        ]);
        return result[0] ? result[0].totalRevenue : 0;
    });
    const totalUsers = yield getActivityCount(userModel_1.default);
    const totalOrders = yield getActivityCount(orderModel_1.default);
    const totalProducts = yield productModel_1.default.countDocuments(); // Assuming product count is not date-specific
    const totalRevenue = yield getTotalRevenue();
    res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue,
            dateRange: { start, end },
        },
    });
}));
exports.getDashboardStats = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const daysAgo = (days) => new Date(new Date().setDate(today.getDate() - days));
    // Helper function with proper TypeScript annotations
    const getRecentActivity = (model, days) => __awaiter(void 0, void 0, void 0, function* () {
        return Promise.all(Array.from({ length: days }, (_, i) => i).map((day) => __awaiter(void 0, void 0, void 0, function* () {
            const count = yield model.countDocuments({
                createdAt: {
                    $gte: daysAgo(day + 1),
                    $lt: daysAgo(day)
                }
            });
            return {
                name: daysAgo(day).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' }),
                count,
            };
        })));
    });
    const totalUsers = yield userModel_1.default.countDocuments();
    const totalOrders = yield orderModel_1.default.countDocuments();
    const totalProducts = yield productModel_1.default.countDocuments();
    const totalRevenueResult = yield orderModel_1.default.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
    ]);
    const totalRevenue = totalRevenueResult[0] ? totalRevenueResult[0].totalRevenue : 0;
    const recentUsers = yield getRecentActivity(userModel_1.default, 7);
    const recentOrders = yield getRecentActivity(orderModel_1.default, 7);
    res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue,
            recentUsers: recentUsers.reverse(),
            recentOrders: recentOrders.reverse(),
        }
    });
}));
const getOrdersByFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter } = req.query;
    let startDate;
    const endDate = new Date();
    switch (filter) {
        case "last7days":
            startDate = (0, date_fns_1.subDays)(endDate, 7);
            break;
        case "weekly":
            startDate = (0, date_fns_1.startOfWeek)(endDate);
            break;
        case "monthly":
            startDate = (0, date_fns_1.startOfMonth)(endDate);
            break;
        case "quarterly":
            startDate = (0, date_fns_1.startOfQuarter)(endDate);
            break;
        case "yearly":
            startDate = (0, date_fns_1.startOfYear)(endDate);
            break;
        default:
            return res.status(400).json({ message: "Invalid filter" });
    }
    try {
        const orders = yield orderModel_1.default.find({
            createdAt: { $gte: startDate, $lte: endDate },
        });
        let aggregatedData = {};
        switch (filter) {
            case "last7days":
                aggregatedData = (0, date_fns_1.eachDayOfInterval)({ start: startDate, end: endDate }).reduce((acc, date) => {
                    const day = (0, date_fns_1.format)(date, "yyyy-MM-dd");
                    acc[day] = 0;
                    return acc;
                }, {});
                orders.forEach(order => {
                    const day = (0, date_fns_1.format)(order.createdAt, "yyyy-MM-dd");
                    aggregatedData[day]++;
                });
                break;
            case "weekly":
                aggregatedData = (0, date_fns_1.eachWeekOfInterval)({ start: startDate, end: endDate }).reduce((acc, date) => {
                    const week = (0, date_fns_1.format)((0, date_fns_1.startOfWeek)(date), "yyyy-'W'ww");
                    acc[week] = 0;
                    return acc;
                }, {});
                orders.forEach(order => {
                    const week = (0, date_fns_1.format)((0, date_fns_1.startOfWeek)(order.createdAt), "yyyy-'W'ww");
                    aggregatedData[week]++;
                });
                break;
            case "monthly":
                aggregatedData = (0, date_fns_1.eachMonthOfInterval)({ start: startDate, end: endDate }).reduce((acc, date) => {
                    const month = (0, date_fns_1.format)(date, "yyyy-MM");
                    acc[month] = 0;
                    return acc;
                }, {});
                orders.forEach(order => {
                    const month = (0, date_fns_1.format)(order.createdAt, "yyyy-MM");
                    aggregatedData[month]++;
                });
                break;
            case "quarterly":
                aggregatedData = (0, date_fns_1.eachQuarterOfInterval)({ start: startDate, end: endDate }).reduce((acc, date) => {
                    const quarter = (0, date_fns_1.format)((0, date_fns_1.startOfQuarter)(date), "yyyy-'Q'Q");
                    acc[quarter] = 0;
                    return acc;
                }, {});
                orders.forEach(order => {
                    const quarter = (0, date_fns_1.format)((0, date_fns_1.startOfQuarter)(order.createdAt), "yyyy-'Q'Q");
                    aggregatedData[quarter]++;
                });
                break;
            case "yearly":
                aggregatedData = (0, date_fns_1.eachYearOfInterval)({ start: startDate, end: endDate }).reduce((acc, date) => {
                    const year = (0, date_fns_1.format)(date, "yyyy");
                    acc[year] = 0;
                    return acc;
                }, {});
                orders.forEach(order => {
                    const year = (0, date_fns_1.format)(order.createdAt, "yyyy");
                    aggregatedData[year]++;
                });
                break;
        }
        res.status(200).json(aggregatedData);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getOrdersByFilter = getOrdersByFilter;
