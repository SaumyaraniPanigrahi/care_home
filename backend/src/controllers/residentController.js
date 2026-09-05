const Resident = require("../models/Resident");
const Medication = require("../models/Medication");
const ResidentNote = require("../models/ResidentNote");

const createResident = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, allergies, careHome } =
      req.body;

    if (!firstName || !lastName || !dateOfBirth || !gender || !careHome) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const resident = await Resident.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      careHome,
      allergies,
    });

    res.status(201).json({
      message: "Resident created successfully",
      resident,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resident",
      error: error.message,
    });
  }
};
const getResidents = async (req, res) => {
  try {
    const { careHome } = req.query;

    const filter = {};

    if (careHome) {
      filter.careHome = careHome;
    }

    const residents = await Resident.find(filter)
      .populate("careHome", "name address region phone status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: residents.length,
      residents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get residents",
      error: error.message,
    });
  }
};

const getResidentById = async (req, res) => {
  try {
    const { residentId } = req.params;
    const resident = await Resident.findById(residentId).populate(
      "careHome",
      "name address region phone status",
    );
    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }
    const medications = await Medication.find({
      resident: residentId,
      status: "ACTIVE",
    }).sort({
      createdAt: -1,
    });
    const notes = await ResidentNote.find({
      resident: residentId,
    })
      .populate("createdBy", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      resident,
      medications,
      notes,
    });
    console.log(resident, "resident 1");
  } catch (error) {
    res.status(500).json({
      message: "Failed to Resident details",
      error: error.message,
    });
  }
};
const updateResident = async (req, res) => {
  try {
    const { residentId } = req.params;
    const { allergies } = req.body;

    const resident = await Resident.findByIdAndUpdate(
      residentId,
      {
        allergies,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    res.status(200).json({
      message: "Resident allergies updated successfully",
      resident,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update allergies",
      error: error.message,
    });
  }
};
module.exports = {
  createResident,
  getResidents,
  getResidentById,
  updateResident,
};
