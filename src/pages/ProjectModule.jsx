import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Reusable InputField
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error = "",
  options = [],
}) => (
  <div className="col-md-4 position-relative mb-3">
    <label htmlFor={name} className="form-label">
      {label}
      {required && " *"}
    </label>
    {type === "select" ? (
      <select
        id={name}
        name={name}
        className="form-select placeholder-opacity-50"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">{placeholder || "Select an option"}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        className="form-control placeholder-opacity-50"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    )}
    {error && <div className="invalid-feedback d-block">{error}</div>}
  </div>
);

function ProjectModule() {
  const location = useLocation();
  const navigate = useNavigate();
  const projectToEdit = location.state?.project;
  const orgId = location.state?.orgId || localStorage.getItem("selectedOrgId");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    projectCode: projectToEdit?.projectCode || "",
    projectName: projectToEdit?.projectName || "",
    developerName: projectToEdit?.developerName || "",
    reraCode: projectToEdit?.reraCode || "",
    promoterType: projectToEdit?.promoterType || "",
    legalStatus: projectToEdit?.legalStatus || "",
    projectRating: projectToEdit?.projectRating || "",
    projectStatus: projectToEdit?.projectStatus || "",
    projectType: projectToEdit?.projectType || "",
    launchDate: projectToEdit?.launchDate || "",
    possessionDate: projectToEdit?.possessionDate || "",
    notes: projectToEdit?.notes || "",
    orgId: projectToEdit?.orgId || orgId, // Preserve or set orgId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let tempErrors = {};
    const requiredFields = [
      "projectCode",
      "projectName",
      "developerName",
      "reraCode",
      "promoterType",
      "legalStatus",
      "projectRating",
      "projectStatus",
      "projectType",
      "launchDate",
      "possessionDate",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        tempErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} is required`;
      }
    });

    if (formData.launchDate && formData.possessionDate) {
      // if (new Date(formData.possessionDate) < new Date(formData.launchDate)) {
      // tempErrors.possessionDate =
      // "Possession date cannot be before launch date";
      // }
    }

    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const projectIndex = savedProjects.findIndex(
      (p) => p.projectCode === formData.projectCode,
    );

    const projectData = { ...formData, orgId: formData.orgId || orgId };

    if (projectIndex >= 0) {
      savedProjects[projectIndex] = projectData;
    } else {
      savedProjects.push(projectData);
    }

    localStorage.setItem("projects", JSON.stringify(savedProjects));
    navigate("/project", { state: { orgId } });
  };

  const handleCancel = () => {
    navigate("/project"); // redirect back instead of clearing
  };

  return (
    <div className="container mt-4 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-3">{projectToEdit ? "Edit Project" : "Add Project"}</h4>
        <button
          className="btn btn-light rounded-circle p-2 border-0 shadow-none"
          onClick={(handleCancel)}
          style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ fontSize: '20px', lineHeight: '0' }}>&times;</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h6 className="bg-info bg-opacity-10 px-3 py-2 rounded mb-3">
            Basic Details
          </h6>
          <div className="row g-3">
            <InputField
              label="Project Code"
              name="projectCode"
              value={formData.projectCode}
              onChange={handleChange}
              placeholder="Enter Project Code"
              required
              error={errors.projectCode}
            />
            <InputField
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter Project Name"
              required
              error={errors.projectName}
            />
            <InputField
              label="Developer/Promoter Name"
              name="developerName"
              value={formData.developerName}
              onChange={handleChange}
              placeholder="Enter Developer Name"
              required
              error={errors.developerName}
            />
            <InputField
              label="RERA Code"
              name="reraCode"
              value={formData.reraCode}
              onChange={handleChange}
              placeholder="Enter RERA Code"
              required
              error={errors.reraCode}
            />
            <InputField
              label="Promoter Type"
              name="promoterType"
              type="select"
              value={formData.promoterType}
              onChange={handleChange}
              options={["Partnership", "LLP", "Other", "Individual"]}
              placeholder="Select Promoter Type"
              required
              error={errors.promoterType}
            />
            <InputField
              label="Legal Status"
              name="legalStatus"
              type="select"
              value={formData.legalStatus}
              onChange={handleChange}
              options={["Ongoing", "Completed", "Paused"]}
              placeholder="Select Legal Status"
              required
              error={errors.legalStatus}
            />
            <InputField
              label="Project Rating"
              name="projectRating"
              type="select"
              value={formData.projectRating}
              onChange={handleChange}
              options={["A+", "A", "B", "C"]}
              placeholder="Select Rating"
              required
              error={errors.projectRating}
            />
            <InputField
              label="Project Status"
              name="projectStatus"
              type="select"
              value={formData.projectStatus}
              onChange={handleChange}
              options={["On Hold", "Active", "Completed"]}
              placeholder="Select Status"
              required
              error={errors.projectStatus}
            />
            <InputField
              label="Project Type"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              placeholder="Enter Project Type"
              required
              error={errors.projectType}
            />
          </div>
        </div>

        <div className="mb-3">
          <h6 className="bg-info bg-opacity-10 px-3 py-2 rounded mb-3">
            Important Dates
          </h6>
          <div className="row g-3">
            <InputField
              label="Launch Date"
              name="launchDate"
              type="date"
              value={formData.launchDate}
              onChange={handleChange}
              error={errors.launchDate}
            />
            <InputField
              label="Possession Date"
              name="possessionDate"
              type="date"
              value={formData.possessionDate}
              onChange={handleChange}
              error={errors.possessionDate}
            />
          </div>
        </div>

        <div className="mb-3">
          <h6 className="bg-info bg-opacity-10 px-3 py-2 rounded mb-3">
            Notes
          </h6>
          <textarea
            name="notes"
            className="form-control border-2 mt-3 placeholder-opacity-50"
            value={formData.notes}
            style={{ height: "15vh" }}
            onChange={handleChange}
            placeholder="Enter any additional notes..."
          ></textarea>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectModule;
