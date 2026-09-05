const mongoose = require("mongoose");

const careHomeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    postcode: {
      type: String,
      trim: true,
      default: null,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
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

module.exports = mongoose.model("CareHome", careHomeSchema);
