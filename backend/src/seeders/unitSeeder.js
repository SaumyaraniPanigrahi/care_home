const mongoose = require("mongoose");
const dotenv = require("dotenv");

const CareHome = require("../models/CareHome");
const Unit = require("../models/Unit");

dotenv.config();

const seedUnits = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("MongoDB connected");

    // Find Care Homes
    const proviamoci = await CareHome.findOne({
      name: "Proviamoci",
    });

    const oxfordCareHome = await CareHome.findOne({
      name: "Oxford Care Home",
    });

    const centralCareHouse = await CareHome.findOne({
      name: "Central Care House",
    });

    const southViewCare = await CareHome.findOne({
      name: "South View Care",
    });

    const manchesterCareHome = await CareHome.findOne({
      name: "Manchester Care Home",
    });

    const westValleyCare = await CareHome.findOne({
      name: "West Valley Care",
    });

    if (
      !proviamoci ||
      !oxfordCareHome ||
      !centralCareHouse ||
      !southViewCare ||
      !manchesterCareHome ||
      !westValleyCare
    ) {
      throw new Error("CareHome data not found. Run careHomeSeeder.js first.");
    }

    // Remove existing Units
    await Unit.deleteMany();

    const units = [
      // Proviamoci
      {
        unitId: "UNIT001",
        unitName: "Ground Floor",
        careHome: proviamoci._id,
        status: "active",
      },
      {
        unitId: "UNIT002",
        unitName: "First Floor",
        careHome: proviamoci._id,
        status: "active",
      },

      // Oxford Care Home
      {
        unitId: "UNIT003",
        unitName: "Garden Unit",
        careHome: oxfordCareHome._id,
        status: "active",
      },
      {
        unitId: "UNIT004",
        unitName: "Main Unit",
        careHome: oxfordCareHome._id,
        status: "active",
      },

      // Central Care House
      {
        unitId: "UNIT005",
        unitName: "Central Unit",
        careHome: centralCareHouse._id,
        status: "active",
      },

      // South View Care
      {
        unitId: "UNIT006",
        unitName: "South Unit",
        careHome: southViewCare._id,
        status: "active",
      },

      // Manchester Care Home
      {
        unitId: "UNIT007",
        unitName: "East Unit",
        careHome: manchesterCareHome._id,
        status: "active",
      },

      // West Valley Care
      {
        unitId: "UNIT008",
        unitName: "West Unit",
        careHome: westValleyCare._id,
        status: "active",
      },
    ];

    await Unit.insertMany(units);

    console.log("Unit data seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Unit Seeder Error:", error);
    process.exit(1);
  }
};

seedUnits();
