const mongoose = require("mongoose");
const dotenv = require("dotenv");

const CareHome = require("../models/CareHome");
const Region = require("../models/Region");

dotenv.config();

const seedCareHomes = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("MongoDB connected");

    // Find regions
    const north = await Region.findOne({
      regionId: "TIA0001",
    });

    const central = await Region.findOne({
      regionId: "TIA0002",
    });

    const south = await Region.findOne({
      regionId: "TIA0003",
    });

    const east = await Region.findOne({
      regionId: "TIA0004",
    });

    const west = await Region.findOne({
      regionId: "TIA0005",
    });

    if (!north || !central || !south || !east || !west) {
      throw new Error("Region data not found. Run regionSeeder.js first.");
    }

    // Remove existing CareHomes
    await CareHome.deleteMany();

    const careHomes = [
      {
        name: "Proviamoci",
        address: "10 North Street",
        postcode: "N1 1AA",
        phone: "02011111111",
        region: north._id,
        status: "active",
      },

      {
        name: "Oxford Care Home",
        address: "20 Central Road",
        postcode: "OX1 1AA",
        phone: "02022222222",
        region: central._id,
        status: "active",
      },

      {
        name: "Central Care House",
        address: "30 Central Avenue",
        postcode: "OX2 2BB",
        phone: "02033333333",
        region: central._id,
        status: "active",
      },

      {
        name: "South View Care",
        address: "40 South Road",
        postcode: "OX3 3CC",
        phone: "02044444444",
        region: south._id,
        status: "active",
      },

      {
        name: "Manchester Care Home",
        address: "50 East Street",
        postcode: "M1 1AA",
        phone: "02055555555",
        region: east._id,
        status: "active",
      },

      {
        name: "West Valley Care",
        address: "60 West Road",
        postcode: "M2 2BB",
        phone: "02066666666",
        region: west._id,
        status: "active",
      },
    ];

    await CareHome.insertMany(careHomes);

    console.log("CareHome data seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("CareHome Seeder Error:", error);
    process.exit(1);
  }
};

seedCareHomes();
