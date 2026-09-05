const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "SUPER_ADMIN",
        "ADMIN",
        "NATIONAL_LARGE_MANAGER",
        "NATIONAL_SMALL_MANAGER",
        "CARE_HOME_STAFF",
      ],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Role", roleSchema);
