const sanitizeHtml = require("sanitize-html");

const sanitizeValue = (value) => {
  if (typeof value === "string") {
    return sanitizeHtml(value.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    });
  }

  return value;
};

const sanitizeInput = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = sanitizeValue(req.body[key]);
    });
  }

  next();
};

module.exports = sanitizeInput;
