const Medication = require("../models/Medication");
const Resident = require("../models/Resident");

// Get medications for a particular resident
const getResidentMedications = async (req, res) => {
  try {
    const { residentId } = req.params;
    const { medicine } = req.query;

    // Check if resident exists
    const resident = await Resident.findById(residentId);

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    // Base filter
    const filter = {
      resident: residentId,
    };

    // Search medicine by name
    if (medicine) {
      filter.medicineName = {
        $regex: medicine,
        $options: "i",
      };
    }

    const medications = await Medication.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: medications.length,
      medications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resident medications",
      error: error.message,
    });
  }
};

// Get one medication by ID
const getMedicationById = async (req, res) => {
  try {
    const { medicationId } = req.params;

    const medication = await Medication.findById(medicationId).populate(
      "resident",
      "firstName lastName",
    );

    if (!medication) {
      return res.status(404).json({
        message: "Medication not found",
      });
    }

    res.status(200).json({
      medication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch medication",
      error: error.message,
    });
  }
};

// Add medication to a resident
const createMedication = async (req, res) => {
  try {
    const { residentId } = req.params;

    const { medicineName, dosage, timing, frequency, startDate, endDate } =
      req.body;

    // Check resident
    const resident = await Resident.findById(residentId);

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    // Validate required fields
    if (!medicineName || !dosage || !timing) {
      return res.status(400).json({
        message: "Medicine name, dosage and timing are required",
      });
    }

    const medication = await Medication.create({
      resident: residentId,
      medicineName,
      dosage,
      timing,
      frequency,
      startDate,
      endDate,
      status: "ACTIVE",
    });

    res.status(201).json({
      message: "Medication added successfully",
      medication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create medication",
      error: error.message,
    });
  }
};

// Update medication
const updateMedication = async (req, res) => {
  try {
    const { medicationId } = req.params;

    const medication = await Medication.findById(medicationId);

    if (!medication) {
      return res.status(404).json({
        message: "Medication not found",
      });
    }

    const {
      medicineName,
      dosage,
      timing,
      frequency,
      startDate,
      endDate,
      status,
    } = req.body;

    medication.medicineName = medicineName ?? medication.medicineName;

    medication.dosage = dosage ?? medication.dosage;

    medication.timing = timing ?? medication.timing;

    medication.frequency = frequency ?? medication.frequency;

    medication.startDate = startDate ?? medication.startDate;

    medication.endDate = endDate ?? medication.endDate;

    medication.status = status ?? medication.status;

    const updatedMedication = await medication.save();

    res.status(200).json({
      message: "Medication updated successfully",
      medication: updatedMedication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update medication",
      error: error.message,
    });
  }
};

// Stop medication
const stopMedication = async (req, res) => {
  try {
    const { medicationId } = req.params;

    const medication = await Medication.findById(medicationId);

    if (!medication) {
      return res.status(404).json({
        message: "Medication not found",
      });
    }

    medication.status = "STOPPED";

    const updatedMedication = await medication.save();

    res.status(200).json({
      message: "Medication stopped successfully",
      medication: updatedMedication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to stop medication",
      error: error.message,
    });
  }
};

// Delete medication
const deleteMedication = async (req, res) => {
  try {
    const { medicationId } = req.params;

    const medication = await Medication.findById(medicationId);

    if (!medication) {
      return res.status(404).json({
        message: "Medication not found",
      });
    }

    await Medication.findByIdAndDelete(medicationId);

    res.status(200).json({
      message: "Medication deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete medication",
      error: error.message,
    });
  }
};

module.exports = {
  getResidentMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  stopMedication,
  deleteMedication,
};
