const CareHome = require("../models/CareHome");

const createCareHome = async (req, res) => {
  try {
    const { name, address, region, phone, status } = req.body;

    // 1. Check required fields
    if (!name || !address || !region || !phone) {
      return res.status(400).json({
        message: "Name, address, region and phone are required",
      });
    }

    // 2. Create care home
    const careHome = await CareHome.create({
      name,
      address,
      region,
      phone,
      status,
    });

    // 3. Send response
    res.status(201).json({
      message: "Care home created successfully",
      careHome,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create care home",
      error: error.message,
    });
  }
};
const getCareHomes = async (req, res) => {
  try {
    const careHomes = await CareHome.find();

    res.status(200).json({
      message: "Care homes fetched successfully",
      careHomes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch care homes",
      error: error.message,
    });
  }
};
const getCareHomeById = async (req, res) => {
  try {
    const { id } = req.params;

    const careHome = await CareHome.findById(id);

    if (!careHome) {
      return res.status(404).json({
        message: "Care home not found",
      });
    }

    res.status(200).json({
      message: "Care home fetched successfully",
      careHome,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch care home",
      error: error.message,
    });
  }
};
const updateCareHome = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, address, region, phone, status } = req.body;

    const careHome = await CareHome.findByIdAndUpdate(
      id,
      {
        name,
        address,
        region,
        phone,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!careHome) {
      return res.status(404).json({
        message: "Care home not found",
      });
    }

    res.status(200).json({
      message: "Care home updated successfully",
      careHome,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update care home",
      error: error.message,
    });
  }
};

module.exports = {
  createCareHome,
  getCareHomes,
  getCareHomeById,
  updateCareHome,
};
