const mongoose = require("mongoose");
const dotenv = require("dotenv");

const CareHome = require("../models/CareHome");
const Unit = require("../models/Unit");
const Resident = require("../models/Resident");

dotenv.config();

const seedResidents = async () => {
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

    // Find Units
    const groundFloor = await Unit.findOne({
      unitId: "UNIT001",
    });

    const firstFloor = await Unit.findOne({
      unitId: "UNIT002",
    });

    const gardenUnit = await Unit.findOne({
      unitId: "UNIT003",
    });

    const mainUnit = await Unit.findOne({
      unitId: "UNIT004",
    });

    const centralUnit = await Unit.findOne({
      unitId: "UNIT005",
    });

    const southUnit = await Unit.findOne({
      unitId: "UNIT006",
    });

    const eastUnit = await Unit.findOne({
      unitId: "UNIT007",
    });

    const westUnit = await Unit.findOne({
      unitId: "UNIT008",
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

    if (
      !groundFloor ||
      !firstFloor ||
      !gardenUnit ||
      !mainUnit ||
      !centralUnit ||
      !southUnit ||
      !eastUnit ||
      !westUnit
    ) {
      throw new Error("Unit data not found. Run unitSeeder.js first.");
    }

    // Remove existing residents
    // await Resident.deleteMany();

    const residents = [
      // Proviamoci - Ground Floor
      {
        firstName: "David",
        lastName: "Williams",
        dateOfBirth: new Date("1941-06-18"),
        gender: "Male",
        nhsNumber: "NHS000010",
        allergies: [],
        careHome: proviamoci._id,
        unit: groundFloor._id,
        status: "active",
      },

      {
        firstName: "Margaret",
        lastName: "Davies",
        dateOfBirth: new Date("1949-02-27"),
        gender: "Female",
        nhsNumber: "NHS000011",
        allergies: ["Penicillin"],
        careHome: proviamoci._id,
        unit: groundFloor._id,
        status: "active",
      },

      {
        firstName: "Michael",
        lastName: "Evans",
        dateOfBirth: new Date("1943-09-11"),
        gender: "Male",
        nhsNumber: "NHS000012",
        allergies: ["Aspirin"],
        careHome: proviamoci._id,
        unit: firstFloor._id,
        status: "active",
      },

      {
        firstName: "Susan",
        lastName: "Thomas",
        dateOfBirth: new Date("1951-04-05"),
        gender: "Female",
        nhsNumber: "NHS000013",
        allergies: [],
        careHome: proviamoci._id,
        unit: firstFloor._id,
        status: "active",
      },

      {
        firstName: "Peter",
        lastName: "Roberts",
        dateOfBirth: new Date("1946-12-22"),
        gender: "Male",
        nhsNumber: "NHS000014",
        allergies: ["Latex"],
        careHome: proviamoci._id,
        unit: firstFloor._id,
        status: "active",
      },

      // Oxford Care Home - Garden Unit
      {
        firstName: "Dorothy",
        lastName: "Walker",
        dateOfBirth: new Date("1939-08-16"),
        gender: "Female",
        nhsNumber: "NHS000015",
        allergies: [],
        careHome: oxfordCareHome._id,
        unit: gardenUnit._id,
        status: "active",
      },

      {
        firstName: "George",
        lastName: "Robinson",
        dateOfBirth: new Date("1944-03-29"),
        gender: "Male",
        nhsNumber: "NHS000016",
        allergies: ["Peanuts"],
        careHome: oxfordCareHome._id,
        unit: gardenUnit._id,
        status: "active",
      },

      {
        firstName: "Barbara",
        lastName: "Lewis",
        dateOfBirth: new Date("1953-11-07"),
        gender: "Female",
        nhsNumber: "NHS000017",
        allergies: ["Aspirin"],
        careHome: oxfordCareHome._id,
        unit: mainUnit._id,
        status: "active",
      },

      {
        firstName: "Richard",
        lastName: "Robinson",
        dateOfBirth: new Date("1942-05-19"),
        gender: "Male",
        nhsNumber: "NHS000018",
        allergies: [],
        careHome: oxfordCareHome._id,
        unit: mainUnit._id,
        status: "active",
      },

      {
        firstName: "Janet",
        lastName: "Griffiths",
        dateOfBirth: new Date("1948-10-13"),
        gender: "Female",
        nhsNumber: "NHS000019",
        allergies: ["Shellfish"],
        careHome: oxfordCareHome._id,
        unit: mainUnit._id,
        status: "active",
      },

      // Central Care House - Central Unit
      {
        firstName: "Alan",
        lastName: "Morgan",
        dateOfBirth: new Date("1940-01-25"),
        gender: "Male",
        nhsNumber: "NHS000020",
        allergies: [],
        careHome: centralCareHouse._id,
        unit: centralUnit._id,
        status: "active",
      },

      {
        firstName: "Christine",
        lastName: "Hughes",
        dateOfBirth: new Date("1950-07-12"),
        gender: "Female",
        nhsNumber: "NHS000021",
        allergies: ["Penicillin"],
        careHome: centralCareHouse._id,
        unit: centralUnit._id,
        status: "active",
      },

      {
        firstName: "Ronald",
        lastName: "Edwards",
        dateOfBirth: new Date("1945-09-03"),
        gender: "Male",
        nhsNumber: "NHS000022",
        allergies: ["Aspirin"],
        careHome: centralCareHouse._id,
        unit: centralUnit._id,
        status: "active",
      },

      {
        firstName: "Helen",
        lastName: "Harrison",
        dateOfBirth: new Date("1954-06-21"),
        gender: "Female",
        nhsNumber: "NHS000023",
        allergies: [],
        careHome: centralCareHouse._id,
        unit: centralUnit._id,
        status: "active",
      },

      {
        firstName: "Brian",
        lastName: "Clarke",
        dateOfBirth: new Date("1941-02-14"),
        gender: "Male",
        nhsNumber: "NHS000024",
        allergies: ["Latex"],
        careHome: centralCareHouse._id,
        unit: centralUnit._id,
        status: "active",
      },

      // South View Care - South Unit
      {
        firstName: "Anne",
        lastName: "Wright",
        dateOfBirth: new Date("1947-11-30"),
        gender: "Female",
        nhsNumber: "NHS000025",
        allergies: [],
        careHome: southViewCare._id,
        unit: southUnit._id,
        status: "active",
      },

      {
        firstName: "Kenneth",
        lastName: "Baker",
        dateOfBirth: new Date("1943-04-17"),
        gender: "Male",
        nhsNumber: "NHS000026",
        allergies: ["Peanuts"],
        careHome: southViewCare._id,
        unit: southUnit._id,
        status: "active",
      },

      {
        firstName: "Margaret",
        lastName: "Phillips",
        dateOfBirth: new Date("1952-09-26"),
        gender: "Female",
        nhsNumber: "NHS000027",
        allergies: ["Penicillin"],
        careHome: southViewCare._id,
        unit: southUnit._id,
        status: "active",
      },

      {
        firstName: "Edward",
        lastName: "Turner",
        dateOfBirth: new Date("1946-01-09"),
        gender: "Male",
        nhsNumber: "NHS000028",
        allergies: [],
        careHome: southViewCare._id,
        unit: southUnit._id,
        status: "active",
      },

      {
        firstName: "Jean",
        lastName: "Campbell",
        dateOfBirth: new Date("1951-05-15"),
        gender: "Female",
        nhsNumber: "NHS000029",
        allergies: ["Aspirin"],
        careHome: southViewCare._id,
        unit: southUnit._id,
        status: "active",
      },

      // Manchester Care Home - East Unit
      {
        firstName: "Frank",
        lastName: "Parker",
        dateOfBirth: new Date("1940-10-28"),
        gender: "Male",
        nhsNumber: "NHS000030",
        allergies: [],
        careHome: manchesterCareHome._id,
        unit: eastUnit._id,
        status: "active",
      },

      {
        firstName: "Joan",
        lastName: "Collins",
        dateOfBirth: new Date("1949-03-06"),
        gender: "Female",
        nhsNumber: "NHS000031",
        allergies: ["Shellfish"],
        careHome: manchesterCareHome._id,
        unit: eastUnit._id,
        status: "active",
      },

      {
        firstName: "Christopher",
        lastName: "Stewart",
        dateOfBirth: new Date("1944-08-23"),
        gender: "Male",
        nhsNumber: "NHS000032",
        allergies: ["Latex"],
        careHome: manchesterCareHome._id,
        unit: eastUnit._id,
        status: "active",
      },

      {
        firstName: "Judith",
        lastName: "Sanchez",
        dateOfBirth: new Date("1953-12-11"),
        gender: "Female",
        nhsNumber: "NHS000033",
        allergies: [],
        careHome: manchesterCareHome._id,
        unit: eastUnit._id,
        status: "active",
      },

      {
        firstName: "Stephen",
        lastName: "Morris",
        dateOfBirth: new Date("1942-07-04"),
        gender: "Male",
        nhsNumber: "NHS000034",
        allergies: ["Penicillin"],
        careHome: manchesterCareHome._id,
        unit: eastUnit._id,
        status: "active",
      },

      // West Valley Care - West Unit
      {
        firstName: "Dorothy",
        lastName: "Bennett",
        dateOfBirth: new Date("1946-11-18"),
        gender: "Female",
        nhsNumber: "NHS000035",
        allergies: [],
        careHome: westValleyCare._id,
        unit: westUnit._id,
        status: "active",
      },

      {
        firstName: "Thomas",
        lastName: "Wood",
        dateOfBirth: new Date("1941-03-24"),
        gender: "Male",
        nhsNumber: "NHS000036",
        allergies: ["Aspirin"],
        careHome: westValleyCare._id,
        unit: westUnit._id,
        status: "active",
      },

      {
        firstName: "Margaret",
        lastName: "Watson",
        dateOfBirth: new Date("1950-08-09"),
        gender: "Female",
        nhsNumber: "NHS000037",
        allergies: ["Peanuts"],
        careHome: westValleyCare._id,
        unit: westUnit._id,
        status: "active",
      },

      {
        firstName: "Charles",
        lastName: "Brooks",
        dateOfBirth: new Date("1945-01-31"),
        gender: "Male",
        nhsNumber: "NHS000038",
        allergies: [],
        careHome: westValleyCare._id,
        unit: westUnit._id,
        status: "active",
      },

      {
        firstName: "Susan",
        lastName: "Foster",
        dateOfBirth: new Date("1954-04-20"),
        gender: "Female",
        nhsNumber: "NHS000039",
        allergies: ["Penicillin", "Latex"],
        careHome: westValleyCare._id,
        unit: westUnit._id,
        status: "active",
      },
    ];

    for (const resident of residents) {
      await Resident.updateOne(
        { nhsNumber: resident.nhsNumber },
        { $set: resident },
        { upsert: true },
      );
    }

    console.log("Resident data seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Resident Seeder Error:", error);
    process.exit(1);
  }
};

seedResidents();
