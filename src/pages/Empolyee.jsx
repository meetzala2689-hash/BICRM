import { UserPlus } from "lucide-react";
import React, { useState, useEffect } from "react";

function Employee() {
  // Employee form state
  const [showModal, setShowModal] = useState(false);
  const [employee, setEmployee] = useState({
    id: "",
    number: "",
    name: "",
    surname: "",
    email: "",
    category: "",
    title: "",
    joiningDate: "",
    salary: "",
    priority: "Low",
  });

  // Employees list (persistent)
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : [];
  });

  // Filters state
  const [filters, setFilters] = useState({
    priority: "",
    category: "",
    minSalary: "",
  });

  // Save employees to localStorage on update
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Handle form changes
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployees([employee, ...employees]);
    setEmployee({
      id: "",
      number: "",
      name: "",
      surname: "",
      email: "",
      category: "",
      title: "",
      joiningDate: "",
      salary: "",
      priority: "Low",
    });
    setShowModal(false);
  };

  // Filter employees
  const displayedEmployees = employees.filter((emp) => {
    const priorityMatch = filters.priority
      ? emp.priority === filters.priority
      : true;
    const categoryMatch = filters.category
      ? emp.category === filters.category
      : true;
    const salaryMatch = filters.minSalary
      ? parseFloat(emp.salary) >= parseFloat(filters.minSalary)
      : true;
    return priorityMatch && categoryMatch && salaryMatch;
  });

  // Priority theme
  const priorityTheme = (p) => {
    if (p === "High") return { dot: "#ff4d4d", bg: "#fff0f0", text: "#af2323" };
    if (p === "Medium")
      return { dot: "#ffa500", bg: "#fff9e6", text: "#946300" };
    return { dot: "#22c55e", bg: "#f0fdf4", text: "#166534" };
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        color: "#1e293b",
      }}
    >
      <div className="flex-grow-1 p-0 p-lg-2">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <span className="text-primary fw-bold text-uppercase tracking-wider small">
              Workspace
            </span>
            <h1
              className="fw-black display-6 mb-0"
              style={{ letterSpacing: "-1px" }}
            >
              Team Members
            </h1>
          </div>
          {/* <button
            className="btn btn-dark rounded-pill px-4 py-2 shadow-lg border-0 d-flex align-items-center gap-2"
            onClick={() => setShowModal(true)}
            style={{
              height: "50px",
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            }}
          >
            <i className="bi bi-plus-circle-fill"></i>
            <span className="fw-bold">Onboard Employee</span>
          </button> */}

          <button
            className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
            onClick={() => {
              setShowModal(true);
              localStorage.setItem("newTokenModal", "true");
            }}
          >
            <UserPlus size={18} />

            <span className="d-none d-sm-inline">New Employee</span>

            <span className="d-inline d-sm-none">+</span>
          </button>
        </header>

        {/* Filter Bar */}
        <div
          className="d-flex gap-3 mb-4 p-2 bg-white rounded-pill shadow-sm border px-4 align-items-center"
          style={{ maxWidth: "fit-content" }}
        >
          <i className="bi bi-filter text-muted"></i>
          <select
            className="form-select border-0 bg-transparent fw-semibold small"
            name="priority"
            onChange={handleFilterChange}
            value={filters.priority}
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <div className="vr h-50 my-auto"></div>
          <select
            className="form-select border-0 bg-transparent fw-semibold small"
            name="category"
            onChange={handleFilterChange}
            value={filters.category}
          >
            <option value="">Category</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          <div className="vr h-50 my-auto"></div>
          <input
            type="number"
            className="form-control border-0 bg-transparent fw-semibold small"
            placeholder="Min Salary ($)"
            name="minSalary"
            onChange={handleFilterChange}
            value={filters.minSalary}
          />
        </div>

        {/* Employees Table */}
        <div className="border-0 bg-transparent">
          <div className="table-responsive">
            <table
              className="table"
              style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
            >
              <thead>
                <tr className="text-muted small text-uppercase fw-bold">
                  <th className="border-0 px-4">Member</th>
                  <th className="border-0">Role & Dept</th>
                  <th className="border-0">Priority</th>
                  <th className="border-0 text-end px-4">Compensation</th>
                </tr>
              </thead>
              <tbody>
                {displayedEmployees.map((emp, index) => {
                  const theme = priorityTheme(emp.priority);
                  return (
                    <tr
                      key={index}
                      className="shadow-sm align-middle"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      <td
                        className="px-4 py-3"
                        style={{
                          borderTopLeftRadius: "16px",
                          borderBottomLeftRadius: "16px",
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-4 bg-light d-flex align-items-center justify-content-center fw-bold text-primary"
                            style={{
                              width: "48px",
                              height: "48px",
                              border: "2px solid #f1f5f9",
                            }}
                          >
                            {emp.name[0]}
                            {emp.surname[0]}
                          </div>
                          <div>
                            <div className="fw-bold m-0">
                              {emp.name} {emp.surname}
                            </div>
                            <div className="text-muted small">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold small">{emp.title}</div>
                        <div className="badge bg-light text-muted fw-normal">
                          {emp.category}
                        </div>
                      </td>
                      <td>
                        <div
                          className="d-inline-flex align-items-center px-3 py-1 rounded-pill"
                          style={{
                            backgroundColor: theme.bg,
                            color: theme.text,
                            fontSize: "0.75rem",
                            fontWeight: "800",
                          }}
                        >
                          <span
                            className="me-2"
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: theme.dot,
                            }}
                          ></span>
                          {emp.priority.toUpperCase()}
                        </div>
                      </td>
                      <td
                        className="text-end px-4"
                        style={{
                          borderTopRightRadius: "16px",
                          borderBottomRightRadius: "16px",
                        }}
                      >
                        <div className="fw-black text-dark">
                          ${parseFloat(emp.salary).toLocaleString()}
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Joined {emp.joiningDate}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(12px)",
              zIndex: 2000,
            }}
          >
            <div
              className="bg-white rounded-5 shadow-2xl w-100 animate__animated animate__fadeInUp"
              style={{
                maxWidth: "800px",
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Header */}
              <div
                className="d-flex justify-content-between align-items-start p-5 border-bottom"
                style={{ flexShrink: 0 }}
              >
                <div>
                  <h2
                    className="fw-black mb-1"
                    style={{ fontSize: "1.8rem", letterSpacing: "1px" }}
                  >
                    New Employee
                  </h2>
                  <p className="text-muted small">
                    Fill in the professional profile of the member.
                  </p>
                </div>
                <button
                  className="btn-close bg-light rounded-circle p-3"
                  style={{ border: "none", cursor: "pointer" }}
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Scrollable Body */}
              <div className="p-5 overflow-auto" style={{ flex: 1 }}>
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {[
                      "id",
                      "number",
                      "name",
                      "surname",
                      "email",
                      "category",
                      "title",
                      "joiningDate",
                      "salary",
                    ].map((field) => (
                      <div
                        className={field === "email" ? "col-12" : "col-md-6"}
                        key={field}
                      >
                        <label className="text-uppercase small fw-bold text-muted mb-2 ps-1">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type={
                            field === "joiningDate"
                              ? "date"
                              : field === "salary"
                                ? "number"
                                : "text"
                          }
                          name={field}
                          className="form-control form-control-lg border-0 bg-light rounded-3 px-4 py-2 fs-6 fw-medium"
                          placeholder={`Enter ${field}...`}
                          value={employee[field]}
                          onChange={(e) => {
                            if (field === "number") {
                              // Only allow digits, optional max length
                              const digitsOnly = e.target.value.replace(/\D/g, "");
                              setEmployee({ ...employee, [field]: digitsOnly });
                            } else {
                              handleChange(e);
                            }
                          }}
                          required
                        />
                      </div>
                    ))}

                    {/* Priority */}
                    <div className="col-md-6">
                      <label className="text-uppercase small fw-bold text-muted mb-2 ps-1">
                        Set Priority
                      </label>
                      <div className="d-flex gap-2">
                        {["Low", "Medium", "High"].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() =>
                              setEmployee({ ...employee, priority: p })
                            }
                            className={`btn flex-grow-1 rounded-4 py-3 fw-bold`}
                            style={{
                              backgroundColor:
                                employee.priority === p
                                  ? p === "High"
                                    ? "#dc2626"
                                    : p === "Medium"
                                      ? "#f59e0b"
                                      : "#16a34a"
                                  : "#f3f4f6",
                              color: employee.priority === p ? "#fff" : "#111827",
                              transition: "all 0.3s",
                              boxShadow:
                                employee.priority === p
                                  ? "0 6px 15px rgba(0,0,0,0.2)"
                                  : "none",
                            }}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-12 mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 rounded-pill py-3 fw-black shadow-lg"
                        style={{
                          background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                          fontSize: "1rem",
                          letterSpacing: "1px",
                        }}
                      >
                        CREATE PROFILE
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;
