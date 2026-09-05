const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Resident = require("../models/Resident");
const Medication = require("../models/Medication");

dotenv.config();

const seedMedications = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("MongoDB connected");

    const residents = await Resident.find();

    if (!residents.length) {
      throw new Error("No residents found. Run residentSeeder.js first.");
    }

    console.log(`Found ${residents.length} residents`);

    // Remove existing medications
    await Medication.deleteMany();

    const medicines = [
      {
        medicineName: "Paracetamol",
        dosage: "500mg",
        timing: "Morning",
        frequency: "Daily",
      },
      {
        medicineName: "Amlodipine",
        dosage: "5mg",
        timing: "Morning",
        frequency: "Daily",
      },
      {
        medicineName: "Atorvastatin",
        dosage: "20mg",
        timing: "Night",
        frequency: "Daily",
      },
      {
        medicineName: "Metformin",
        dosage: "500mg",
        timing: "Morning",
        frequency: "Daily",
      },
      {
        medicineName: "Furosemide",
        dosage: "40mg",
        timing: "Morning",
        frequency: "Daily",
      },
      {
        medicineName: "Ramipril",
        dosage: "5mg",
        timing: "Morning",
        frequency: "Daily",
      },
      {
        medicineName: "Omeprazole",
        dosage: "20mg",
        timing: "Morning",
        frequency: "Daily",
      },
      {
        medicineName: "Levothyroxine",
        dosage: "50mcg",
        timing: "Morning",
        frequency: "Daily",
      },
      {
        medicineName: "Sertraline",
        dosage: "50mg",
        timing: "Morning",
        frequency: "Daily",
      },
      {
        medicineName: "Warfarin",
        dosage: "5mg",
        timing: "Evening",
        frequency: "Daily",
      },
    ];

    const cycleStatuses = ["Red", "Amber", "Green"];

    const medications = [];

    residents.forEach((resident, index) => {
      // Every resident gets 1 medication
      const medicine = medicines[index % medicines.length];

      const currentCycleStatus = cycleStatuses[index % cycleStatuses.length];

      const nextCycleStatus = cycleStatuses[(index + 1) % cycleStatuses.length];

      medications.push({
        resident: resident._id,

        medicineName: medicine.medicineName,
        dosage: medicine.dosage,
        timing: medicine.timing,
        frequency: medicine.frequency,

        status: "ACTIVE",

        currentCycleStatus,
        nextCycleStatus,

        startDate: new Date("2026-08-19"),
      });
    });

    await Medication.insertMany(medications);

    console.log(`${medications.length} medications seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Medication Seeder Error:", error);
    process.exit(1);
  }
};

seedMedications();
