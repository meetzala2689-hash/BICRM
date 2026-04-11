import React, { useState } from "react";

function PasswordPage() {
  const [password, setPassword] = useState("");
  const [collapsedProgress, setCollapsedProgress] = useState(false);
  const [collapsedCondition, setCollapsedCondition] = useState(false);

  // Password rules
  const rules = [
    {
      id: "lower",
      test: (val) => /[a-z]/.test(val),
      label: "At least one lowercase letter (a-z)",
    },
    {
      id: "upper",
      test: (val) => /[A-Z]/.test(val),
      label: "At least one uppercase letter (A-Z)",
    },
    {
      id: "number",
      test: (val) => /[0-9]/.test(val),
      label: "At least one number (0-9)",
    },
    {
      id: "length",
      test: (val) => val.length >= 8,
      label: "Minimum 8 characters",
    },
  ];

  // Calculate strength for progress bar
  const strength = rules.reduce(
    (acc, rule) => acc + (rule.test(password) ? 25 : 0),
    0,
  );
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="flex-grow-1 content-page p-0">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="page-title-head d-flex align-items-center mb-4">
            <div className="flex-grow-1">
              <h4 className="page-main-title m-0">Password Meter</h4>
            </div>
            <div className="text-end">
              <ol className="breadcrumb m-0 py-0">
                <li className="breadcrumb-item">Paces</li>
                <li className="breadcrumb-item">Plugins</li>
                <li className="breadcrumb-item active">Password Meter</li>
              </ol>
            </div>
          </div>

          <div className="row">
            {/* Progress Bar Card */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Progress Bar</h4>
                  <div className="card-action">
                    <button
                      className="card-action-item btn"
                      onClick={() => setCollapsedProgress(!collapsedProgress)}
                    >
                      <i
                        className={`ti ti-chevron-${collapsedProgress ? "down" : "up"} align-middle`}
                      ></i>
                    </button>
                  </div>
                </div>

                {!collapsedProgress && (
                  <div className="card-body">
                    <input
                      type="password"
                      className="form-control mb-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Password Strength Bar */}
                    <div
                      className="password-bar mb-2"
                      style={{
                        height: "12px",
                        borderRadius: "8px",
                        background: "#e0e0e0",
                        overflow: "hidden",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div
                        style={{
                          width: `${strength}%`,
                          height: "100%",
                          borderRadius: "8px",
                          background:
                            strength < 50
                              ? "linear-gradient(90deg, #ff6b6b, #ff4757)"
                              : strength < 75
                                ? "linear-gradient(90deg, #ffa502, #ff7f50)"
                                : "linear-gradient(90deg, #2ed573, #1eae60)",
                          transition:
                            "width 0.4s ease-in-out, background 0.4s ease-in-out",
                        }}
                      />
                    </div>

                    {/* Strength Label */}
                    <div className="d-flex justify-content-end mb-2">
                      <span
                        className="fs-xs fw-bold"
                        style={{
                          color:
                            strength < 50
                              ? "#ff4757"
                              : strength < 75
                                ? "#ff7f50"
                                : "#1eae60",
                        }}
                      >
                        {strength === 100
                          ? "Strong"
                          : strength >= 75
                            ? "Good"
                            : strength >= 50
                              ? "Medium"
                              : "Weak"}
                      </span>
                    </div>

                    <p className="text-muted fs-xs mb-0">
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Password Condition Card */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Password Condition</h4>
                  <div className="card-action">
                    <button
                      className="card-action-item btn"
                      onClick={() => setCollapsedCondition(!collapsedCondition)}
                    >
                      <i
                        className={`ti ti-chevron-${collapsedCondition ? "down" : "up"} align-middle`}
                      ></i>
                    </button>
                  </div>
                </div>

                {!collapsedCondition && (
                  <div className="card-body">
                    <div>
                      <label className="form-label" htmlFor="password-input">
                        Magic Password ✨ (Click Here)
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control pe-5"
                          placeholder="Enter password"
                          id="password-input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <i
                          className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#6c757d",
                          }}
                        ></i>
                      </div>
                      <div className="form-text mb-2">
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols.
                      </div>

                      <div className="password-box bg-light-subtle border border-light mt-2 rounded p-3">
                        <h5 className="fs-sm mb-2">Password Recipe:</h5>
                        {rules.map((rule) => (
                          <p
                            key={rule.id}
                            className={`fs-xs mb-2 ${rule.test(password) ? "text-success" : "text-danger"}`}
                          >
                            {rule.test(password) ? "✅" : "❌"} {rule.label}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordPage;
