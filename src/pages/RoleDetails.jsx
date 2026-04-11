import React from "react";

function RoleDetails() {
  return (
    <div>
      <div className="flex-grow-1 p-0 p-lg-2">
        <div>

          {/* Headig */}
          <div>
            <h6>Role Details</h6>
            <p>
              Define and manage roles to streamline operations and ensure secure
              access control.
            </p>
          </div>

          {/* Table */}
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
                            <small className="text-muted">alex@uxlabs.io</small>
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
                            <small className="text-muted">emma@uxlabs.io</small>
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
      </div>
    </div>
  );
}

export default RoleDetails;
