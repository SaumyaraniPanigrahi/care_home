const express = require("express");

const router = express.Router();

const {
  getUnits,
  getUnit,
  getUnitsByCareHome,
  createUnit,
  updateUnit,
} = require("../controllers/unitController");

router.get("/", getUnits);
router.get("/care-home/:careHomeId", getUnitsByCareHome);
router.get("/:id", getUnit);
router.post("/", createUnit);
router.put("/:id", updateUnit);

module.exports = router;
