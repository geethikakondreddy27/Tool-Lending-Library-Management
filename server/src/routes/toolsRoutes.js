const express = require("express");

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/toolController");

const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const {
  validateCreateTool,
  validateUpdateTool,
} = require("../validators/toolValidator");

const router = express.Router();

/**
 * ============================
 * Tool Routes
 * ============================
 */

// Create Tool (Admin Only)
router.post("/", protect, authorize("admin"), validateCreateTool, create);

// Get All Tools (Admin & Staff)
router.get("/", protect, authorize("admin", "staff"), getAll);

// Get Single Tool (Admin & Staff)
router.get("/:id", protect, authorize("admin", "staff"), getOne);

// Update Tool (Admin Only)
router.put("/:id", protect, authorize("admin"), validateUpdateTool, update);

// Delete Tool (Admin Only)
router.delete("/:id", protect, authorize("admin"), remove);

module.exports = router;
