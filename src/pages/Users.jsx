import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Users() {
  const [view, setView] = useState("grid"); // grid or list
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const users = [
    { id: 1, name: "Meet", email: "meet@gmail.com", number: "39294478747", details: "IT" },
    { id: 2, name: "John", email: "john@gmail.com", number: "1234567890", details: "HR" },
    { id: 3, name: "Alice", email: "alice@gmail.com", number: "9876543210", details: "Finance" },
    { id: 4, name: "Bob", email: "bob@gmail.com", number: "5556667777", details: "IT" },
    { id: 5, name: "Eve", email: "eve@gmail.com", number: "1112223333", details: "Marketing" },
    { id: 6, name: "Charlie", email: "charlie@gmail.com", number: "4445556666", details: "HR" },
  ];

  const departments = ["All", "IT", "HR", "Finance", "Marketing"];

  const getBadgeClass = (dept) => {
    switch (dept) {
      case "IT": return "bg-primary";
      case "HR": return "bg-success";
      case "Finance": return "bg-warning text-dark";
      case "Marketing": return "bg-info text-dark";
      default: return "bg-secondary";
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      (filterDept === "All" || u.details === filterDept) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mt-5">
      {/* Header & Controls */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="text-primary mb-0">User Management</h2>
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: "200px" }}
          />
          <select
            className="form-select form-select-sm"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <button
            className={`btn btn-sm ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="row g-4 ">
          {filteredUsers.map((user) => (
            <div key={user.id} className="col-sm-6 col-md-4 col-lg-3 shadow">
              <div className="card h-100 shadow-sm border-0 position-relative">
                <div className="card-body d-flex flex-column align-items-center text-center">
                  <div
                    className="rounded-circle bg-primary d-flex justify-content-center align-items-center mb-3 text-white fw-bold"
                    style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text mb-1 text-muted">{user.email}</p>
                  <p className="card-text mb-2">{user.number}</p>
                  <span className={`badge ${getBadgeClass(user.details)} mb-3`}>
                    {user.details}
                  </span>
                  <button className="btn btn-outline-primary btn-sm mt-auto w-100">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(user.details)}`}>
                      {user.details}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;