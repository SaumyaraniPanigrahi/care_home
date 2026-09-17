const express = require("express");

const router = express.Router();

const {
  getNationals,
  getNational,
  createNational,
  updateNational,
  deleteNational,
} = require("../controllers/nationalController");

// const authMiddleware = require("../middleware/authMiddleware");

// Get all Nationals
router.get("/", getNationals);

// Get single National
router.get("/:id", getNational);

// Create National
router.post("/", createNational);

// Update National
router.put("/:id", updateNational);

// Delete National
router.delete("/:id", deleteNational);

module.exports = router;
