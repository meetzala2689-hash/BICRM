import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "bootstrap-icons/font/bootstrap-icons.css";

const reportsData = [
  { id: 1, name: "Sales Q1", status: "Completed", date: "2026-03-01" },
  { id: 2, name: "Inventory", status: "In Progress", date: "2026-03-05" },
  { id: 3, name: "Employee Feedback", status: "Pending", date: "2026-03-10" },
  { id: 4, name: "Marketing Campaign", status: "Completed", date: "2026-03-12" },
  { id: 5, name: "Customer Survey", status: "In Progress", date: "2026-03-15" },
  { id: 6, name: "Finance Audit", status: "Completed", date: "2026-03-16" },
  { id: 7, name: "Product Launch", status: "Pending", date: "2026-03-17" },
];

function Report() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(5);

  const handlePageSizeChange = (e) => {
    setReportsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredReports = reportsData
    .filter((r) => statusFilter === "All" || r.status === statusFilter)
    .filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Users",
        data: [1245, 1300, 1350, 1400, 1450],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.05)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#6366f1",
        pointRadius: 4,
      },
      {
        label: "Reports",
        data: [300, 310, 320, 330, 324],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.05)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header Section */}
      <header className="d-flex justify-content-between align-items-center mb-5 mt-2">
        <div>
          <h2 className="fw-bold text-slate-900 mb-1">Reports Dashboard</h2>
          <p className="text-muted small mb-0">Manage and analyze your operational data streams.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-white border shadow-sm rounded-3 px-3 py-2 fw-semibold small">
            <i className="bi bi-download me-2"></i>Export
          </button>
          <button className="btn btn-indigo shadow-sm rounded-3 px-3 py-2 fw-semibold small">
            <i className="bi bi-plus-lg me-2"></i>Create Report
          </button>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="row g-4 mb-5">
        {[
          { label: "Active Users", val: "1,245", icon: "bi-people", color: "indigo", trend: "+12%" },
          { label: "Total Reports", val: "324", icon: "bi-file-earmark-text", color: "emerald", trend: "+5%" },
          { label: "Pending Tasks", val: "87", icon: "bi-clock", color: "amber", trend: "-2%" }
        ].map((stat, i) => (
          <div className="col-md-4" key={i}>
            <div className="card border-0 shadow-sm rounded-4 hover-lift overflow-hidden">
              <div className="card-body p-4 d-flex align-items-center">
                <div className={`bg-${stat.color === 'indigo' ? 'primary' : stat.color === 'emerald' ? 'success' : 'warning'} bg-opacity-10 p-3 rounded-4 me-3`}>
                  <i className={`bi ${stat.icon} fs-3 text-${stat.color === 'indigo' ? 'primary' : stat.color === 'emerald' ? 'success' : 'warning'}`}></i>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small fw-bold text-uppercase tracking-wider">{stat.label}</span>
                    <span className={`small fw-bold text-${stat.trend.includes('+') ? 'success' : 'danger'}`}>{stat.trend}</span>
                  </div>
                  <h3 className="fw-bold mb-0 mt-1 text-slate-900">{stat.val}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart & Filtering Row */}
      <div className="row g-4 mb-4">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold m-0 text-slate-800">Usage Analytics</h6>
              <span className="badge bg-light text-muted fw-medium rounded-pill px-3 py-2">Real-time Data</span>
            </div>
            <div style={{ height: "300px" }}>
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <h6 className="fw-bold mb-4 text-slate-800">Filter Engine</h6>
            <div className="mb-4">
              <label className="small fw-bold text-muted mb-2 text-uppercase tracking-tighter">Search Document</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="bi bi-search text-muted"></i></span>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  placeholder="Report name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="small fw-bold text-muted mb-2 text-uppercase tracking-tighter">Status Filter</label>
              <div className="d-flex flex-wrap gap-2">
                {["All", "Completed", "In Progress", "Pending"].map((status) => (
                  <button
                    key={status}
                    className={`btn btn-sm px-3 rounded-pill transition-all fw-medium ${statusFilter === status ? "btn-indigo shadow-sm" : "btn-light text-muted border"}`}
                    onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="small fw-bold text-muted mb-2 text-uppercase tracking-tighter">Rows Per Page</label>
              <select
                className="form-select border-0 bg-light rounded-3 fw-medium text-slate-700"
                value={reportsPerPage}
                onChange={handlePageSizeChange}
              >
                {[5, 10, 20, 50].map(v => <option key={v} value={v}>{v} Reports</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-5">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-slate-50 border-bottom">
              <tr className="text-muted small fw-bold text-uppercase tracking-wider">
                <th className="ps-4 py-3">Reference ID</th>
                <th>Report Name</th>
                <th>Process Status</th>
                <th>Registry Date</th>
                <th className="pe-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="border-0">
              {currentReports.length > 0 ? (
                currentReports.map((report) => (
                  <tr key={report.id} className="transition-all border-bottom-light">
                    <td className="ps-4 text-muted fw-medium"># {report.id.toString().padStart(3, '0')}</td>
                    <td className="fw-bold text-slate-800">{report.name}</td>
                    <td>
                      <span className={`badge px-3 py-2 rounded-pill fw-semibold bg-opacity-10 ${report.status === "Completed" ? "bg-success text-success" :
                        report.status === "In Progress" ? "bg-primary text-primary" : "bg-warning text-warning"
                        }`}>
                        <i className="bi bi-dot fs-5 align-middle"></i> {report.status}
                      </span>
                    </td>
                    <td className="text-muted small">{report.date}</td>
                    <td className="pe-4 text-end">
                      <button className="btn btn-sm btn-icon border-0 rounded-circle"><i className="bi bi-three-dots"></i></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted small">
                    <i className="bi bi-search fs-2 mb-2 d-block opacity-25"></i>
                    No matching results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top bg-light bg-opacity-50 d-flex justify-content-between align-items-center">
            <span className="text-muted small fw-medium">Showing page {currentPage} of {totalPages}</span>
            <div className="d-flex gap-1">
              <button className="btn btn-sm btn-white border px-3 rounded-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
              <button className="btn btn-sm btn-white border px-3 rounded-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-5 py-3 px-0 border-top d-flex justify-content-between align-items-center">
        <p className="mb-0 text-muted small">© 2026 <span className="fw-bold text-slate-900">KiritTech</span> Studio</p>
        <div className="d-flex gap-4">
          {["System Logs", "Knowledge Base", "Support"].map(link => (
            <a href="#" key={link} className="text-decoration-none text-muted small hover-indigo transition-all">{link}</a>
          ))}
        </div>
      </footer>

      <style>{`
        .hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; cursor: default; }
        .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 15px 30px -5px rgba(0,0,0,0.08) !important; }
        .btn-indigo { background: #6366f1; color: white; border: none; }
        .btn-white { background: #fff; color: #475569; }
        .btn-icon { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .hover-indigo:hover { color: #6366f1 !important; }
      `}</style>
    </div>
  );
}

export default Report;