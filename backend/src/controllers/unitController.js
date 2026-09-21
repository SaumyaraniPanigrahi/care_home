const Unit = require("../models/Unit");

// Get all units
const getUnits = async (req, res) => {
  try {
    const units = await Unit.find()
      .populate("careHome", "name address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      units,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch units",
      error: error.message,
    });
  }
};

// Get unit by id
const getUnit = async (req, res) => {
  try {
    const { id } = req.params;

    const unit = await Unit.findById(id).populate("careHome", "name address");

    if (!unit) {
      return res.status(404).json({
        message: "Unit not found",
      });
    }

    res.status(200).json({
      unit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch unit",
      error: error.message,
    });
  }
};

// Get units by care home
const getUnitsByCareHome = async (req, res) => {
  try {
    const { careHomeId } = req.params;

    const units = await Unit.find({
      careHome: careHomeId,
    }).populate("careHome", "name");

    res.status(200).json({
      count: units.length,
      units,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch units",
      error: error.message,
    });
  }
};

// Create unit
const createUnit = async (req, res) => {
  try {
    const { unitId, unitName, careHome, status } = req.body;

    if (!unitId || !unitName || !careHome) {
      return res.status(400).json({
        message: "unitId, unitName and careHome are required",
      });
    }

    const unit = await Unit.create({
      unitId,
      unitName,
      careHome,
      status,
    });

    res.status(201).json({
      message: "Unit created successfully",
      unit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create unit",
      error: error.message,
    });
  }
};

// Update unit
const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;

    const unit = await Unit.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!unit) {
      return res.status(404).json({
        message: "Unit not found",
      });
    }

    res.status(200).json({
      message: "Unit updated successfully",
      unit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update unit",
      error: error.message,
    });
  }
};

module.exports = {
  getUnits,
  getUnit,
  getUnitsByCareHome,
  createUnit,
  updateUnit,
};
