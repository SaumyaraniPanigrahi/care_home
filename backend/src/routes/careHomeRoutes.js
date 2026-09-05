const express = require("express");
const {
  createCareHome,
  getCareHomes,
  getCareHomeById,
  updateCareHome,
} = require("../controllers/careHomeController");

const router = express.Router();

router.post("/", createCareHome);
router.get("/", getCareHomes);
router.get("/:id", getCareHomeById);
router.put("/:id", updateCareHome);
module.exports = router;
