const Tool = require("../models/Tool");
const AppError = require("../utils/AppError");
const analyticsLogger = require("../utils/analyticsLogger");

/**
 * Generate Tool Code
 * Example:
 * TL-0001
 * TL-0002
 * TL-0003
 */
const generateToolCode = async () => {
  const latestTool = await Tool.findOne()
    .sort({ createdAt: -1 })
    .select("toolCode");

  if (!latestTool) {
    return "TL-0001";
  }

  const latestNumber = parseInt(
    latestTool.toolCode.split("-")[1],
    10
  );

  const nextNumber = latestNumber + 1;

  return `TL-${String(nextNumber).padStart(4, "0")}`;
};

/**
 * Create Tool
 */
const createTool = async (toolData, userId) => {
  const {
    name,
    category,
    description,
    totalQuantity,
    availableQuantity,
    condition,
    status,
    location,
  } = toolData;

  // Prevent duplicate tool names
  const existingTool = await Tool.findOne({
    name: name.trim(),
    isActive: true,
  });

  if (existingTool) {
    throw new AppError(
      "A tool with this name already exists.",
      409
    );
  }

  const toolCode = await generateToolCode();

  const tool = await Tool.create({
    toolCode,
    name: name.trim(),
    category,
    description: description?.trim() || "",
    totalQuantity,
    availableQuantity,
    condition,
    status,
    location: location?.trim() || "",
    createdBy: userId,
    updatedBy: userId,
  });

  analyticsLogger("CREATE", "TOOL");

  return tool;
};

/**
 * Get All Tools
 */
const getAllTools = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    category,
    status,
  } = queryParams;

  const query = {
    isActive: true,
  };

  // Search by Tool Name
  if (search.trim()) {
  query.$or = [
    {
      name: {
        $regex: search.trim(),
        $options: "i",
      },
    },
    {
      category: {
        $regex: search.trim(),
        $options: "i",
      },
    },
  ];
}

  // Filter by Category
  if (category) {
    query.category = category;
  }

  // Filter by Status
  if (status) {
    query.status = status;
  }

  const currentPage = Math.max(Number(page), 1);
  const pageLimit = Math.max(Number(limit), 1);

  const totalTools = await Tool.countDocuments(query);

  const tools = await Tool.find(query)
    .populate("createdBy", "fullName email")
    .populate("updatedBy", "fullName email")
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * pageLimit)
    .limit(pageLimit);

 return {
  totalTools,
  currentPage,
  totalPages: Math.max(
    1,
    Math.ceil(totalTools / pageLimit)
  ),
  pageSize: pageLimit,
  tools,
};
};

/**
 * Get Tool By ID
 */
const getToolById = async (toolId) => {
  const tool = await Tool.findOne({
    _id: toolId,
    isActive: true,
  })
    .populate("createdBy", "fullName email")
    .populate("updatedBy", "fullName email");

  if (!tool) {
    throw new AppError("Tool not found.", 404);
  }

  return tool;
};

/**
 * Update Tool
 */
const updateTool = async (toolId, toolData, userId) => {
  const tool = await Tool.findOne({
    _id: toolId,
    isActive: true,
  });

  if (!tool) {
    throw new AppError("Tool not found.", 404);
  }

  // Prevent duplicate tool names
  if (
    toolData.name &&
    toolData.name.trim().toLowerCase() !== tool.name.toLowerCase()
  ) {
    const existingTool = await Tool.findOne({
      name: toolData.name.trim(),
      isActive: true,
      _id: { $ne: toolId },
    });

    if (existingTool) {
      throw new AppError(
        "A tool with this name already exists.",
        409
      );
    }
  }

  
  // Apply updates
Object.assign(tool, toolData);

// Validate final quantities after update
if (tool.availableQuantity > tool.totalQuantity) {
  throw new AppError(
    "Available quantity cannot exceed total quantity.",
    400
  );
}

tool.updatedBy = userId;

  await tool.save();

  analyticsLogger("UPDATE", "TOOL");

  return tool;
};

/**
 * Soft Delete Tool
 */
const deleteTool = async (toolId, userId) => {
  const tool = await Tool.findOne({
    _id: toolId,
    isActive: true,
  });

  if (!tool) {
    throw new AppError("Tool not found.", 404);
  }

  tool.isActive = false;
  tool.updatedBy = userId;

  await tool.save();

  analyticsLogger("DELETE", "TOOL");

  return {
    message: "Tool deleted successfully.",
  };
};

module.exports = {
  createTool,
  getAllTools,
  getToolById,
  updateTool,
  deleteTool,
};