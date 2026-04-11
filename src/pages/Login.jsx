import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/organization");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://auth-backend.kirittech.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          login: loginData.email,
          password: loginData.password,
        }),
      });

      const text = await response.text();
      console.log("RAW RESPONSE:", text);
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Invalid server response");
      }

      if (response.ok) {
        const token = data.token || (data.data && data.data.token);
        console.log("TOKEN FOUND:", token);
        // localStorage.setItem("token", token);
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", loginData.email);
        localStorage.setItem("isLoggedIn", "true");

        // alert("Login Successful");
        navigate("/organization");
      } else {
        alert(data.message || "Login Failed");
      }
      console.log("LOGIN FULL RESPONSE:", data);
      console.log("LOGIN OK?", response.ok);
    } catch (error) {
      console.error(error);
      alert("Server Error or CORS issue");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "12px",
          background: "linear-gradient(45deg, rgb(165, 205, 238), #c0cde0)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            <span style={{ color: "rgb(255, 123, 0)" }}>Kirit</span>
            <span style={{ color: "#0d6efd" }}>Tech</span>
          </h2>
          <p className="text-muted small mb-0">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label small">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Remember + Forgot */}
          <div className="d-flex justify-content-between mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
              />
              <label className="form-check-label small" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <a href="#" className="small text-decoration-none">
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Login
          </button>

          {/* Register */}
          <p className="text-center mt-3 small">
            Don't have an account?{" "}
            <Link to="/register" className="fw-bold text-decoration-none">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;