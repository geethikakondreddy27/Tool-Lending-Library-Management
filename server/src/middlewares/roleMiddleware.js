const AppError = require("../utils/AppError");

/**
 * Authorize User Roles
 * Usage:
 * authorize("admin")
 * authorize("admin", "staff")
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError(
          "Authentication required before authorization.",
          401
        )
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to perform this action.",
          403
        )
      );
    }

    next();
  };
};

module.exports = {
  authorize,
};