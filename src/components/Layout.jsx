import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar - should have fixed width or be responsive */}
      <Sidebar open={sidebarOpen} />

      {/* Main content area on the right */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto"
        }}
      >
        {/* Navbar at top */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Dynamic page content */}
        <main className="p-4 bg-light" style={{ flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;