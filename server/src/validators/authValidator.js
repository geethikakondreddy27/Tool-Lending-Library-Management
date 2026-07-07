const validator = require("validator");
const AppError = require("../utils/AppError");

const nameRegex = /^[A-Za-z\s'-]+$/;

const validateRegister = (req, res, next) => {
  const { fullName, email, password } = req.body;

  const errors = {};

  // Full Name Validation
  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.trim().length < 3) {
    errors.fullName = "Full name must contain at least 3 characters.";
  } else if (fullName.trim().length > 50) {
    errors.fullName = "Full name cannot exceed 50 characters.";
  } else if (!nameRegex.test(fullName.trim())) {
    errors.fullName =
      "Full name can only contain letters, spaces, apostrophes and hyphens.";
  }

  // Email Validation
  if (!email) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Password Validation
  if (!password) {
    errors.password = "Password is required.";
  } else if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    errors.password =
      "Password must be at least 8 characters and include uppercase, lowercase and a number.";
  }

  if (Object.keys(errors).length > 0) {
    return next(new AppError("Validation failed.", 400, errors));
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  if (Object.keys(errors).length > 0) {
    return next(new AppError("Validation failed.", 400, errors));
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
