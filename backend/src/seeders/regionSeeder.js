const mongoose = require("mongoose");
const dotenv = require("dotenv");

const National = require("../models/National");
const Region = require("../models/Region");

dotenv.config();

const seedRegions = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("MongoDB connected");

    const oxford = await National.findOne({
      nationalId: "GJE0002",
    });

    const london = await National.findOne({
      nationalId: "GJE0001",
    });

    const manchester = await National.findOne({
      nationalId: "GJE0003",
    });

    if (!oxford || !london || !manchester) {
      throw new Error("National data not found. Run nationalSeeder.js first.");
    }

    await Region.deleteMany();

    const regions = [
      {
        regionId: "TIA0001",
        regionName: "North",
        national: london._id,
      },
      {
        regionId: "TIA0002",
        regionName: "Central",
        national: oxford._id,
      },
      {
        regionId: "TIA0003",
        regionName: "South",
        national: oxford._id,
      },
      {
        regionId: "TIA0004",
        regionName: "East",
        national: manchester._id,
      },
      {
        regionId: "TIA0005",
        regionName: "West",
        national: manchester._id,
      },
    ];

    await Region.insertMany(regions);

    console.log("Region data seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Region Seeder Error:", error);
    process.exit(1);
  }
};

seedRegions();
