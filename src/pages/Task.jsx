import React, { useState, useEffect } from "react";
import {
  X,
  Trash2,
  Calendar,
  Plus,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

function Task() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignee: "",
    startDate: "",
    dueDate: "",
    priority: "Low",
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { ...form, id: Date.now() };
    setTasks([newTask, ...tasks]);
    setShowModal(false);
    setForm({
      title: "",
      description: "",
      assignee: "",
      startDate: "",
      dueDate: "",
      priority: "Low",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#FBFBFC",
        color: "#0F172A",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div className="flex-grow-1 p-0 p-lg-2">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-800 m-0" style={{ fontSize: "2rem" }}>
              Workspace
            </h1>
            <p className="text-muted small fw-medium">
              You have {tasks.length} active protocols today.
            </p>
          </div>

          <button className="add-task-btn" onClick={() => setShowModal(true)}>
            <Plus size={18} strokeWidth={3} /> <span>New Entry</span>
          </button>
        </header>

        {/* ✅ FIXED GRID */}
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-grid-item btn-primary-modern">
              <div className="modern-card">
                <div
                  className={`card-accent ${task.priority.toLowerCase()}`}
                ></div>

                <div className="card-content">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="tag-container">
                      <span
                        className={`status-dot ${task.priority.toLowerCase()}`}
                      ></span>
                      <span
                        className={`priority-text priority-${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <button
                      className="icon-button border-0 bg-white"
                      onClick={() =>
                        setTasks(tasks.filter((t) => t.id !== task.id))
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-desc">
                    {task.description ||
                      "System protocol awaiting detailed documentation."}
                  </p>

                  <div className="card-footer">
                    <div className="user-info">
                      <div className="avatar-stylish mb-3">
                        {task.assignee ? task.assignee[0] : "U"}
                      </div>
                      <span className="assignee-name mt-3">
                        {task.assignee || "Unassigned"}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="date-badge">
                      <Calendar size={12} className="me-1" />
                      {task.dueDate || "TBD"}
                    </div>
                  </div>

                  <div className="hover-action">
                    <span>View Details</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="drawer-modal p-5">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h3 className="fw-800 m-0">Create Task</h3>
                <button
                  className="close-circle"
                  onClick={() => setShowModal(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="label-caps">Heading</label>
                  <input
                    name="title"
                    className="stylish-input"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-6">
                    <label className="label-caps">Priority</label>
                    <div className="stylish-select-wrapper">
                      <select
                        name="priority"
                        className="stylish-select"
                        value={form.priority}
                        onChange={handleInputChange}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="label-caps">Assignee</label>
                    <input
                      name="assignee"
                      className="stylish-input"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="label-caps">Description</label>
                  <textarea
                    name="description"
                    className="stylish-input"
                    rows="4"
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="submit-btn-modern">
                  Confirm Initialization{" "}
                  <ArrowRight size={18} className="ms-2" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ✅ STYLES */}
      <style>{`
        .fw-800 { font-weight: 800; }

        .add-task-btn {
          background: #000; color: #fff; border: none;
          padding: 12px 24px; border-radius: 14px;
          display: flex; align-items: center; gap: 10px;
        }

        /* ✅ FIXED GRID */
        .task-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .btn-primary-modern:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px -10px rgba(0,0,0,0.3);
        }

        .task-grid-item {
          width: 100%;
        }

        @media (max-width: 1200px) {
          .task-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .task-grid { grid-template-columns: 1fr; }
        }

        /* Cards */
        .modern-card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid #F1F1F4;
          transition: 0.3s;
          height: 100%;
          display: flex;
          flex-direction: column;
           position: relative;   /* ✅ important */
  overflow: hidden; 
        }

.hover-action {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #000;
  color: #fff;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  font-weight: 100;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);

}

.modern-card:hover .hover-action {
  transform: translateY(0);
}

        .tag-container.low { color: #065F46; }
        .tag-container.medium { color: #92400E; }
        .tag-container.high { color: #991B1B; }
        .stylish-select.urgent { color: #7F1D1D; }

        .card-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #eee;
          padding-top: 16px;
        }

        .avatar-stylish {
          width: 32px; height: 32px;
          background: #000; color: #fff;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
        }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.3);
          display: flex;
          justify-content: flex-end;
        }

        .drawer-modal {
          width: 400px;
          background: white;
          height: 100%;
        }

        .stylish-input, .stylish-select {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #fff;          /* ensure white background */
  appearance: none;          /* removes default arrow on most browsers */
  -webkit-appearance: none;  /* Safari/Chrome */
  -moz-appearance: none;     /* Firefox */
  cursor: pointer;
  font-size: 1rem;
  color: #0F172A;
  padding-right: 30px;       /* leave space for custom arrow if needed */
  position: relative;
}

        .submit-btn-modern {
          width: 100%;
          padding: 14px;
          background: black;
          color: white;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}

export default Task;
