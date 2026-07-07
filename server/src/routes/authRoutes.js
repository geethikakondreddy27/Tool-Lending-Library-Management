const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController");

const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const router = express.Router();

/**
 * Authentication Routes
 */

// Register User
router.post(
  "/register",
  protect,
  authorize("admin"),
  validateRegister,
  register
);

// Login User
router.post(
  "/login",
  validateLogin,
  login
);

module.exports = router;