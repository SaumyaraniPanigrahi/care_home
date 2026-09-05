const mongoose = require("mongoose");
const dotenv = require("dotenv");
const National = require("../models/National");

dotenv.config();

const nationalData = [
  {
    nationalId: "GJE0001",
    nationalName: "London",
  },
  {
    nationalId: "GJE0002",
    nationalName: "Oxford",
  },
  {
    nationalId: "GJE0003",
    nationalName: "Manchester",
  },
];

const seedNational = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("MongoDB connected");

    await National.deleteMany();

    await National.insertMany(nationalData);

    console.log("National data seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
};

seedNational();
