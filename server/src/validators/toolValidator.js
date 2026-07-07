const AppError = require("../utils/AppError");

const allowedCategories = [
  "Hand Tools",
  "Power Tools",
  "Measuring Tools",
  "Gardening",
  "Safety Equipment",
  "Electrical",
  "Cleaning",
  "Other",
];

const allowedConditions = [
  "Excellent",
  "Good",
  "Fair",
  "Poor",
];

const allowedStatuses = [
  "Available",
  "Unavailable",
  "Maintenance",
];

/**
 * Validate Create Tool
 */
const validateCreateTool = (req, res, next) => {
  const {
    name,
    category,
    description,
    totalQuantity,
    availableQuantity,
    condition,
    status,
    location,
  } = req.body;

  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Tool name must contain at least 2 characters.";
  } else if (name.trim().length > 100) {
    errors.name = "Tool name cannot exceed 100 characters.";
  }

  if (!category) {
    errors.category = "Category is required.";
  } else if (!allowedCategories.includes(category)) {
    errors.category = "Invalid category selected.";
  }

  if (description && description.length > 500) {
    errors.description = "Description cannot exceed 500 characters.";
  }

  if (
    totalQuantity === undefined ||
    Number.isNaN(Number(totalQuantity))
  ) {
    errors.totalQuantity = "Total quantity is required.";
  } else if (Number(totalQuantity) < 0) {
    errors.totalQuantity = "Total quantity cannot be negative.";
  }

  if (
    availableQuantity === undefined ||
    Number.isNaN(Number(availableQuantity))
  ) {
    errors.availableQuantity =
      "Available quantity is required.";
  } else if (Number(availableQuantity) < 0) {
    errors.availableQuantity =
      "Available quantity cannot be negative.";
  } else if (
    Number(availableQuantity) > Number(totalQuantity)
  ) {
    errors.availableQuantity =
      "Available quantity cannot exceed total quantity.";
  }

  if (
    condition &&
    !allowedConditions.includes(condition)
  ) {
    errors.condition = "Invalid tool condition.";
  }

  if (
    status &&
    !allowedStatuses.includes(status)
  ) {
    errors.status = "Invalid tool status.";
  }

  if (location && location.length > 100) {
    errors.location =
      "Location cannot exceed 100 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return next(new AppError("Validation failed.", 400, errors));
  }

  next();
};

/**
 * Validate Update Tool
 * Only validates fields that are provided.
 */
const validateUpdateTool = (req, res, next) => {
  const {
    name,
    category,
    description,
    totalQuantity,
    availableQuantity,
    condition,
    status,
    location,
  } = req.body;

  const errors = {};

  if (name !== undefined) {
    if (name.trim().length < 2) {
      errors.name =
        "Tool name must contain at least 2 characters.";
    } else if (name.trim().length > 100) {
      errors.name =
        "Tool name cannot exceed 100 characters.";
    }
  }

  if (
    category !== undefined &&
    !allowedCategories.includes(category)
  ) {
    errors.category = "Invalid category selected.";
  }

  if (
    description !== undefined &&
    description.length > 500
  ) {
    errors.description =
      "Description cannot exceed 500 characters.";
  }

  if (
    totalQuantity !== undefined &&
    (Number.isNaN(Number(totalQuantity)) ||
      Number(totalQuantity) < 0)
  ) {
    errors.totalQuantity =
      "Total quantity cannot be negative.";
  }

  if (
    availableQuantity !== undefined &&
    (Number.isNaN(Number(availableQuantity)) ||
      Number(availableQuantity) < 0)
  ) {
    errors.availableQuantity =
      "Available quantity cannot be negative.";
  }

  if (
    condition !== undefined &&
    !allowedConditions.includes(condition)
  ) {
    errors.condition = "Invalid tool condition.";
  }

  if (
    status !== undefined &&
    !allowedStatuses.includes(status)
  ) {
    errors.status = "Invalid tool status.";
  }

  if (
    location !== undefined &&
    location.length > 100
  ) {
    errors.location =
      "Location cannot exceed 100 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return next(new AppError("Validation failed.", 400, errors));
  }

  next();
};

module.exports = {
  validateCreateTool,
  validateUpdateTool,
};