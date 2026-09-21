const Region = require("../models/Region");

// Get all regions
const getRegions = async (req, res) => {
  try {
    const regions = await Region.find()
      .populate("national", "nationalId nationalName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      regions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch regions",
      error: error.message,
    });
  }
};

// Get region by id
const getRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await Region.findById(id).populate(
      "national",
      "nationalId nationalName",
    );

    if (!region) {
      return res.status(404).json({
        message: "Region not found",
      });
    }

    res.status(200).json({
      region,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch region",
      error: error.message,
    });
  }
};

// Create region
const createRegion = async (req, res) => {
  try {
    const { regionId, regionName, national } = req.body;

    if (!regionId || !regionName || !national) {
      return res.status(400).json({
        message: "regionId, regionName and national are required",
      });
    }

    const region = await Region.create({
      regionId,
      regionName,
      national,
    });

    res.status(201).json({
      message: "Region created successfully",
      region,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create region",
      error: error.message,
    });
  }
};

// Update region
const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await Region.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!region) {
      return res.status(404).json({
        message: "Region not found",
      });
    }

    res.status(200).json({
      message: "Region updated successfully",
      region,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update region",
      error: error.message,
    });
  }
};

module.exports = {
  getRegions,
  getRegion,
  createRegion,
  updateRegion,
};
