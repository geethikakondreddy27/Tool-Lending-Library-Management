const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const {
  protect,
} = require("../middlewares/authMiddleware");

const {
  authorize,
} = require("../middlewares/roleMiddleware");

const router = express.Router();

/**
 * ==========================
 * Dashboard Routes
 * ==========================
 */

// Dashboard Statistics
router.get(
  "/stats",
  protect,
  authorize("admin", "staff"),
  getDashboardStats
);

module.exports = router;