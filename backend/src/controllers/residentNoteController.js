const Resident = require("../models/Resident");
const ResidentNote = require("../models/ResidentNote");

// GET /api/residents/:residentId/notes
const getResidentNotes = async (req, res) => {
  try {
    const { residentId } = req.params;

    // Check if resident exists
    const resident = await Resident.findById(residentId);

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    // Get all notes for this resident
    const notes = await ResidentNote.find({
      resident: residentId,
    })
      .populate("createdBy", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      count: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resident notes",
      error: error.message,
    });
  }
};

// POST /api/residents/:residentId/notes
const createResidentNote = async (req, res) => {
  try {
    const { residentId } = req.params;
    const { note } = req.body;

    // Validate note
    if (!note || !note.trim()) {
      return res.status(400).json({
        message: "Note is required",
      });
    }

    // Check if resident exists
    const resident = await Resident.findById(residentId);

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    // Create note
    const newNote = await ResidentNote.create({
      resident: residentId,
      note: note.trim(),
      createdBy: req.user?._id,
    });

    // Populate user who created the note
    const populatedNote = await ResidentNote.findById(newNote._id).populate(
      "createdBy",
      "name email",
    );

    res.status(201).json({
      message: "Note added successfully",
      note: populatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
};

module.exports = {
  getResidentNotes,
  createResidentNote,
};
