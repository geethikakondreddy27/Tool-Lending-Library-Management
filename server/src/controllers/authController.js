const asyncHandler = require("../middlewares/asyncHandler");

const { registerUser, loginUser } = require("../services/authService");

/**
 * @desc Register a new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    data: result,
  });
});

/**
 * @desc Login user
 * @route POST /api/v1/auth/login
 * @access Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: result,
  });
});

module.exports = {
  register,
  login,
};
