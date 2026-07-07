const asyncHandler = require("../middlewares/asyncHandler");

const {
  createTool,
  getAllTools,
  getToolById,
  updateTool,
  deleteTool,
} = require("../services/toolService");

/**
 * @desc Create Tool
 * @route POST /api/v1/tools
 * @access Admin
 */
const create = asyncHandler(async (req, res) => {
  const tool = await createTool(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Tool created successfully.",
    data: tool,
  });
});

/**
 * @desc Get All Tools
 * @route GET /api/v1/tools
 * @access Admin, Staff
 */
const getAll = asyncHandler(async (req, res) => {
  const result = await getAllTools(req.query);

  res.status(200).json({
    success: true,
    message: "Tools retrieved successfully.",
    ...result,
  });
});

/**
 * @desc Get Tool By ID
 * @route GET /api/v1/tools/:id
 * @access Admin, Staff
 */
const getOne = asyncHandler(async (req, res) => {
  const tool = await getToolById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Tool retrieved successfully.",
    data: tool,
  });
});

/**
 * @desc Update Tool
 * @route PUT /api/v1/tools/:id
 * @access Admin
 */
const update = asyncHandler(async (req, res) => {
  const tool = await updateTool(req.params.id, req.body, req.user._id);

  res.status(200).json({
    success: true,
    message: "Tool updated successfully.",
    data: tool,
  });
});

/**
 * @desc Delete Tool
 * @route DELETE /api/v1/tools/:id
 * @access Admin
 */
const remove = asyncHandler(async (req, res) => {
  const result = await deleteTool(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    ...result,
  });
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
