// import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ open, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  // const [open, setOpen] = useState(false);
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },

    { name: "Lead", path: "/lead", icon: "bi-people" },
    { name: "Opportunities", path: "/opportunities", icon: "bi-briefcase" },
    { name: "Contacts", path: "/contacts", icon: "bi-person" },
    { name: "Deals", path: "/deals", icon: "bi-briefcase" },

    { name: "Task", path: "/task", icon: "bi-check2-square" },
    // { name: "Projects", path: "/projects", icon: "bi-building" },
    { name: "Events", path: "/events", icon: "bi-calendar" },
    { name: "FollowUp", path: "/followup", icon: "bi-calendar" },

    { name: "Property", path: "/property", icon: "bi-building" },
    { name: "Areas", path: "/areas", icon: "bi-map" },
    { name: "Owner Details", path: "/ownerDetails", icon: "bi-person" },
    { name: "Units", path: "/units", icon: "bi-building" },
    { name: "Inventory Matrix", path: "/inventoryMatrix", icon: "bi-building" },

    { name: "Requirement Tracker", path: "/requirementTracker", icon: "bi-building" },
    { name: "Property Matching", path: "/propertyMatching", icon: "bi-building" },
    { name: "Property Sharing", path: "/propertySharing", icon: "bi-share" },

    { name: "Token Collections", path: "/tokenCollections", icon: "bi-building" },

    { name: "Reports", path: "/report", icon: "bi-file-earmark-text" },
    { name: "Ecommerce", path: "/ecommerce", icon: "bi-cart" },
    { name: "Reviews", path: "/reviews", icon: "bi-star" },
    { name: "Bank & card", path: "/bank&reviews", icon: "bi-bank" },
    { name: "Profile", path: "/profile", icon: "bi-person" },
    { name: "Role", path: "/role", icon: "bi-shield-lock" },
    { name: "Empolyee", path: "/empolyee", icon: "bi-person" },
    { name: "RoleDetails", path: "/roleDetails", icon: "bi-person-badge" },
    { name: "BlogDashboard", path: "/blogDashboard", icon: "bi-journal-text" },
    { name: "RangeSlider", path: "/rangeSlider", icon: "bi-sliders" },
    { name: "Password", path: "/password", icon: "bi-lock" },
    { name: "PinBoard", path: "/pinboard", icon: "bi-pin-angle" },
    { name: "Clients & Invoice", path: "/clients", icon: "bi-receipt" },

    { name: "ComingSoon", path: "/coming", icon: "bi-hourglass-split" },
  ];

  return (
    <>
      {/* <button
        className="btn btn-dark d-md-none m-2"
        onClick={() => setOpen(!open)}
        style={{ position: "fixed", top: 10, left: 10, zIndex: 9999 }}
      >
        ☰
      </button> */}
      <div
        className={`bg-light p-3 shadow border-2 border-black sidebar-scroll ${open ? "d-block" : "d-none"
          } d-md-block`}
        style={{
          width: "220px",
          flexShrink: 0,
          height: "100vh",
          overflowY: "auto",
          position: "sticky",
          top: 0,
        }}
      >
        <h4 className="mb-4">Dashboard</h4>

        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => { navigate(item.path); toggleSidebar(); }}
            className={`btn w-100 mb-2 d-flex align-items-center gap-2 text-start ${location.pathname === item.path
              ? "btn-primary text-white"
              : "btn-light text-dark"
              }`}
            style={{ fontWeight: 0.25 }}
          >
            <i className={`bi ${item.icon}`}></i>
            {item.name}
          </button>
        ))}
      </div >
    </>
  );
}

export default Sidebar;