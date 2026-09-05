const mongoose = require("mongoose");

const nationalSchema = new mongoose.Schema(
  {
    nationalId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    nationalName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("National", nationalSchema);
