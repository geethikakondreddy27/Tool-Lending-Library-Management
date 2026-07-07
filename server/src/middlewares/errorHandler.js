const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  let response = {
    success: false,
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  };

  // Validation errors from AppError
  if (err.errors) {
    response.errors = err.errors;
  }

  /**
   * MongoDB Duplicate Key Error
   */
  if (err.code === 11000) {
    statusCode = 409;

    response = {
      success: false,
      status: "fail",
      message: "Duplicate value entered.",
      errors: err.keyValue,
    };
  }

  /**
   * Mongoose Validation Error
   */
  if (err.name === "ValidationError") {
    statusCode = 400;

    const errors = {};

    Object.values(err.errors).forEach((value) => {
      errors[value.path] = value.message;
    });

    response = {
      success: false,
      status: "fail",
      message: "Validation failed.",
      errors,
    };
  }

  /**
   * Invalid MongoDB ObjectId
   */
  if (err.name === "CastError") {
    statusCode = 400;

    response = {
      success: false,
      status: "fail",
      message: "Invalid resource identifier.",
    };
  }

  /**
   * Development Logging
   */
  if (process.env.NODE_ENV === "development") {
    console.error("========== ERROR ==========");
    console.error(err);
    console.error("===========================");
  }

  /**
   * Production Response
   */
  if (process.env.NODE_ENV === "production" && statusCode === 500) {
    response = {
      success: false,
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;