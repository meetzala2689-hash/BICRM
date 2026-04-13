import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { putData, getData } from "../utils/indexedDB";
import { UserPlus } from "lucide-react";

const statsData = [
  {
    label: "Total Projects",
    value: 12,
    icon: "bi-folder2-open",
    color: "primary",
  },
  { label: "Active Team", value: 34, icon: "bi-shield-check", color: "info" },
  {
    label: "Open Reports",
    value: 8,
    icon: "bi-file-earmark-bar-graph",
    color: "warning",
  },
  {
    label: "New Leads",
    value: 52,
    icon: "bi-lightning-charge",
    color: "success",
  },
];

const financeData = [
  {
    label: "Total Income",
    icon: "solar:leaf-bold-duotone",
    value: 51.68,
    badge: "success",
    change: 8.72,
  },
  {
    label: "Total Expenses",
    icon: "solar:wallet-money-bold-duotone",
    value: 24.03,
    badge: "danger",
    change: 3.28,
  },
  {
    label: "Investments",
    icon: "solar:chart-2-bold-duotone",
    value: 48.21,
    badge: "danger",
    change: 5.69,
  },
  {
    label: "Savings",
    icon: "solar:hand-money-bold",
    value: 11.65,
    badge: "success",
    change: 10.58,
  },
];

const StatCard = ({ label, value, icon, color }) => (
  <div className="col-md-3">
    <div className="card border-0 shadow-sm rounded-4 hover-lift h-100">
      <div className="card-body p-4 d-flex align-items-center">
        <div
          className={`bg-${color} bg-opacity-10 p-3 rounded-3 me-3 text-${color}`}
        >
          <i className={`bi ${icon} fs-4`}></i>
        </div>
        <div>
          <p
            className="text-uppercase small fw-bold text-muted mb-0 tracking-wider"
            style={{ fontSize: "0.7rem" }}
          >
            {label}
          </p>
          <h3 className="fw-bold mb-0 mt-1">{value}</h3>
        </div>
      </div>
    </div>
  </div>
);

const FinanceCard = ({ label, icon, value, badge, change }) => (
  <div className="col-md-6">
    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className={`bg-${badge} bg-opacity-10 p-2 rounded-2`}>
            <iconify-icon
              icon={icon}
              className={`fs-3 text-${badge}`}
            ></iconify-icon>
          </div>
          <span
            className={`badge rounded-pill bg-${badge} bg-opacity-10 text-${badge} px-2 py-1 small fw-semibold border border-${badge} border-opacity-10`}
          >
            {change > 0 ? "↑" : "↓"} {change}%
          </span>
        </div>
        <h3 className="fw-bold mb-1">${value}k</h3>
        <p className="text-muted small mb-0 fw-medium">{label}</p>
      </div>
    </div>
  </div>
);

