import React from "react";

function Roles() {
  const cards = [
    {
      title: "Security Officer",
      desc: "Handles platform safety and protocol reviews.",
      tasks: [
        "Daily Risk Assessment",
        "Manage Security Logs",
        "Control Access Rights",
        "Emergency Protocols",
      ],
    },
    {
      title: "Project Manager",
      desc: "Coordinates planning and team delivery timelines.",
      tasks: [
        "Timeline Tracking",
        "Task Assignments",
        "Budget Control",
        "Stakeholder Reporting",
      ],
    },
    {
      title: "Developer",
      desc: "Builds and maintains the platform core features.",
      tasks: [
        "Codebase Maintenance",
        "API Integration",
        "Unit Testing",
        "Feature Deployment",
      ],
    },
    {
      title: "Support Lead",
      desc: "Oversees customer support and service quality.",
      tasks: [
        "Respond to Tickets",
        "Live Chat Supervision",
        "FAQ Updates",
        "Support Metrics Review",
      ],
    },
  ];

  const avatars = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/men/45.jpg",
    "https://randomuser.me/api/portraits/women/21.jpg",
    "https://randomuser.me/api/portraits/men/67.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
  ];

  return (
    <div>
      <div className="flex-grow-1 p-0 p-lg-2">
        {/* Header */}
        <div>
          <h6>Manage Roles</h6>
          <p>Manage roles for smoother operations and secure access</p>
        </div>

        {/* Card Grid */}
        <div className="row">
          {cards.map((card, i) => (
            <div key={i} className="col-md-3">
              <div className="card h-100 shadow-sm position-relative">
                {/* Top-right SVG */}
                <img
                  src="/Image/auth-card-bg.svg"
                  alt="Logo"
                  style={{
                    position: "absolute",
                    // top: 10,
                    right: 0,
                    width: 200,
                    zIndex: 0,
                  }}
                />
                <div className="p-3">
                  {/* Icon */}
                  <div className="row mb-3">
                    <div className="mb-2 col-md-3">
                      <i className="bi bi-shield-lock fs-4 text-primary"></i>
                    </div>

                    <div className="col-md-8">
                      {/* Title */}
                      <h6 className="fw-bold ">{card.title}</h6>

                      {/* Description */}
                      <p className="text-muted small opacity-75">{card.desc}</p>
                    </div>
                  </div>
                  {/* Task List */}
                  <ul className="list-unstyled small mb-3">
                    {card.tasks.map((task, idx) => (
                      <li key={idx}> {task}</li>
                    ))}
                  </ul>

                  {/* Avatars */}
                  <div className="d-flex align-items-center mb-3">
                    {avatars.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt="user"
                        className="rounded-circle border border-white"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginLeft: index === 0 ? "0px" : "-7px",
                          zIndex: 10 + index,
                        }}
                      />
                    ))}
                  </div>

                  {/* Button */}
                  <div className="mt-auto d-flex justify-content-end">
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roles;
