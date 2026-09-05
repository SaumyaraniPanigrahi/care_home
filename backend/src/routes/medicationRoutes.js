const express = require("express");

const {
  getResidentMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  stopMedication,
  deleteMedication,
} = require("../controllers/medicationController");

const router = express.Router();

router.get("/residents/:residentId/medications", getResidentMedications);
router.post("/residents/:residentId/medications", createMedication);
router.get("/medications/:medicationId", getMedicationById);
router.put("/medications/:medicationId", updateMedication);
router.patch("/medications/:medicationId/stop", stopMedication);
router.delete("/medications/:medicationId", deleteMedication);

module.exports = router;
