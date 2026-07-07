const jwt = require("jsonwebtoken");

const User = require("../models/User");
const AppError = require("../utils/AppError");
const analyticsLogger = require("../utils/analyticsLogger");

/**
 * Generate JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

/**
 * Register User
 */
const registerUser = async (userData) => {
  const { fullName, email, password } = userData;

  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new AppError("Email is already registered.", 409);
  }

  const user = await User.create({
    fullName,
    email: normalizedEmail,
    password,
  });

  analyticsLogger("REGISTER", "USER");

  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    user: userResponse,
    token: generateToken(user._id),
  };
};

/**
 * Login User
 */
const loginUser = async (email, password) => {
  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password.", 401);
  }

  analyticsLogger("LOGIN", "USER");

  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    user: userResponse,
    token: generateToken(user._id),
  };
};

module.exports = {
  registerUser,
  loginUser,
};