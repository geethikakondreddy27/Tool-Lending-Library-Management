const jwt = require("jsonwebtoken");

const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("./asyncHandler");

/**
 * Protect Routes
 * Verifies JWT and attaches authenticated user to req.user
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Access denied. Authentication token is required.", 401);
  }

  // Verify JWT
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find User
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new AppError("Authenticated user no longer exists.", 401);
  }

  if (!user.isActive) {
    throw new AppError("Your account has been deactivated.", 403);
  }

  // Attach user to request
  req.user = user;

  next();
});

module.exports = {
  protect,
};
