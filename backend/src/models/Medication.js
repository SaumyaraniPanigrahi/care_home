const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
    },

    medicineName: {
      type: String,
      required: true,
      trim: true,
    },

    dosage: {
      type: String,
      required: true,
      trim: true,
    },

    timing: {
      type: String,
      required: true,
      trim: true,
    },

    frequency: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "STOPPED"],
      default: "ACTIVE",
    },

    currentCycleStatus: {
      type: String,
      enum: ["Red", "Amber", "Green"],
      default: "Green",
    },

    nextCycleStatus: {
      type: String,
      enum: ["Red", "Amber", "Green"],
      default: "Green",
    },

    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Medication", medicationSchema);
