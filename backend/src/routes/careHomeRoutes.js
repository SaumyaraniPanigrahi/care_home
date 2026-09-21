const express = require("express");

const {
  createCareHome,
  getCareHomes,
  getCareHomeById,
  updateCareHome,
  getUnitsByCareHome,
  addRegionToCareHome,
} = require("../controllers/careHomeController");

const router = express.Router();

router.post("/", createCareHome);
router.get("/", getCareHomes);
router.get("/care-home/:careHomeId", getUnitsByCareHome);
router.patch("/:id/regions", addRegionToCareHome);
router.get("/:id", getCareHomeById);
router.put("/:id", updateCareHome);
module.exports = router;
