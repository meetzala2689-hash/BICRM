import React, { useEffect, useState } from "react";

// Premium Input Field with "Inset" focus effect
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
  placeholder,
}) => (
  <div className="col-md-4 mb-4">
    <label
      className="form-label fw-semibold text-secondary mb-2"
      style={{ fontSize: "0.8rem", opacity: 0.8 }}
    >
      {label}
    </label>

    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select border-start bg-white shadow-sm"
        style={{
          borderRadius: "12px",
          height: "48px",
          transition: "all 0.2s",
          border: "1px solid #f1f5f9",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="form-control border-0 bg-white shadow-sm"
        style={{
          borderRadius: "12px",
          height: "48px",
          transition: "all 0.2s",
          border: "1px solid #f1f5f9",
        }}
        placeholder={placeholder}
      />
    )}
  </div>
);

function Opportunities() {
  const [opportunities, setOpportunities] = useState(() => {
    const saved = localStorage.getItem("opportunities");
    return saved
      ? JSON.parse(saved)
      : [
        {
          id: 1,
          name: "Website Redesign",
          stage: "Negotiating",
          amount: "$10,000",
          status: "Pending",
          color: "#f59e0b",
        },
        {
          id: 2,
          name: "Mobile App",
          stage: "Won",
          amount: "$25,000",
          status: "Closed",
          color: "#10b981",
        },
      ];
  });

  const cardsData = [
    { title: "Total Opps", value: 150, trend: "+12%", icon: "📊" },
    { title: "Won", value: 45, color: "#10b981", trend: "+5%", icon: "✨" },
    {
      title: "Negotiating",
      value: 25,
      color: "#f59e0b",
      trend: "-2%",
      icon: "🤝",
    },
    {
      title: "Revenue",
      value: "$2.50M",
      color: "#6366f1",
      trend: "+18%",
      icon: "💎",
    },
  ];

  useEffect(() => {
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
  }, [opportunities]);

  const [showAddModal, setShowAddModal] = useState(() => {
    const saved = localStorage.getItem("showAddModal");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("showAddModal", JSON.stringify(showAddModal));
  }, [showAddModal]);

  const [formData, setFormData] = useState({
    projectCode: "",
    projectName: "",
    developerName: "",
    reraCode: "",
    promoterType: "",
    legalStatus: "",
    projectRating: "",
    projectStatus: "",
    projectType: "",
    launchDate: "",
    possessionDate: "",
    notes: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = () => {
    const newOp = {
      id: opportunities.length + 1,
      name: formData.projectName || "New Project",
      stage: formData.projectStatus || "Negotiating",
      amount: "$0",
      status: "Pending",
      color: "#f59e0b",
    };
    setOpportunities([...opportunities, newOp]);
    setShowAddModal(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        color: "#1e293b",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="flex-grow-1 p-0 p-lg-2">
        {/* Header Section */}
        <header className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h1
              className="fw-bold tracking-tight mb-1"
              style={{ fontSize: "1.8rem" }}
            >
              Opportunities
            </h1>
            <p className="text-muted mb-0">
              Track and manage your real estate pipeline in real-time.
            </p>
          </div>
          <button
            className="btn d-flex align-items-center gap-2 px-4 py-2 fw-bold text-white shadow"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
              border: "none",
              height: "48px",
            }}
            onClick={() => setShowAddModal(true)}
          >
            <span style={{ fontSize: "1.2rem" }}>+</span> Create New
          </button>
        </header>

        {/* Stats Grid */}
        <div className="row g-4 mb-5">
          {cardsData.map((item, index) => (
            <div key={index} className="col-md-6 col-xl-3">
              <div
                className="card border-0 p-3 shadow-sm h-100"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <span
                      className="p-2 rounded-3 bg-light"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {item.icon}
                    </span>
                    <span
                      className="small fw-bold"
                      style={{
                        color: item.trend.startsWith("+")
                          ? "#10b981"
                          : "#ef4444",
                      }}
                    >
                      {item.trend}
                    </span>
                  </div>
                  <h6 className="text-muted fw-semibold small mb-1">
                    {item.title}
                  </h6>
                  <h3
                    className="fw-bold mb-0"
                    style={{ color: item.color || "#1e293b" }}
                  >
                    {item.value}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div
          className="bg-white shadow-sm border border-light overflow-hidden"
          style={{ borderRadius: "24px" }}
        >
          <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-white">
            <h5 className="fw-bold m-0">Recent Deals</h5>
            <input
              className="form-control w-25 border-0 bg-light rounded-pill px-4"
              placeholder="Search deals..."
              style={{ fontSize: "0.85rem" }}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr
                  className="text-muted small text-uppercase fw-bold"
                  style={{ letterSpacing: "0.5px" }}
                >
                  <th className="px-4 py-3 border-0">Project</th>
                  <th className="py-3 border-0">Stage</th>
                  <th className="py-3 border-0">Value</th>
                  <th className="px-4 py-3 border-0 text-end">Status</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opp) => (
                  <tr
                    key={opp.id}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td className="px-4 py-4">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle text-primary d-flex align-items-center justify-content-center"
                          style={{
                            width: "32px",
                            height: "32px",
                            background: "#eef2ff",
                            fontSize: "0.85rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            flexShrink: 0,
                          }}
                        >
                          {opp.name.charAt(0)}
                        </div>
                        <span className="fw-bold">{opp.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge rounded-pill bg-light text-dark px-3 py-2 fw-medium">
                        {opp.stage}
                      </span>
                    </td>
                    <td
                      className="fw-bold text-indigo"
                      style={{ color: "#4f46e5" }}
                    >
                      {opp.amount}
                    </td>
                    <td className="px-4 text-end">
                      <span
                        className="px-3 py-2 rounded-pill small fw-bold"
                        style={{
                          backgroundColor: `${opp.color}15`,
                          color: opp.color,
                        }}
                      >
                        ● {opp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Layered Glassmorphism */}
        {showAddModal && (
          <div
            className="modal d-block"
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div
                className="modal-content border-0 p-3 shadow-lg"
                style={{ borderRadius: "32px" }}
              >
                <div className="modal-header border-0 pb-0">
                  <h4 className="fw-bold text-dark m-0">New Project Entry</h4>
                  <button
                    type="button"
                    className="btn-close shadow-none"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAdd();
                  }}
                  className="modal-body"
                >
                  <div className="row g-2">
                    <InputField
                      label="Project Name"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      placeholder="e.g. Skyline Residency"
                    />
                    <InputField
                      label="Developer"
                      name="developerName"
                      value={formData.developerName}
                      onChange={handleChange}
                      placeholder="e.g. Apex Group"
                    />
                    <InputField
                      label="RERA Code"
                      name="reraCode"
                      value={formData.reraCode}
                      onChange={handleChange}
                      placeholder="ABC-12345"
                    />
                    <InputField
                      label="Status"
                      name="projectStatus"
                      type="select"
                      value={formData.projectStatus}
                      onChange={handleChange}
                      options={["Active", "Completed", "On Hold"]}
                      placeholder="Select Status"
                    />
                    <InputField
                      label="Type"
                      name="projectType"
                      type="select"
                      value={formData.projectType}
                      onChange={handleChange}
                      options={["Residential", "Commercial"]}
                      placeholder="Select Type"
                    />
                    <InputField
                      label="Launch Date"
                      name="launchDate"
                      type="date"
                      value={formData.launchDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="form-label small fw-bold text-muted">
                      Internal Notes
                    </label>
                    <textarea
                      className="form-control border-0 bg-light p-3 shadow-inner"
                      style={{ borderRadius: "16px" }}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Add specific deal details..."
                      rows="3"
                    />
                  </div>

                  <div className="d-flex gap-3 mt-5">
                    <button
                      type="button"
                      className="btn btn-light w-100 py-3 fw-bold rounded-4"
                      onClick={() => setShowAddModal(false)}
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="btn text-white w-100 py-3 fw-bold rounded-4"
                      style={{ background: "#4f46e5", border: "none" }}
                    >
                      Save Opportunity
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .tracking-tight { letter-spacing: -0.025em; }
        .table-hover tbody tr:hover { background-color: #f8fafc !important; cursor: pointer; transition: 0.2s; }
        .form-control:focus, .form-select:focus { 
          border: 1px solid #6366f1 !important; 
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1) !important; 
        }
        input::-webkit-calendar-picker-indicator { opacity: 0.4; }
      `}</style>
    </div>
  );
}

export default Opportunities;
