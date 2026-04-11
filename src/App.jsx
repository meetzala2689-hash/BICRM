import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Organization from "./pages/Organization";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Project from "./pages/Project";
import ProjectModule from "./pages/ProjectModule";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import "./index.css";
import Lead from "./pages/Lead";
import Report from "./pages/Report";
import Ecommerse from "./pages/Ecommerse";
import Opportunities from "./pages/Opportunities";
import Reviews from "./pages/Reviews";
import BankReviews from "./pages/BankReviews";
import Profile from "./pages/Profile";
import Roles from "./pages/Roles";
import RoleDetails from "./pages/RoleDetails";
import Areas from "./pages/Areas";
import BlogDashboard from "./pages/BlogDashboard";
import RangeSlider from "./pages/RangeSlider";
import ComingSoon from "./pages/ComingSoon";
import Password from "./pages/Password";
import PinBoard from "./pages/PinBoard";
import ClientInvoice from "./pages/ClientInvoice";
import Task from "./pages/Task";
import Empolyee from "./pages/Empolyee";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import Events from "./pages/Events";
import FollowUp from "./pages/FollowUp";
import Property from "./pages/Property";
import OwnerDetails from "./pages/OwnerDetails";
import Units from "./pages/Units";
import InventoryMatrix from "./pages/InventoryMatrix";
import RequirementTracker from "./pages/RequirementTracker";
import PropertyMatching from "./pages/PropertyMatching";
import PropertySharing from "./pages/PropertySharing";
import TokenCollections from "./pages/TokenCollections";
function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const addProject = (project) => {
    const updated = [...projects, project];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes wrapped in Layout */}
        <Route element={<PrivateRoute />}>
          {/* Standalone Protected Pages (No Sidebar/Navbar) */}
          <Route path="/organization" element={<Organization />} />
          <Route path="/project" element={<Project projects={projects} />} />
          <Route path="/projectModule" element={<ProjectModule addProject={addProject} />} />

          {/* Pages with Sidebar/Navbar */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/lead" element={<Lead addProject={addProject} />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/contacts" element={<Contacts projects={projects} />} />
            <Route path="/deals" element={<Deals projects={projects} />} />

            <Route path="/task" element={<Task projects={projects} />} />
            <Route path="/events" element={<Events addProject={addProject} />} />
            <Route path="/followup" element={<FollowUp projects={projects} />} />
            <Route path="/property" element={<Property projects={projects} />} />
            <Route path="/ownerDetails" element={<OwnerDetails projects={projects} />} />
            <Route path="/units" element={<Units projects={projects} />} />
            <Route path="/inventoryMatrix" element={<InventoryMatrix projects={projects} />} />
            <Route path="/requirementTracker" element={<RequirementTracker projects={projects} />} />
            <Route path="/propertyMatching" element={<PropertyMatching projects={projects} />} />
            <Route path="/propertySharing" element={<PropertySharing projects={projects} />} />
            <Route path="/tokenCollections" element={<TokenCollections projects={projects} />} />

            <Route path="/profile" element={<Profile projects={projects} />} />
            <Route path="/rangeSlider" element={<RangeSlider projects={projects} />} />
            <Route path="/blogDashboard" element={<BlogDashboard projects={projects} />} />
            <Route path="/empolyee" element={<Empolyee projects={projects} />} />
            <Route path="/clients" element={<ClientInvoice projects={projects} />} />
            <Route path="/role" element={<Roles projects={projects} />} />
            <Route path="/pinboard" element={<PinBoard projects={projects} />} />
            <Route path="/password" element={<Password projects={projects} />} />
            <Route path="/coming" element={<ComingSoon projects={projects} />} />
            <Route path="/roleDetails" element={<RoleDetails projects={projects} />} />
            <Route path="/areas" element={<Areas projects={projects} />} />
            <Route path="/reviews" element={<Reviews addProject={addProject} />} />
            <Route path="/invoice" element={<ClientInvoice addProject={addProject} />} />
            <Route path="/bank&reviews" element={<BankReviews addProject={addProject} />} />
            <Route path="/ecommerce" element={<Ecommerse addProject={addProject} />} />
            <Route path="/report" element={<Report addProject={addProject} />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/pinnacle" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
