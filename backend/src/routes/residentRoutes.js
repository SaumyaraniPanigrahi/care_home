const express = require("express");
const {
  createResident,
  getResidents,
  getResidentById,
  updateResident,
} = require("../controllers/residentController");

const router = express.Router();

router.post("/", createResident);
router.get("/", getResidents);
router.get("/:residentId", getResidentById);
router.put("/:residentId/allergies", updateResident);
module.exports = router;
