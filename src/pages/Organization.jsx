import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { getAllData } from "../utils/indexedDB";

// --- IndexedDB Helper ---
const DB_NAME = "bicrm_db";
const STORE_NAME = "organization_store";

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const saveToDB = async (key, data) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(data, key);
  } catch (err) {
  }
};

const getFromDB = async (key) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    return null;
  }
};

function Organization() {
  const getInitialEmployeeState = () => ({
    name: "",
    organization: "",
    email: "",
    number: "",
    details: "IT",
    country: "",
    state: "",
    city: "",
    street: "",
    postalCode: "",
  });

  const [newEmployee, setNewEmployee] = useState(getInitialEmployeeState());
  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState(localStorage.getItem("organization_view") || "grid");
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const departments = ["All", "IT", "HR", "Finance", "Marketing"];
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isDbReady, setIsDbReady] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrganizations = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://auth-backend.kirittech.com/api/organizations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("RAW TOKEN FROM STORAGE:", localStorage.getItem("token"));
      if (!response.ok) {
        throw new Error("Failed to fetch organizations");
      }

      const data = await response.json();
      // console.log("Fetched organizations:", data);

      const orgs = Array.isArray(data) ? data : (data.data && Array.isArray(data.data)) ? data.data : [];

      // Merge API data with local data so we don't lose local creations
      setUsers(prev => {
        const combined = [...prev];
        orgs.forEach(apiOrg => {
          if (!combined.some(u => u.id === apiOrg.id)) {
            combined.push(apiOrg);
          }
        });
        return combined;
      });
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const savedUsers = await getFromDB("users");
      if (savedUsers && savedUsers.length > 0) {
        setUsers(savedUsers);
      }
      setIsDbReady(true);
      fetchOrganizations();
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (isDbReady) {
      saveToDB("users", users);
    }
  }, [users, isDbReady]);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("organization_view", view);
  }, [view]);

  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalSales: 0,
    activeOrders: 0,
  });

  const loadMetrics = async () => {
    try {
      // 1. Total Products (using areas as a proxy)
      const areas = await getAllData("areas").catch(() => []);
      
      // 2. Total Users (using contacts)
      const contacts = await getAllData("contacts").catch(() => []);
      
      // 3. Total Sales (from invoices in localStorage)
      const savedInvoices = localStorage.getItem("invoiceList");
      const invoiceList = savedInvoices ? JSON.parse(savedInvoices) : [];
      const totalSales = invoiceList.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);
      
      // 4. Active Orders (using tasks)
      const tasks = await getAllData("tasks").catch(() => []);

      setMetrics({
        totalProducts: areas.length || 0,
        totalUsers: contacts.length || 0,
        totalSales: totalSales || 0,
        activeOrders: tasks.length || 0,
      });
    } catch (err) {
      console.error("Error loading metrics:", err);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, [users]); // Reload metrics when users (organizations) change as well

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        (filterDept === "All" || u.details === filterDept) &&
        (u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())),
    );
  }, [users, filterDept, search]);

  const handleSave = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.number) {
      alert("Please fill all required fields!");
      return;
    }
    if (editUserId !== null) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === editUserId ? { ...newEmployee, id: editUserId } : u,
        ),
      );
    } else {
      // Add new user
      setUsers([...users, { id: Date.now(), ...newEmployee }]);
    }
    setEditUserId(null);
    setNewEmployee(getInitialEmployeeState());
    setIsModalOpen(false);
  };

  const handleEdit = (user) => {
    const { id, ...rest } = user;
    setNewEmployee({ ...rest });
    setEditUserId(user.id);
    setIsModalOpen(true);
  };

  return (
    <div className="container-fluid p-4 m-4" style={{
      backgroundColor: "#f8fafc",
      color: "#1e293b",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Organization</h2>
        <div className="d-flex align-items-center gap-3 m-2">
          <span>🔔 Notifications</span>
          <span>{dateTime.toLocaleTimeString()}</span>
          <button
            onClick={() => {
              setEditUserId(null);
              setNewEmployee(getInitialEmployeeState());
              setIsModalOpen(true);
              localStorage.setItem("setNewEmployee", "true");
            }}
            className="btn btn-primary py-3 px-4"
          >
            {/* + Create Organization */}
            <UserPlus size={18} />

            <span className="d-none d-sm-inline">New Contact</span>

            <span className="d-inline d-sm-none">+</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        {/* Total Products */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 border-0 border-start border-primary border-3 h-100">
            <div className="text-primary mb-2">
              <i className="bi bi-box-seam fs-4"></i>
            </div>
            <h6 className="text-muted fw-bold">Total Products</h6>
            <h3 className="mb-0">{metrics.totalProducts}</h3>
          </div>
        </div>

        {/* Total Users */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 border-0 border-start border-success border-3 h-100">
            <div className="text-success mb-2">
              <i className="bi bi-people fs-4"></i>
            </div>
            <h6 className="text-muted fw-bold">Total Users</h6>
            <h3 className="mb-0">{metrics.totalUsers}</h3>
          </div>
        </div>

        {/* Total Sales */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 border-0 border-start border-warning border-3 h-100">
            <div className="text-warning mb-2">
              <i className="bi bi-currency-dollar fs-4"></i>
            </div>
            <h6 className="text-muted fw-bold">Total Sales</h6>
            <h3 className="mb-0">${metrics.totalSales.toLocaleString()}</h3>
          </div>
        </div>

        {/* Active Orders */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 border-0 border-start border-danger border-3 h-100">
            <div className="text-danger mb-2">
              <i className="bi bi-cart-check fs-4"></i>
            </div>
            <h6 className="text-muted fw-bold">Active Orders</h6>
            <h3 className="mb-0">{metrics.activeOrders}</h3>
          </div>
        </div>
      </div>

      {/* User Management Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h4 className="text-primary mb-0">User Management</h4>
        <div className="d-flex gap-2 flex-wrap">
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
              <option key={dept}>{dept}</option>
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

      {/* LOADING & ERROR STATES */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading organizations...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mx-auto" style={{ maxWidth: "600px" }}>
          <strong>Error:</strong> {error}
          <button className="btn btn-outline-danger btn-sm ms-3" onClick={fetchOrganizations}>
            Retry
          </button>
        </div>
      )}

      {/* GRID VIEW */}
      {!loading && !error && view === "grid" && (
        <div className="row g-4">
          {filteredUsers.map((user, index) => (
            <div
              key={user.id || index}
              className="col-11 col-sm-6 col-lg-4 col-xl-3  d-flex justify-content-center"
            >
              <div
                className="card border-0 p-4 shadow-sm border-start border-primary border-5"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  minHeight: "320px",
                  borderRadius: "20px",
                  background: "linear-gradient(145deg, #ffffff, #f0f4ff)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.05)";
                }}
              >
                {/* Subtle Background Accent */}
                <div style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "80px",
                  height: "80px",
                  background: "rgba(13, 110, 253, 0.05)",
                  borderRadius: "50%"
                }} />

                {/* Profile Header */}
                <div className="text-center mb-3">
                  <div
                    className="rounded-circle shadow-sm d-flex justify-content-center align-items-center mx-auto mb-3"
                    style={{
                      width: 60,
                      height: 60,
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      border: "4px solid white"
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <h5 className="fw-bold mb-1" style={{ color: "#2d3436" }}>{user.name}</h5>
                  <span className="badge rounded-pill bg-light text-primary border px-3">
                    {user.organization}
                  </span>
                </div>

                {/* User Details */}
                <div className="mt-3 mb-4" style={{ fontSize: "0.9rem", color: "#636e72" }}>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-envelope-at me-2 text-primary"></i>
                    <span className="text-truncate">{user.email}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-telephone me-2 text-primary"></i>
                    <span>{user.number}</span>
                  </div>
                  <div className="d-flex align-items-start">
                    <i className="bi bi-geo-alt me-2 text-primary mt-1"></i>
                    <span>{user.street}, {user.city}, {user.state}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2 mt-auto">
                  <button
                    onClick={() => {
                      localStorage.setItem("selectedOrgId", user.id);
                      localStorage.setItem("selectedOrgName", user.organization);
                      navigate("/project", {
                        state: { orgId: user.id, orgName: user.organization }
                      });
                    }}
                    className="btn w-50 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      transition: "all 0.2s"
                    }}
                  >
                    <i className="bi bi-eye"></i> View
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="btn btn-primary w-50 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(13, 110, 253, 0.25)",
                      transition: "all 0.2s"
                    }}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* LIST VIEW */}
      {!loading && !error && view === "list" && (
        <div className="card border-0 shadow-sm" style={{ borderRadius: "15px", overflow: "hidden" }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4 py-3">Organization</th>
                  <th className="py-3">Contact Name</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Phone</th>
                  <th className="py-3">Department</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id || index}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "35px",
                            height: "35px",
                            backgroundColor: "#eef2ff",
                            color: "#4f46e5",
                            fontWeight: "600",
                            fontSize: "0.85rem"
                          }}
                        >
                          {user.organization?.charAt(0).toUpperCase() || "O"}
                        </div>
                        <span className="fw-semibold">{user.organization}</span>
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.number}</td>
                    <td>
                      <span className="badge bg-soft-primary text-primary px-3 py-2" style={{ backgroundColor: "#eef2ff" }}>
                        {user.details}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          onClick={() => {
                            localStorage.setItem("selectedOrgId", user.id);
                            localStorage.setItem("selectedOrgName", user.organization);
                            navigate("/project", {
                              state: { orgId: user.id, orgName: user.organization }
                            });
                          }}
                          className="btn btn-sm btn-outline-primary"
                          title="View Projects"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-sm btn-outline-secondary"
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No organizations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div key={editUserId || "new"}>
          {/*  <div> */}
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content p-3">
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Organization Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newEmployee.organization || ""}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          organization: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newEmployee.name || ""}
                      onChange={(e) =>
                        setNewEmployee({ ...newEmployee, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newEmployee.email || ""}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newEmployee.number || ""}
                      maxLength={10}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, "");
                        setNewEmployee({
                          ...newEmployee,
                          number: onlyNums,
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      value={newEmployee.details || "IT"}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          details: e.target.value,
                        })
                      }
                    >
                      {departments
                        .filter((d) => d !== "All")
                        .map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                    </select>
                  </div>

                  <h6 className="mt-4">Address Information</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployee.country || ""}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            country: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployee.state || ""}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployee.city || ""}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployee.street || ""}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            street: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployee.postalCode || ""}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditUserId(null);
                      setNewEmployee(getInitialEmployeeState());
                    }}
                  >
                    Close
                  </button>
                  {editUserId && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this user?",
                          )
                        ) {
                          setUsers(users.filter((u) => u.id !== editUserId));
                          setIsModalOpen(false);
                          setEditUserId(null);
                          // setNewEmployee({ ...initialEmployeeState });
                          setNewEmployee(getInitialEmployeeState());
                        }
                      }}
                    >
                      Delete
                    </button>
                  )}

                  <button className="btn btn-primary" onClick={handleSave}>
                    {editUserId ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
}

export default Organization;
