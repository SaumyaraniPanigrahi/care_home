const express = require("express");

const router = express.Router();

const {
  getRegions,
  getRegion,
  createRegion,
  updateRegion,
} = require("../controllers/regionController");

router.get("/", getRegions);
router.get("/:id", getRegion);
router.post("/", createRegion);
router.put("/:id", updateRegion);

module.exports = router;
