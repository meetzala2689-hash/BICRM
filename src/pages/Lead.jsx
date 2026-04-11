import React, { useState, useEffect, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function Lead() {
  const [lineData, setLineData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Leads",
        data: [12, 19, 1, 21, 17, 25],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#6366f1",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Revenue",
        data: [5, 9, 6, 12, 8, 15],
        borderColor: "#f43f5e",
        backgroundColor: "rgba(244, 63, 94, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#f43f5e",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  });

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const barData = useMemo(
    () => ({
      labels: ["Completed", "Pending", "In Progress", "Overdue"],
      datasets: [
        {
          label: "Tasks",
          data: [8, 5, 3, 9],
          backgroundColor: ["#10b981", "#f59e0b", "#6366f1", "#f43f5e"],
          borderRadius: 8,
          barThickness: 25,
        },
      ],
    }),
    [],
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1e293b",
          padding: 12,
          titleFont: { size: 14 },
          bodyFont: { size: 13 },
          cornerRadius: 8,
        },
      },
      scales: {
        y: {
          grid: { color: "#f1f5f9", drawBorder: false },
          ticks: { color: "#94a3b8" },
        },
        x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
      },
    }),
    [],
  );

  const projects = useMemo(
    () => [
      {
        name: "Project Alpha",
        status: "Ongoing",
        start: "2026-01-01",
        end: "2026-06-01",
        owner: "Jane Doe",
        priority: "High",
        progress: 60,
      },
      {
        name: "Project Beta",
        status: "Completed",
        start: "2025-05-01",
        end: "2025-12-15",
        owner: "John Smith",
        priority: "Medium",
        progress: 100,
      },
      {
        name: "Project Gamma",
        status: "Pending",
        start: "2026-03-10",
        end: "2026-09-30",
        owner: "Emily Davis",
        priority: "Critical",
        progress: 10,
      },
      {
        name: "Project Delta",
        status: "Ongoing",
        start: "2026-02-15",
        end: "2026-08-20",
        owner: "Michael Brown",
        priority: "High",
        progress: 45,
      },
      {
        name: "Project Epsilon",
        status: "Completed",
        start: "2025-03-01",
        end: "2025-10-10",
        owner: "Sarah Wilson",
        priority: "Low",
        progress: 100,
      },
      {
        name: "Project Zeta",
        status: "Ongoing",
        start: "2026-04-05",
        end: "2026-12-01",
        owner: "David Lee",
        priority: "Medium",
        progress: 30,
      },
    ],
    [],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return projects.slice(start, start + itemsPerPage);
  }, [currentPage, projects]);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header Section */}
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
          <h1 className="fw-bold text-slate-900 mb-1 h3">Lead Intelligence</h1>
          <p className="text-muted small mb-0">
            Operational overview for{" "}
            <span className="text-indigo-600 fw-semibold">KiritTech Studio</span>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="glass-card px-3 py-2 rounded-3 border shadow-sm bg-white">
            <span className="small fw-bold text-slate-600">
              <i className="bi bi-clock-history me-2 text-indigo-500"></i>
              {dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <button className="btn btn-dark rounded-3 px-4 py-2 fw-semibold shadow-sm hover-lift">
            <i className="bi bi-plus-lg me-2"></i>New Export
          </button>
        </div>
      </header>

      {/* Stat Cards */}
      <div className="row g-4 mb-5">
        {[
          { label: "Total Leads", val: "42", trend: "+12%", color: "indigo", icon: "bi-rocket-takeoff" },
          { label: "Active Tasks", val: "05", trend: "Steady", color: "amber", icon: "bi-list-check" },
          { label: "New Signups", val: "12", trend: "+4%", color: "emerald", icon: "bi-person-badge" },
        ].map((s, i) => (
          <div className="col-md-4" key={i}>
            <div className="card border-0 shadow-sm rounded-4 hover-lift p-2 overflow-hidden">
              <div className="card-body d-flex align-items-center" style={{ borderLeft: `5px solid ${s.color === "indigo" ? "#6366f1" : s.color === "amber" ? "#f59e0b" : "#10b981"}` }}>
                <div className={`bg-${s.color === "indigo" ? "primary" : s.color === "amber" ? "warning" : "success"} bg-opacity-10 p-3 rounded-4 me-3`}>
                  <i className={`bi ${s.icon} fs-4 text-${s.color === "indigo" ? "primary" : s.color === "amber" ? "warning" : "success"}`}></i>
                </div>
                <div>
                  <span className="text-muted small fw-bold text-uppercase tracking-tighter" style={{ fontSize: "0.65rem" }}>{s.label}</span>
                  <div className="d-flex align-items-center gap-2">
                    <h2 className="fw-bold mb-0">{s.val}</h2>
                    <span className="badge bg-light text-dark border-0 small fw-medium" style={{ fontSize: "0.7rem" }}>{s.trend}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Analytics */}
      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold m-0 text-slate-800">Performance Real-time</h6>
              <button className="btn btn-sm btn-light border-0 text-muted px-3 rounded-pill">Monthly <i className="bi bi-chevron-down ms-1"></i></button>
            </div>
            <div style={{ height: "280px" }}>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <h6 className="fw-bold mb-4 text-slate-800">Task Allocation</h6>
            <div style={{ height: "280px" }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
        <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0 text-slate-800">Recent Project Streams</h6>
          <button className="btn btn-sm text-indigo-600 fw-bold border-0 p-0">View All Analytics</button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-slate-50 text-slate-500">
              <tr className="small fw-bold text-uppercase tracking-wider">
                <th className="ps-4 border-0 py-3">Project Detail</th>
                <th className="border-0">Stream Status</th>
                <th className="border-0">Owner</th>
                <th className="border-0">Priority</th>
                <th className="border-0" style={{ width: "200px" }}>Completion</th>
                <th className="pe-4 border-0 text-end">Manage</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {currentProjects.map((p, index) => (
                <tr key={index} className="border-bottom-0">
                  <td className="ps-4 py-3">
                    <div className="fw-bold text-slate-900">{p.name}</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>Start: {p.start}</div>
                  </td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 fw-medium bg-opacity-10 ${p.status === "Completed" ? "bg-success text-success" : p.status === "Ongoing" ? "bg-primary text-primary" : "bg-warning text-warning"}`}>{p.status}</span>
                  </td>
                  <td className="text-slate-600 small fw-medium">{p.owner}</td>
                  <td>
                    <div className={`d-inline-flex align-items-center gap-1 small fw-bold text-${p.priority === "Critical" ? "danger" : p.priority === "High" ? "warning" : "info"}`}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "currentColor" }}></div>{p.priority}</div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress flex-grow-1" style={{ height: "6px", borderRadius: 10, backgroundColor: "#f1f5f9" }}><div className="progress-bar rounded-pill" style={{ width: `${p.progress}%`, backgroundColor: p.progress === 100 ? "#10b981" : "#6366f1" }}></div></div>
                      <span className="small fw-bold text-slate-500">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="pe-4 text-end">
                    <button className="btn btn-icon btn-light rounded-circle border-0 me-2"><i className="bi bi-eye"></i></button>
                    <button className="btn btn-icon btn-soft-indigo rounded-circle border-0"><i className="bi bi-pencil-square"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-top bg-white d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center">
            <div className="bg-indigo-50 text-indigo-600 rounded-pill px-3 py-1 me-2 d-flex align-items-center" style={{ fontSize: "0.75rem", fontWeight: "600" }}><span className="p-1 bg-indigo-500 rounded-circle me-2"></span>Live Stream</div>
            <span className="text-slate-500 small fw-medium">Showing page <span className="text-slate-900 fw-bold">{currentPage}</span> of <span className="text-slate-900 fw-bold">{totalPages}</span></span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-modern-nav" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}><i className="bi bi-chevron-left me-1"></i>Prev</button>
            <button className="btn btn-modern-nav" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next<i className="bi bi-chevron-right ms-1"></i></button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5 py-3 px-0 border-top d-flex justify-content-between align-items-center">
        <p className="mb-0 text-slate-400 small">© 2026 <span className="fw-bold text-slate-900">KiritTech</span>. Engineering for Tomorrow.</p>
        <div className="d-flex gap-4">
          {["System Status", "Support Docs", "Contact HQ"].map((link) => (
            <a href="#" key={link} className="text-decoration-none text-slate-500 small hover-indigo transition-all">{link}</a>
          ))}
        </div>
      </footer>

      <style>{`
        .hover-lift { transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .hover-lift:hover { transform: translateY(-5px); }
        .btn-soft-indigo { background: rgba(99, 102, 241, 0.1); color: #6366f1; }
        .hover-indigo:hover { color: #6366f1 !important; }
        .btn-modern-nav { background: #ffffff; border: 1px solid #e2e8f0; color: #475569; font-size: 0.85rem; font-weight: 600; padding: 0.5rem 1rem; border-radius: 10px; transition: all 0.2s ease; display: flex; align-items: center; }
        .btn-modern-nav:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; color: #1e293b; transform: translateY(-1px); }
        .btn-modern-nav:disabled { opacity: 0.5; cursor: not-allowed; background: #f1f5f9; }
        .btn-icon { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; padding: 0; }
        .bg-indigo-50 { background-color: #eef2ff; }
        .text-indigo-600 { color: #4f46e5; }
        .bg-indigo-500 { background-color: #6366f1; }
      `}</style>
    </div>
  );
}

export default Lead;
