import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Project({ projects }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const orgId = location.state?.orgId || localStorage.getItem("selectedOrgId");
  const orgName = location.state?.orgName || localStorage.getItem("selectedOrgName");

  const [projectList, setProjectList] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : projects || [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projectList));
  }, [projectList]);

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index); // toggle menu
  };

  const handleAction = (action, project) => {
    if (action === "view") {
      console.log("View", project);
    } else if (action === "edit") {
      // Navigate to ProjectModule and pass project data
      navigate("/ProjectModule", { state: { project, orgId } });
    } else if (action === "delete") {
      const updatedList = projectList.filter(
        (p) => p.projectCode !== project.projectCode,
      );
      setProjectList(updatedList);
    }
    setActiveMenu(null);
  };

  const filteredProjects = projectList.filter(
    (project) => {
      const matchesSearch = 
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.projectCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesOrg = !orgId || String(project.orgId) === String(orgId);
      
      return matchesSearch && matchesOrg;
    }
  );

  return (
    <div className="m-4">
      {/* Header */}
      <div className="box d-flex align-items-center gap-5">
        <h1 className="me-5">Welcome to your Project</h1>

        <div className="box d-flex align-items-center gap-3 shadow-sm p-2 pe-4 ps-4 rounded-5 justify-content-end ms-5">
          <p className="mb-0 d-flex align-items-center">
            <i className="bi bi-building me-2 fs-5"></i>
            {orgName || "Select Organization"}
          </p>

          <button
            onClick={() => navigate("/ProjectModule", { state: { orgId } })}
            className="ps-3 pe-3 border-0 rounded fw-bold d-flex align-items-center gap-2 text-primary bg-light"
          >
            <i className="bi bi-plus-lg text-primary"></i>
            New Project
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="ps-3 pe-3 border-0 rounded fw-bold d-flex align-items-center gap-2 bg-light text-primary"
          >
            <span className="d-flex align-items-center mb-0">
              <i className="bi bi-bar-chart-line me-2 fs-5"></i>
              Common Dashboard
            </span>
          </button>
          <p 
            className="mb-0 d-flex align-items-center" 
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/organization")}
          >
            <i className="bi bi-arrow-left-right me-2 fs-5"></i>
            Change
          </p>
        </div>
      </div>

      <h6 className="mb-5 mt-3">
        Select a project to view its dashboard, or create a new one to get
        started.
      </h6>

      {/* Search Bar */}
      <div
        className="input-group input-group-sm shadow-sm rounded-4 mt-5 p-2"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <span className="input-group-text border-0 bg-transparent ps-3">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control p-2 ps-3 border-0 rounded-5 fw-bold"
          placeholder="Search project..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/*new Project Cards */}

      <div className="d-flex justify-content-center align-items-center mt-5 flex-wrap gap-4">
        {/* Create Project Card */}
        <div
          className="card text-center p-4 shadow-sm rounded-4 border-0 border-start border-warning border-4 d-flex flex-column align-items-center justify-content-center"
          style={{
            cursor: "pointer",
            width: "280px",
            minHeight: "250px",
            transition: "all 0.3s ease",
          }}
          onClick={() => navigate("/ProjectModule")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.classList.remove("shadow-sm");
            e.currentTarget.classList.add("shadow");
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.classList.remove("shadow");
            e.currentTarget.classList.add("shadow-sm");
          }}
        >
          <i className="bi bi-plus-circle fs-1 text-secondary opacity-50 mb-3"></i>
          <h5 className="mb-2 fw-bold">Create New Project</h5>
          <p className="text-muted mb-0">Start from scratch</p>
        </div>

        {/* Project List */}
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="card p-3 shadow-sm rounded-4 d-flex flex-column border-0 border-start border-primary border-4 justify-content-between position-relative"
            style={{
              width: "280px",
              minHeight: "250px",
              // borderstart: "6px solid #0d6efd", 
              backgroundColor: "#f5f7ff",
              color: "#4a4a4a",
            }}

            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.classList.remove("shadow-sm");
              e.currentTarget.classList.add("shadow");
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.classList.remove("shadow");
              e.currentTarget.classList.add("shadow-sm");
            }}

          >
            {/* Project header with code and status */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small style={{ color: "#7a7a9d", fontWeight: "600" }}>
                PROJ-{project.projectCode}
              </small>
              <span
                style={{
                  fontSize: "0.7rem",
                  backgroundColor: "#dbe1ff",
                  color: "#4a5dff",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontWeight: "600",
                }}
              >
                {project.status || "On Hold"}
              </span>
              {/* Three-dot menu icon */}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleMenuClick(index)}
              >
                <i className="bi bi-three-dots-vertical"></i>
              </div>
            </div>

            <div onClick={() => navigate("/dashboard")} >
              {/* Project name */}
              <h5 style={{ fontWeight: "700", marginBottom: "1rem" }}>
                {project.projectName}
              </h5>

              {/* Progress label and value */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <small style={{ color: "#7a7a9d", fontWeight: "600" }}>
                  Progress
                </small>
                <small style={{ fontWeight: "700" }}>
                  {project.progress || 0}%
                </small>
              </div>

              {/* Members and time info */}
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ fontSize: "0.9rem", color: "#7a7a9d" }}
                onClick={() => navigate("/dashboard")}
              >
                <div className="d-flex align-items-center gap-1">
                  <i className="bi bi-people-fill"></i>
                  <small>{project.members || 1} Members</small>
                </div>
                <small>
                  <i className="bi bi-clock"></i>{" "}
                  {project.timeAgo || "Just now"}
                </small>
              </div>
            </div>

            {/* Menu options when active */}
            {activeMenu === index && (
              <div
                className="position-absolute bg-white border  shadow rounded-2"
                style={{ top: "40px", right: "10px", zIndex: 1000 }}
              >
                <div
                  className="p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/dashboard")}
                >
                  View Details
                </div>
                <div
                  className="p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAction("edit", project)}
                >
                  Edit Details
                </div>
                <div
                  className="p-2 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAction("delete", project)}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
