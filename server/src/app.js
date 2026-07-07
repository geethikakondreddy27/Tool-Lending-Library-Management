const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const toolsRoutes = require("./routes/toolsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const sanitizeInput = require("./utils/sanitizeInput");

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

/**
 * Hide Express Signature
 */
app.disable("x-powered-by");

/**
 * Security Headers
 */
app.use(helmet());

/**
 * CORS
 */
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy does not allow this origin."));
    },
    credentials: true,
  })
);

/**
 * Request Logging
 */
app.use(morgan("dev"));

/**
 * Body Parsers
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Cookie Parser
 */
app.use(cookieParser());

/**
 * Health Check
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tool Lending Library API is running successfully.",
  });
});

/**
 * Sanitize Incoming Request Body
 */
app.use(sanitizeInput);

/**
 * API Routes
 */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tools", toolsRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

/**
 * Handle Unknown Routes
 */
app.use(notFound);

/**
 * Global Error Handler
 */
app.use(errorHandler);

module.exports = app;