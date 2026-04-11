import React, { useState } from "react";

function Profile() {
  const [activeTab, setActiveTab] = useState("timeline");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    phone: "",
    bio: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    companyName: "",
    companyWebsite: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    dribbble: "",
    github: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
};

  return (
    <div>
      <div className="flex-grow-1 p-0 p-lg-2">
        {/* Header banner */}
        <div className="fw-bold m-2 mb-3">
          <h6>Profile</h6>
        </div>
        <div
          className="bg-dark text-white rounded mb-4 d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "250px",
            backgroundImage: 'url("/Image/images(2).jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          <blockquote className="blockquote fs-5 fst-italic text-center mb-3">  
            Crafting innovation through clean design
          </blockquote>
          <footer className="blockquote-footer text-white">MyStatus</footer>
        </div>

        <div
          className="row position-relative p-4"
          style={{ top: "-70px", zIndex: "9999" }}
        >
          {/* Left sidebar with user info */}
          <aside className="col-xl-5 col-lg-3  mb-3">
            <div className="position-sticky " style={{ top: "0.5rem" }}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  {/* Profile Header */}
                  <div className="d-flex align-items-center mb-3">
                    <div>
                      <h6 className="mb-0">
                        David Dev{" "}
                        <span role="img" aria-label="US flag">
                          🇺🇸
                        </span>
                      </h6>
                      <small className="text-muted d-block">
                        Senior Developer
                      </small>
                      <span className="badge bg-secondary mt-1">Team Lead</span>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <ul className="list-unstyled small mb-0 p-3">
                    {/* Role */}
                    <li className="d-flex align-items-center mb-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <i className="bi bi-laptop text-white fs-5"></i>
                      </div>
                      UI/UX Designer &amp; Full-Stack Developer
                    </li>

                    {/* Education */}
                    <li className="d-flex align-items-center mb-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <i className="bi bi-mortarboard text-white fs-5"></i>
                      </div>
                      Studied at <strong>Stanford University</strong>
                    </li>

                    {/* Location */}
                    <li className="d-flex align-items-center mb-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <i className="bi bi-geo-alt text-white fs-5"></i>
                      </div>
                      Lives in <strong>San Francisco, CA</strong>
                    </li>

                    {/* Followers */}
                    <li className="d-flex align-items-center mb-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <i className="bi bi-people text-white fs-5"></i>
                      </div>
                      Followed by <strong>25.3k People</strong>
                    </li>

                    {/* Email */}
                    <li className="d-flex align-items-center mb-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <i className="bi bi-envelope text-white fs-5"></i>
                      </div>
                      Email: <strong>oig@gmail.com</strong>
                    </li>

                    {/* Website */}
                    <li className="d-flex align-items-center mb-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <i className="bi bi-globe text-white fs-5"></i>
                      </div>
                      Website: <strong>www.example.dev</strong>
                    </li>

                    {/* Languages */}
                    <li className="d-flex align-items-center mb-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <i className="bi bi-translate text-white fs-5"></i>
                      </div>
                      Languages: <strong>English, Japanese</strong>
                    </li>
                  </ul>

                  {/* Social Media Links */}
                  <ul className="list-unstyled d-flex justify-content-center mt-3 p-0">
                    {/* Facebook */}
                    <li className="me-2">
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                          alt="Facebook"
                          style={{ width: "36px", height: "36px" }}
                        />
                      </a>
                    </li>

                    {/* Instagram */}
                    <li className="me-2">
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                          alt="Instagram"
                          style={{ width: "36px", height: "36px" }}
                        />
                      </a>
                    </li>

                    {/* WhatsApp */}
                    <li className="me-2">
                      <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                          alt="WhatsApp"
                          style={{ width: "36px", height: "36px" }}
                        />
                      </a>
                    </li>

                    {/* Telegram */}
                    <li className="me-2">
                      <a
                        href="https://t.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                          alt="Telegram"
                          style={{ width: "36px", height: "36px" }}
                        />
                      </a>
                    </li>
                  </ul>

                  {/* Skills */}
                  <div>
                    <h6 className="mb-2 m-3">Skills</h6>
                    <div className="d-flex flex-wrap">
                      {[
                        "Product Design",
                        "UI/UX",
                        "Tailwind CSS",
                        "Bootstrap",
                        "React.js",
                        "Next.js",
                        "Vue.js",
                        "Figma",
                        "Design Systems",
                        "Template Authoring",
                        "Responsive Design",
                        "Component Libraries",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="badge text-dark opacity-50 bg-light m-1 gap-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content area */}
          <section className="col-xl-7 col-lg-9 rounded shadow-sm card-body bg-white shadow-sm">
            {/* Tabs */}
            <div className="p-1">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="ps-2">My Account</h5>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "about" ? "active" : ""}`}
                      onClick={() => setActiveTab("about")}
                    >
                      About Me
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "timeline" ? "active" : ""}`}
                      onClick={() => setActiveTab("timeline")}
                    >
                      Timeline
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
                      onClick={() => setActiveTab("settings")}
                    >
                      Settings
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* About */}
            {activeTab === "about" && (
              <div className="p-3">
                {/* Pare... */}
                <div>
                  <p>
                    I'm an Admin Template Author dedicated to building clean,
                    efficient, and highly customizable dashboards for developers
                    and businesses. My goal is to create UI solutions that are
                    modern, scalable, and easy to integrate
                  </p>

                  <p>
                    I specialize in crafting developer-friendly admin panels and
                    UI kits using frameworks like Bootstrap, Tailwind CSS,
                    React, Vue, Angular, Laravel, and Next.js. My templates are
                    designed to accelerate development and provide a strong
                    foundation for web apps, SaaS platforms, and enterprise
                    tools.
                  </p>
                  <p>
                    I focus on delivering well-structured, pixel-perfect layouts
                    with a user-centric approach—ensuring responsive design,
                    clean code, and seamless user experiences. Whether you're
                    building a CRM, analytics dashboard, or backend system, my
                    templates are made to help you build faster and smarter.
                  </p>
                </div>

                {/* PROFESSIONAL EXPERIENCE  */}
                <div className="mb-4 p-3">
                  <h6 className="d-flex align-items-center mb-4">
                    <i className="bi bi-briefcase me-2"></i>
                    PROFESSIONAL EXPERIENCE :
                  </h6>

                  <div className="timeline">
                    {/* Experience Item 1 */}
                    <div className="d-flex mb-4 position-relative justify-content-center">
                      <div
                        className="text-end me-4 opacity-50"
                        style={{ width: "100px", whiteSpace: "nowrap" }}
                      >
                        2023 – Present
                      </div>
                      <div className="position-relative me-3">
                        <span
                          className="timeline-dot bg-primary rounded-circle position-absolute"
                          style={{
                            width: "12px",
                            height: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: "0",
                          }}
                        ></span>
                        <div
                          className="timeline-line position-absolute bg-light"
                          style={{
                            width: "2px",
                            top: "12px",
                            bottom: "0",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        ></div>
                      </div>
                      <div>
                        <h5 className="mb-1">Lead UI Developer</h5>
                        <p className="mb-1 text-secondary">
                          Developing scalable and reusable UI components for
                          SaaS dashboards using React, Tailwind CSS, and
                          TypeScript.
                        </p>
                        <span className="fw-semibold text-muted">
                          at CraftCode Studio
                        </span>
                      </div>
                    </div>

                    {/* Experience Item 2 */}
                    <div className="d-flex mb-4 position-relative">
                      <div
                        className="text-end me-4 opacity-50"
                        style={{ width: "100px", whiteSpace: "nowrap" }}
                      >
                        2021 – 2023
                      </div>
                      <div className="position-relative me-3">
                        <span
                          className="timeline-dot bg-success rounded-circle position-absolute"
                          style={{
                            width: "12px",
                            height: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: "0",
                          }}
                        ></span>
                        <div
                          className="timeline-line position-absolute bg-light"
                          style={{
                            width: "2px",
                            top: "12px",
                            bottom: "0",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        ></div>
                      </div>
                      <div>
                        <h5 className="mb-1">Frontend Engineer</h5>
                        <p className="mb-1 text-secondary">
                          Built modern, responsive admin templates and UI kits
                          using Vue, Bootstrap 5, and Laravel Blade.
                        </p>
                        <span className="fw-semibold text-muted">
                          at CodeNova
                        </span>
                      </div>
                    </div>

                    {/* Experience Item 3 */}
                    <div className="d-flex mb-4 position-relative justify-content-center">
                      <div
                        className="text-end me-4 opacity-50"
                        style={{ width: "100px", whiteSpace: "nowrap" }}
                      >
                        2019 – 2021
                      </div>
                      <div className="position-relative me-3">
                        <span
                          className="timeline-dot bg-warning rounded-circle position-absolute"
                          style={{
                            width: "12px",
                            height: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: "0",
                          }}
                        ></span>
                        <div
                          className="timeline-line position-absolute bg-light"
                          style={{
                            width: "2px",
                            top: "12px",
                            bottom: "0",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        ></div>
                      </div>
                      <div>
                        <h5 className="mb-1">UI/UX Designer & Developer</h5>
                        <p className="mb-1 text-secondary">
                          Designed and developed dashboard layouts and admin
                          panel concepts, focusing on accessibility and
                          performance.{" "}
                        </p>
                        <span className="fw-semibold text-muted">
                          as Freelancer
                        </span>
                      </div>
                    </div>

                    {/* Experience Item 4 */}
                    <div className="d-flex mb-4 position-relative justify-content-center">
                      <div
                        className="text-end me-4 opacity-50"
                        style={{ width: "100px", whiteSpace: "nowrap" }}
                      >
                        2017 – 2019
                      </div>
                      <div className="position-relative me-3">
                        <span
                          className="timeline-dot bg-danger rounded-circle position-absolute"
                          style={{
                            width: "12px",
                            height: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: "0",
                          }}
                        ></span>
                        <div
                          className="timeline-line position-absolute bg-light"
                          style={{
                            width: "2px",
                            top: "12px",
                            bottom: "0",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        ></div>
                      </div>
                      <div>
                        <h5 className="mb-1">Web Designer</h5>
                        <p className="mb-1 text-secondary">
                          Created responsive HTML/CSS templates and themes for
                          clients in eCommerce and portfolio niches
                        </p>
                        <span className="fw-semibold text-muted">
                          at PixelFrame Agency
                        </span>
                      </div>
                    </div>

                    {/* Experience Item 5 */}
                    <div className="d-flex mb-4 position-relative justify-content-center">
                      <div
                        className="text-end me-4 opacity-50"
                        style={{ width: "100px", whiteSpace: "nowrap" }}
                      >
                        2015 – 2017
                      </div>
                      <div className="position-relative me-3">
                        <span
                          className="timeline-dot bg-primary rounded-circle position-absolute"
                          style={{
                            width: "12px",
                            height: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: "0",
                          }}
                        ></span>
                        <div
                          className="timeline-line position-absolute bg-light"
                          style={{
                            width: "2px",
                            top: "12px",
                            bottom: "0",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        ></div>
                      </div>
                      <div>
                        <h5 className="mb-1">Junior Frontend Developer</h5>
                        <p className="mb-1 text-secondary">
                          Maintained and updated legacy UI projects, gaining
                          hands-on experience in HTML, CSS, jQuery, and
                          Bootstrap
                        </p>
                        <span className="fw-semibold text-muted">
                          at DevLaunch
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tasks Overview */}
                <div className="p-3">
                  <div>
                    <h6>
                      <i className="bi bi-list pe-1"></i> Tasks Overview :
                    </h6>
                  </div>
                  <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                      <table className="table table-hover table-striped align-middle mb-0">
                        <thead className="table-dark">
                          <tr>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Assigned By</th>
                            <th>Start Date</th>
                            <th>Priority</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Blazor Admin Theme – Final QA</td>
                            <td>In-progress</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="https://randomuser.me/api/portraits/men/32.jpg"
                                  alt="Jordan Walsh"
                                  className="rounded-circle me-2"
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <span style={{ fontSize: "0.875rem" }}>
                                  Jordan Walsh &nbsp;
                                  <small className="text-muted">
                                    jordan@uxlabs.io
                                  </small>
                                </span>
                              </div>
                            </td>
                            <td>Jul 20, 2025</td>
                            <td>High</td>
                          </tr>
                          <tr>
                            <td>Vue 3 UI Kit Refactor</td>
                            <td>Pending</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="https://randomuser.me/api/portraits/men/45.jpg"
                                  alt="Alex Johnson"
                                  className="rounded-circle me-2"
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <span style={{ fontSize: "0.875rem" }}>
                                  Alex Johnson &nbsp;
                                  <small className="text-muted">
                                    alex@uxlabs.io
                                  </small>
                                </span>
                              </div>
                            </td>
                            <td>Aug 5, 2025</td>
                            <td>Medium</td>
                          </tr>
                          <tr>
                            <td>React Dashboard – Initial Setup</td>
                            <td>Completed</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="https://randomuser.me/api/portraits/women/21.jpg"
                                  alt="Sophie Turner"
                                  className="rounded-circle me-2"
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <span style={{ fontSize: "0.875rem" }}>
                                  Sophie Turner &nbsp;
                                  <small className="text-muted">
                                    sophie@uxlabs.io
                                  </small>
                                </span>
                              </div>
                            </td>
                            <td>Jun 12, 2025</td>
                            <td>High</td>
                          </tr>
                          <tr>
                            <td>Angular Admin Theme – Bug Fixes</td>
                            <td>In-progress</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="https://randomuser.me/api/portraits/men/67.jpg"
                                  alt="Michael Brown"
                                  className="rounded-circle me-2"
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <span style={{ fontSize: "0.875rem" }}>
                                  Michael Brown &nbsp;
                                  <small className="text-muted">
                                    michael@uxlabs.io
                                  </small>
                                </span>
                              </div>
                            </td>
                            <td>Jul 30, 2025</td>
                            <td>Low</td>
                          </tr>
                          <tr>
                            <td>Figma Prototype Review</td>
                            <td>Pending</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="https://randomuser.me/api/portraits/women/44.jpg"
                                  alt="Emma Watson"
                                  className="rounded-circle me-2"
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <span style={{ fontSize: "0.875rem" }}>
                                  Emma Watson &nbsp;
                                  <small className="text-muted">
                                    emma@uxlabs.io
                                  </small>
                                </span>
                              </div>
                            </td>
                            <td>Aug 10, 2025</td>
                            <td>Medium</td>
                          </tr>
                          <tr>
                            <td>Backend API Integration</td>
                            <td>In-progress</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="https://randomuser.me/api/portraits/men/52.jpg"
                                  alt="Daniel Craig"
                                  className="rounded-circle me-2"
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <span style={{ fontSize: "0.875rem" }}>
                                  Daniel Craig &nbsp;
                                  <small className="text-muted">
                                    daniel@uxlabs.io
                                  </small>
                                </span>
                              </div>
                            </td>
                            <td>Jul 28, 2025</td>
                            <td>High</td>
                          </tr>
                          <tr>
                            <td>UI Component Library Update</td>
                            <td>Completed</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="https://randomuser.me/api/portraits/women/33.jpg"
                                  alt="Olivia Wilde"
                                  className="rounded-circle me-2"
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <span style={{ fontSize: "0.875rem" }}>
                                  Olivia Wilde &nbsp;
                                  <small className="text-muted">
                                    olivia@uxlabs.io
                                  </small>
                                </span>
                              </div>
                            </td>
                            <td>Jun 25, 2025</td>
                            <td>Medium</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TimeLine */}
            {activeTab === "timeline" && (
              <div>
                <textarea
                  className="form-control mb-2"
                  rows="4"
                  placeholder="Write something..."
                ></textarea>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    title="Tag Person"
                  >
                    <i className="bi bi-person"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    title="Location"
                  >
                    <i className="bi bi-geo-alt"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    title="Add Photo"
                  >
                    <i className="bi bi-camera"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    title="Emoji"
                  >
                    <i className="bi bi-emoji-smile"></i>
                  </button>
                  <button type="button" className="btn btn-primary ms-auto">
                    Post
                  </button>
                </div>
              </div>
            )}

            {/* Setting */}
            {activeTab === "settings" && (
              <form onSubmit={handleSubmit}>
              <div className="p-3">
                
                {/* Personal Info */}
                <div className="mb-5">
                  <div className="d-flex text-uppercase justify-content-center mb-3">
                    <h6>
                      <i className="bi bi-person-circle text-dark me-2"></i>
                      Personal Info
                    </h6>
                  </div>

                  <div className="container">
                    {/* First + Last Name */}
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-control"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Job + Phone */}
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input
                          type="text"
                          id="jobTitle"
                          className="form-control"
                          placeholder="e.g UI Developer"
                          value={formData.jobTitle}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          className="form-control"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Bio full width */}
                    <div className="mb-2">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        id="bio"
                        className="form-control"
                        placeholder="Write something about yourself..."
                        value={formData.bio}
                        onChange={handleChange}
                        maxLength={400}
                      ></textarea>
                    </div>

                    {/* Email + Password */}
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Profile Photo */}
                    <div className="mb-2">
                      <label htmlFor="profilePhoto">Profile Photo</label>
                      <input
                        type="file"
                        id="profilePhoto"
                        className="form-control"
                        value={formData.profilePhoto}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Address info */}
                <div className="mb-4">
                  <div className="d-flex justify-content-center mb-3">
                    <h6>
                      <i className="bi bi-geo-fill text-dark me-2"></i>
                      ADDRESS INFO
                    </h6>
                  </div>

                  <div className="container">
                    {/* Address Line 1 */}
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="address1">Address Line 1</label>
                        <input
                          type="text"
                          id="address1"
                          className="form-control"
                          placeholder="Street, Apartment, Unit, etc"
                          value={formData.address1}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Address Line 2 */}

                      <div className="col-md-6">
                        <label htmlFor="address2">Address Line 2</label>
                        <input
                          type="text"
                          id="address2"
                          className="form-control"
                          placeholder="Optional"
                          value={formData.address2}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {/* City + State */}
                    <div className="row mb-2">
                      <div className="col-md-4">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          className="form-control"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="state">State / Province</label>
                        <input
                          type="text"
                          id="state"
                          className="form-control"
                          placeholder="State or Province"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="postal">Postal / ZIP Code</label>
                        <input
                          type="text"
                          id="postal"
                          className="form-control"
                          placeholder="Postal code"
                          value={formData.postal}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Postal Code + Country */}
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label htmlFor="country">Country</label>
                        <input
                          type="text"
                          id="country"
                          className="form-control"
                          placeholder="Country"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company info */}
                <div>
                  <div className="d-flex text-uppercase justify-content-center mb-3">
                    <h6>
                      <i className="bi  bi-building text-dark me-2"></i>
                      Company Info
                    </h6>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label htmlFor="companyName">Company Name</label>
                      <input
                        type="text"
                        id="companyName"
                        className="form-control"
                        placeholder="Company Name"
                        value={formData.companyName}
                          onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="companyWebsite">Website</label>
                      <input
                        type="text"
                        id="companyWebsite"
                        className="form-control"
                        placeholder="Optional"
                        value={formData.companyWebsite}
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="container my-3 p-3 mt-3">
                  {/* Heading */}
                  <div className="d-flex justify-content-center mb-4">
                    <h6 className="text-uppercase text-center">
                      <i className="bi bi-globe pe-2"></i>
                      Social
                    </h6>
                  </div>

                  {/* Row 1: Facebook + Twitter */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="facebook" className="form-label">
                        Facebook
                      </label>
                      <input
                        type="url"
                        id="facebook"
                        className="form-control"
                        placeholder="Facebook URL"
                        value={formData.facebook}
                          onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="twitter" className="form-label">
                        Twitter X
                      </label>
                      <input
                        type="text"
                        id="twitter"
                        className="form-control"
                        placeholder="@username"
                        value={formData.twitter}
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Row 2: Instagram + LinkedIn */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="instagram" className="form-label">
                        Instagram
                      </label>
                      <input
                        type="url"
                        id="instagram"
                        className="form-control"
                        placeholder="Instagram URL"
                        value={formData.instagram}
                          onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="linkedin" className="form-label">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        className="form-control"
                        placeholder="LinkedIn URL"
                        value={formData.linkedin}
                          onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Row 3: Dribbble + optional other */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="dribbble" className="form-label">
                        Dribbble
                      </label>
                      <input
                        type="text"
                        id="dribbble"
                        className="form-control"
                        placeholder="@username"
                        value={formData.dribbble}
                          onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="github" className="form-label">
                        GitHub
                      </label>
                      <input
                        type="text"
                        id="github"
                        className="form-control"
                        placeholder="@username"
                        value={formData.github}
                          onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end border-0">
                  <button
                    className="border-0 p-1 shadow"
                    type="submit"
                    style={{ background: "#02bc9c" }}
                  >
                    Save Change
                  </button>
                </div>
              </div>
              </form>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className="d-flex justify-content-between align-items-center text-center py-3 mt-4">
          <p className="mb-0 ms-3 opacity-50">© 2026 KiritTech</p>
          <div>
            <a
              href="#"
              className="me-3 text-decoration-none text-dark opacity-50  "
            >
              About
            </a>
            <a
              href="#"
              className="me-3 text-decoration-none text-dark opacity-50"
            >
              Support
            </a>
            <a
              href="#"
              className="me-3 text-decoration-none text-dark opacity-50"
            >
              Contact Us
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Profile;