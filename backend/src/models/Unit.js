const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    unitId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    unitName: {
      type: String,
      required: true,
      trim: true,
    },

    careHome: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareHome",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Unit", unitSchema);
