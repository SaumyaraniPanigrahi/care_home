import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchResidentNotes,
  createResidentNote,
} from "../redux/features/notesSlice";
function NotesSection({ residentId, onClose }) {
  const dispatch = useDispatch();
  const { notes, loading, saving, error } = useSelector((state) => state.notes);
  const [showAddNote, setShowAddNote] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => {
    if (residentId) {
      dispatch(fetchResidentNotes(residentId));
    }
  }, [dispatch, residentId]);
  const handleSaveNote = async () => {
    if (!note.trim()) {
      return;
    }

    try {
      await dispatch(
        createResidentNote({
          residentId,
          note: note.trim(),
        }),
      ).unwrap();

      setNote("");
      setShowAddNote(false);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="notes-modal-overlay">
      {/* Modal */}
      <div className="notes-modal">
        {/* Modal Header */}
        <div className="notes-modal-header">
          <div>
            <h2>Resident Notes</h2>
            <p>View and manage resident notes</p>
          </div>

          <button
            type="button"
            className="notes-close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="notes-modal-body">
          {/* Add Note Button */}
          {!showAddNote && (
            <div className="notes-action">
              <button
                type="button"
                className="add-note-button"
                onClick={() => setShowAddNote(true)}
              >
                <i className="bi bi-plus-lg"></i>
                Add Note
              </button>
            </div>
          )}

          {/* Add Note Form */}
          {showAddNote && (
            <div className="add-note-form">
              <label htmlFor="resident-note">Note</label>

              <textarea
                id="resident-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter resident note..."
                rows="5"
              />

              <div className="add-note-actions">
                <button
                  type="button"
                  className="cancel-note-button"
                  onClick={() => {
                    setNote("");
                    setShowAddNote(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="save-note-button"
                  onClick={handleSaveNote}
                  disabled={!note.trim()}
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {/* Notes Table */}
          <div className="notes-table-wrapper">
            <table className="notes-table">
              <thead>
                <tr>
                  <th>Note</th>
                  <th>Added By</th>
                  <th>Date / Time</th>
                </tr>
              </thead>

              <tbody>
                {notes.length > 0 ? (
                  notes.map((item) => (
                    <tr key={item.id}>
                      <td className="note-content">{item.note}</td>

                      <td>{item.addedBy}</td>

                      <td>{formatDateTime(item.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-notes">
                      No notes available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesSection;
