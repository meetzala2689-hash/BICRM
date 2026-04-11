import React, { useState, useEffect } from "react";

function PinBoard() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes
      ? JSON.parse(savedNotes)
      : [
          {
            id: 1,
            title: "Client feedback summary",
            content:
              "Positive response on UI, requested dark mode toggle and faster load times.",
            color: "primary",
            time: "14:22:07 08-04-2025",
          },
          {
            id: 2,
            title: "Blog content ideas",
            content:
              "Write about upcoming trends in web design and practical CSS tips.",
            color: "danger",
            time: "17:09:33 05-04-2025",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    const form = e.target;

    const content = form.noteContent.value.trim();
    const wordCount = content.split(/\s+/).length;
    if (wordCount > 18) {
      alert("Content cannot exceed 50 words");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: form.noteTitle.value,
      content: content,
      color: form.noteColor.value,
      time: new Date().toLocaleString("en-IN"),
    };

    setNotes([newNote, ...notes]);
    form.reset();

    const modalEl = document.getElementById("addNoteModal");
    if (window.bootstrap && modalEl) {
      const modalInstance =
        window.bootstrap.Modal.getInstance(modalEl) ||
        new window.bootstrap.Modal(modalEl);
      modalInstance.hide();
    }
  };

  const getRotation = (id) => {
    // const angles = [-9, -5, 9, 2];
    const angles = [2, 1, 1, 2];
    return angles[id % angles.length];
  };

  return (
    <div className="bg-light" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex-grow-1 p-0 p-lg-2">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold text-dark m-0">Creative Pinboard</h2>
            <p className="text-muted small m-0">
              Capture your thoughts and tasks instantly.
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="row g-4 mt-2">
          {notes.map((note) => (
            <div key={note.id} className="col-12 col-sm-6 col-md-4 col-xl-3">
              <div
                className={`card border-0 shadow-sm note-card bg-${note.color}-subtle`}
                style={{
                  borderRadius: "20px",
                  transform: `rotate(${getRotation(note.id)}deg)`,
                  height: "280px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div className="card-body p-4 position-relative d-flex flex-column">
                  <button
                    className="btn btn-link text-dark position-absolute top-0 end-0 mt-2 me-2 delete-btn"
                    onClick={() => handleDelete(note.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>

                  <div className="d-flex align-items-center mb-2">
                    <div
                      className={`bg-${note.color} rounded-circle me-2`}
                      style={{ width: "10px", height: "10px" }}
                    ></div>
                    <span className="text-muted small">{note.time}</span>
                  </div>

                  <h5 className="fw-bold mb-2">{note.title}</h5>

                  {/* FIXED CONTENT AREA */}
                  <p className="text-secondary flex-grow-1 overflow-auto note-content">
                    {note.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {notes.length === 0 && (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">No Notes</h4>
            </div>
          )}
        </div>

        {/* Floating Button */}
        <button
          className="btn btn-primary rounded-circle shadow-lg fab-button"
          data-bs-toggle="modal"
          data-bs-target="#addNoteModal"
        >
          <i className="bi bi-plus-lg"></i>
        </button>

        {/* Modal */}
        <div className="modal fade" id="addNoteModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4">
              <div className="modal-header border-0">
                <h5>Add Note</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <form onSubmit={handleAddNote}>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="noteTitle"
                    placeholder="Title"
                    required
                  />
                  <textarea
                    className="form-control"
                    name="noteContent"
                    placeholder="Content"
                    required
                  ></textarea>
                </div>

                <div className="modal-footer border-0">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .note-card:hover {
          transform: rotate(0deg) translateY(-10px) !important;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }

        .delete-btn {
          opacity: 0;
          transition: 0.2s;
        }

        .note-card:hover .delete-btn {
          opacity: 1;
        }

        .note-content::-webkit-scrollbar {
          display: none;
        }

        .note-content {
          scrollbar-width: none;
        }

        .fab-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
        }
      `}</style>
    </div>
  );
}

export default PinBoard;