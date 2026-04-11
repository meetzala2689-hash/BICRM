import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("token");
    localStorage.removeItem("crm_token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  // console.log("navbar");
  return (
    <div>
      <nav
        className="navbar navbar-light bg-light border-bottom border-2 px-3  top-0 w-100"
      // style={{ zIndex: 1030 }}
      >
        <div className="container-fluid">
          <button
            className="btn btn-dark me-2 d-md-none"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          <a className="navbar-brand">Navbar</a>
          <div className="d-flex align-items-center">
            <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
