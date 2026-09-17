const National = require("../models/National");

// Get all Nationals
const getNationals = async (req, res) => {
  try {
    const nationals = await National.find().sort({ createdAt: -1 });

    res.status(200).json({
      nationals,
    });
  } catch (error) {
    console.error("Get nationals error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get single National
const getNational = async (req, res) => {
  try {
    const { id } = req.params;

    const national = await National.findById(id);

    if (!national) {
      return res.status(404).json({
        message: "National not found",
      });
    }

    res.status(200).json({
      national,
    });
  } catch (error) {
    console.error("Get national error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Create National
const createNational = async (req, res) => {
  try {
    const { nationalId, nationalName } = req.body;

    // Check required fields
    if (!nationalId || !nationalName) {
      return res.status(400).json({
        message: "National ID and National Name are required",
      });
    }

    // Check duplicate National ID
    const existingNational = await National.findOne({
      nationalId,
    });

    if (existingNational) {
      return res.status(409).json({
        message: "National ID already exists",
      });
    }

    // Create National
    const national = await National.create({
      nationalId,
      nationalName,
    });

    res.status(201).json({
      message: "National created successfully",
      national,
    });
  } catch (error) {
    console.error("Create national error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Update National
const updateNational = async (req, res) => {
  try {
    const { id } = req.params;
    const { nationalId, nationalName } = req.body;

    // Find National
    const national = await National.findById(id);

    if (!national) {
      return res.status(404).json({
        message: "National not found",
      });
    }

    // Check duplicate National ID
    if (nationalId && nationalId !== national.nationalId) {
      const existingNational = await National.findOne({
        nationalId,
      });

      if (existingNational) {
        return res.status(409).json({
          message: "National ID already exists",
        });
      }

      national.nationalId = nationalId;
    }

    // Update name
    if (nationalName) {
      national.nationalName = nationalName;
    }

    await national.save();

    res.status(200).json({
      message: "National updated successfully",
      national,
    });
  } catch (error) {
    console.error("Update national error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete National
const deleteNational = async (req, res) => {
  try {
    const { id } = req.params;

    const national = await National.findByIdAndDelete(id);

    if (!national) {
      return res.status(404).json({
        message: "National not found",
      });
    }

    res.status(200).json({
      message: "National deleted successfully",
    });
  } catch (error) {
    console.error("Delete national error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getNationals,
  getNational,
  createNational,
  updateNational,
  deleteNational,
};
