const express = require("express");

const {
  getResidentNotes,
  createResidentNote,
} = require("../controllers/residentNoteController");

const router = express.Router();

router.get("/residents/:residentId/notes", getResidentNotes);
router.post("/residents/:residentId/notes", createResidentNote);

module.exports = router;