const barData = {
  labels: ["Not Started", "In Progress", "Completed", "Overdue"],
  datasets: [
    {
      label: "Tasks",
      data: [12, 19, 7, 3],
      backgroundColor: ["#f1f5f9", "#3b82f6", "#10b981", "#ef4444"],
      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { display: false },
    x: { grid: { display: false }, border: { display: false } },
  },
};

const initialFormState = {
  name: "",
  phone: "",
  email: "",
  occupation: "",
  status: "",
  type: "Project",
  startDate: "",
  endDate: "",
};

function Dashboard() {
  const [stats, setStats] = useState(statsData);
  const [finances, setFinances] = useState(financeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardInfo = async () => {
    const token = localStorage.getItem("token"); // FIXED
    // console.log("TOKEN:", token);

    // Try loading from IndexedDB first for an instant paint
    try {
      const cached = await getData("dashboard_cache", "static_info");
      if (cached) {
        if (cached.stats) setStats(cached.stats);
        if (cached.finances) setFinances(cached.finances);
      }
    } catch (e) {
      console.warn("No cache available or error reading DB", e);
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://crm-backend.kirittech.com/api/dashboard/static-info",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard info");
      }

      const data = await response.json();
      console.log("Fetched dashboard static info:", data);

      // Save to IndexedDB
      const cacheObj = { type: "static_info", ...data };
      putData("dashboard_cache", cacheObj).catch(err => console.error("Cache save failed", err));

      // If backend returns data formatted properly, update the state here.
      // E.g., if (data.stats) setStats(data.stats);
      // For now, it caches the payload for offline usage.

      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard info:", err);
      // If we fall over, just gracefully keep using the IndexedDB data or the static fallback
      setError(err.message);
      setLoading(false);
    }
  };
  // console.log("RAW TOKEN FROM STORAGE:", localStorage.getItem("token"));
  useEffect(() => {
    fetchDashboardInfo();
  }, []);

  const [formData, setFormData] = useState(initialFormState);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!formData.name) {
      alert("Field is required!");
      return;
    }
    alert("Item added successfully!");
    closeModal();
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Dashboard Header */}
      <header className="d-flex justify-content-between align-items-center mb-5 mt-2">
        <div>
          <h2 className="fw-bold text-dark mb-1">Dashboard</h2>
          <p className="text-muted mb-0 small">
            Overview of your business metrics for 2026.
          </p>
        </div>
        {/* <button
          className="btn btn-primary rounded-3 px-4 py-2 fw-semibold shadow-sm transition-all"
          onClick={openModal}
        >
          <i className="bi bi-plus-lg me-2"></i>Add New
        </button> */}
        <button
          className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
          onClick={() => {
            setShowModal(true);
            localStorage.setItem("newDashboardModal", "true");
          }}
        >
          <UserPlus size={18} />

          <span className="d-none d-sm-inline">New Dashboard</span>

          <span className="d-inline d-sm-none">+</span>
        </button>

      </header>

      {/* LOADING & ERROR STATES */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Synchronizing dashboard data...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mx-auto" style={{ maxWidth: "600px" }}>
          <strong>Sync Error:</strong> {error}
          <button className="btn btn-outline-danger btn-sm ms-3" onClick={fetchDashboardInfo}>
            Retry Sync
          </button>
        </div>
      )}

      {/* Stats Grid */}
      {!loading && !error && (
        <section className="row g-4 mb-5">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>
      )}

      {/* Charts and Finance */}
      <section className="row g-4 mb-5">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h6 className="fw-bold text-dark mb-4 text-uppercase tracking-wider small">
              Task Distribution
            </h6>
            <div style={{ height: "260px" }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="row g-3">
            {finances.map((finance) => (
              <FinanceCard key={finance.label} {...finance} />
            ))}
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <div className="card-header bg-white border-0 p-4">
          <h6 className="fw-bold mb-0">Recent Projects</h6>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="text-muted small text-uppercase fw-bold">
                <th className="ps-4 py-3 border-0">Project</th>
                <th className="border-0">Status</th>
                <th className="border-0 text-center">Duration</th>
                <th className="pe-4 border-0 text-end">Progress</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              <tr>
                <td className="ps-4 py-3 fw-semibold">Project Alpha</td>
                <td>
                  <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 fw-medium">
                    Ongoing
                  </span>
                </td>
                <td className="text-center text-muted small">
                  Jan 26 - Jun 26
                </td>
                <td className="pe-4 text-end">65%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-5 py-3 px-0 border-top d-flex justify-content-between align-items-center">
        <p className="mb-0 text-muted small">
          © 2026 <span className="fw-bold text-dark">KiritTech</span> Studio.
        </p>
        <nav className="d-flex gap-4">
          <a href="#" className="text-decoration-none text-muted small hover-dark">Documentation</a>
          <a href="#" className="text-decoration-none text-muted small hover-dark">Support</a>
          <a href="#" className="text-decoration-none text-muted small hover-dark">Privacy</a>
        </nav>
      </footer>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 px-4 pt-4 pb-0">
                <h5 className="fw-bold m-0">Add New Resource</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body p-4">
                <form className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted">NAME</label>
                    <input
                      type="text"
                      className="form-control border-light bg-light rounded-3"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer border-0 p-4">
                <button
                  className="btn btn-light rounded-3 px-4"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary rounded-3 px-4 shadow-sm"
                  onClick={handleAdd}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important; }
        .hover-dark:hover { color: #000 !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .transition-all { transition: all 0.2s ease-in-out; }
      `}</style>
    </div>
  );
}

export default Dashboard;
