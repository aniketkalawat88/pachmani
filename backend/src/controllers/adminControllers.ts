import { Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import User from "../models/userModel";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import {
  startOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  subDays,
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachYearOfInterval,
} from "date-fns";

export const users = catchAsyncError(async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

export async function getTopProducts(req: Request, res: Response) {
  try {
    const result = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.product", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const productIds = result.map((item: any) => item._id);

    const topProducts = await Product.find({ _id: { $in: productIds } });

    res.json(topProducts);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching top products", error: error.message });
  }
}

export async function getOrderStatusLast7Days(req: Request, res: Response) {
  try {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    lastWeek.setHours(0, 0, 0, 0);

    const result = await Order.aggregate([
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

    const orderStatusLast7Days = result.map((item: any) => ({
      date: item._id.day,
      day: `Day ${item._id.dayNumber}`,
      orderCount: item.statusCounts.length,
      statusCounts: item.statusCounts,
    }));

    res.json(orderStatusLast7Days);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching order status for the last 7 days",
      error: error.message as string,
    });
  }
}

export async function getStats(req: Request, res: Response) {
  const totalUsers = await User.countDocuments();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newUsers = await User.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });
  const totalOrders = await Order.countDocuments();
  const newOrders = await Order.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });
  const totalProducts = await Product.countDocuments();
  const newProducts = await Product.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });
  res.json({
    users: { total: totalUsers, new: newUsers },
    orders: { total: totalOrders, new: newOrders },
    products: { total: totalProducts, new: newProducts },
  });
}

export const getDashboardTotal = catchAsyncError(
  async (req: Request, res: Response) => {
    const today = new Date();
    const filter = req.query.filter as string | undefined; // Ensure filter is treated as string or undefined
    console.log(filter, ":filter");

    const daysAgo = (days: number) => new Date(new Date().setDate(today.getDate() - days));
    const getQuarterStart = (date: Date) => new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1);

    const getDateRanges = (filter: string): { start: Date; end: Date } => {
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

    const getActivityCount = async (model: typeof User | typeof Order) => {
      return model.countDocuments({
        createdAt: {
          $gte: start,
          $lt: end,
        },
      });
    };

    const getTotalRevenue = async () => {
      const result = await Order.aggregate([
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
    };

    const totalUsers = await getActivityCount(User);
    const totalOrders = await getActivityCount(Order);
    const totalProducts = await Product.countDocuments(); // Assuming product count is not date-specific
    const totalRevenue = await getTotalRevenue();

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
  }
);

export const getDashboardStats = catchAsyncError(async (req: Request, res: Response) => {
  const today = new Date();
  const daysAgo = (days: number) => new Date(new Date().setDate(today.getDate() - days));

  // Helper function with proper TypeScript annotations
  const getRecentActivity = async (model: typeof User | typeof Order, days: number) => {
    return Promise.all(
      Array.from({ length: days }, (_, i) => i).map(async day => {
        const count = await model.countDocuments({
          createdAt: {
            $gte: daysAgo(day + 1),
            $lt: daysAgo(day)
          }
        });
        return {
          name: daysAgo(day).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' }),
          count,
        };
      })
    );
  };

  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalRevenueResult = await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
  ]);
  const totalRevenue = totalRevenueResult[0] ? totalRevenueResult[0].totalRevenue : 0;

  const recentUsers = await getRecentActivity(User, 7);
  const recentOrders = await getRecentActivity(Order, 7);

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
});

export const getOrdersByFilter = async (req: Request, res: Response) => {
  const { filter } = req.query;

  let startDate: Date;
  const endDate = new Date();

  switch (filter) {
    case "last7days":
      startDate = subDays(endDate, 7);
      break;
    case "weekly":
      startDate = startOfWeek(endDate);
      break;
    case "monthly":
      startDate = startOfMonth(endDate);
      break;
    case "quarterly":
      startDate = startOfQuarter(endDate);
      break;
    case "yearly":
      startDate = startOfYear(endDate);
      break;
    default:
      return res.status(400).json({ message: "Invalid filter" });
  }

  try {
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    let aggregatedData: Record<string, number> = {};

    switch (filter) {
      case "last7days":
        aggregatedData = eachDayOfInterval({ start: startDate, end: endDate }).reduce((acc, date) => {
          const day = format(date, "yyyy-MM-dd");
          acc[day] = 0;
          return acc;
        }, {} as Record<string, number>);
        orders.forEach(order => {
          const day = format(order.createdAt, "yyyy-MM-dd");
          aggregatedData[day]++;
        });
        break;
      case "weekly":
        aggregatedData = eachWeekOfInterval({ start: startDate, end: endDate }).reduce((acc, date) => {
          const week = format(startOfWeek(date), "yyyy-'W'ww");
          acc[week] = 0;
          return acc;
        }, {} as Record<string, number>);
        orders.forEach(order => {
          const week = format(startOfWeek(order.createdAt), "yyyy-'W'ww");
          aggregatedData[week]++;
        });
        break;
      case "monthly":
        aggregatedData = eachMonthOfInterval({ start: startDate, end: endDate }).reduce((acc, date) => {
          const month = format(date, "yyyy-MM");
          acc[month] = 0;
          return acc;
        }, {} as Record<string, number>);
        orders.forEach(order => {
          const month = format(order.createdAt, "yyyy-MM");
          aggregatedData[month]++;
        });
        break;
      case "quarterly":
        aggregatedData = eachQuarterOfInterval({ start: startDate, end: endDate }).reduce((acc, date) => {
          const quarter = format(startOfQuarter(date), "yyyy-'Q'Q");
          acc[quarter] = 0;
          return acc;
        }, {} as Record<string, number>);
        orders.forEach(order => {
          const quarter = format(startOfQuarter(order.createdAt), "yyyy-'Q'Q");
          aggregatedData[quarter]++;
        });
        break;
      case "yearly":
        aggregatedData = eachYearOfInterval({ start: startDate, end: endDate }).reduce((acc, date) => {
          const year = format(date, "yyyy");
          acc[year] = 0;
          return acc;
        }, {} as Record<string, number>);
        orders.forEach(order => {
          const year = format(order.createdAt, "yyyy");
          aggregatedData[year]++;
        });
        break;
    }

    res.status(200).json(aggregatedData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};