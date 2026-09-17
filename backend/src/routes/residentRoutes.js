const express = require("express");
const {
  createResident,
  getResidents,
  getResidentById,
  updateResident,
  getResidentsByCareHome,
} = require("../controllers/residentController");

const router = express.Router();

router.post("/", createResident);
router.get("/", getResidents);
router.get("/care-home/:careHomeId", getResidentsByCareHome);
router.get("/:residentId", getResidentById);
router.put("/:residentId/allergies", updateResident);
module.exports = router;
