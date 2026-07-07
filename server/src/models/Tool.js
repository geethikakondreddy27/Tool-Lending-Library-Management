const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    toolCode: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Tool name is required."],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    category: {
      type: String,
      required: [true, "Category is required."],
      enum: [
        "Hand Tools",
        "Power Tools",
        "Measuring Tools",
        "Gardening",
        "Safety Equipment",
        "Electrical",
        "Cleaning",
        "Other",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    totalQuantity: {
      type: Number,
      required: [true, "Total quantity is required."],
      min: [0, "Total quantity cannot be negative."],
    },

    availableQuantity: {
      type: Number,
      required: [true, "Available quantity is required."],
      min: [0, "Available quantity cannot be negative."],
      validate: {
        validator: function (value) {
          return value <= this.totalQuantity;
        },
        message: "Available quantity cannot exceed total quantity.",
      },
    },

    condition: {
      type: String,
      enum: [
        "Excellent",
        "Good",
        "Fair",
        "Poor",
      ],
      default: "Good",
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Unavailable",
        "Maintenance",
      ],
      default: "Available",
    },

    location: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tool", toolSchema);