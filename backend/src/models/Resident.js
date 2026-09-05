const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    nhsNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      default: null,
    },

    allergies: [
      {
        type: String,
        trim: true,
      },
    ],

    careHome: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareHome",
      required: true,
    },

    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
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

module.exports = mongoose.model("Resident", residentSchema);
