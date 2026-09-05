const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    regionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    regionName: {
      type: String,
      required: true,
      trim: true,
    },

    national: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "National",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Region", regionSchema);
