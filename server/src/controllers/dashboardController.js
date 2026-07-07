const asyncHandler = require("../middlewares/asyncHandler");

const Tool = require("../models/Tool");
const User = require("../models/User");

/**
 * @desc Dashboard Statistics
 * @route GET /api/v1/dashboard/stats
 * @access Admin / Staff
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalTools = await Tool.countDocuments({
    isActive: true,
  });

  const availableTools = await Tool.countDocuments({
    isActive: true,
    status: "Available",
  });

  const maintenanceTools = await Tool.countDocuments({
    isActive: true,
    status: "Maintenance",
  });

  const totalCategories = await Tool.distinct(
    "category",
    {
      isActive: true,
    }
  );

  const totalStaff = await User.countDocuments({
    role: "staff",
    isActive: true,
  });

  res.status(200).json({
    success: true,
    data: {
      totalTools,
      availableTools,
      maintenanceTools,
      totalCategories: totalCategories.length,
      totalStaff,
    },
  });
});

module.exports = {
  getDashboardStats,
};