import React, { useEffect, useState } from 'react';
import { Search, UserPlus, Filter, Users, CheckCircle, Clock, } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Leads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filterVisible, setFilterVisible] = useState(() => {
    return localStorage.getItem("filterVisible") === "true";
  });
  const [filterExpanded, setFilterExpanded] = useState(() => {
    return localStorage.getItem("filterExpanded") === "true";
  });
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem("leadFilters");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("filterVisible", JSON.stringify(filterVisible));
    localStorage.setItem("filterExpanded", JSON.stringify(filterExpanded));
    localStorage.setItem("leadFilters", JSON.stringify(filters));
  }, [filterVisible, filterExpanded, filters]);
  // <-- FIX
  // Lead STATE
  const [Lead, setLead] = useState(() => {
    const saved = localStorage.getItem("Lead");
    return saved ? JSON.parse(saved) : [];
  });

  // const [newLeadModal, setNewLeadModal] = useState(false);
  const [newLeadModal, setNewLeadModal] = useState(() => {
    return localStorage.getItem("newLeadModal") === "true";
  });

  // NEW LEAD STATE   
  const [newLead, setNewLead] = useState(() => {
    const saved = localStorage.getItem("newLeadDraft");
    return saved
      ? JSON.parse(saved)
      : {
        name: "",
        email: "",
        phone: "",

        clientType: "",
        property: "",
        unit: "",

        quotedPrice: "",
        negotiatedPrice: "",
        discount: "",
        Leadtatus: "",
        paymentPlan: "",
        consultant: "",

        notes: "",

        location: "India",
        category: "General",
        status: "Active"
      };
  });

  // AUTO SAVE DRAFT
  useEffect(() => {
    localStorage.setItem("newLeadDraft", JSON.stringify(newLead));
  }, [newLead]);

  useEffect(() => {
    localStorage.setItem("newLeadModal", newLeadModal);
  }, [newLeadModal]);

  const filteredLead = Lead.filter(lead => {
    const matchesSearch =
      lead.property?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.clientType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.consultant?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === '' || lead.Leadtatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const StatCard = ({ icon, label, value, color }) => (
    <div
      className="d-flex align-items-center gap-3 px-4 py-3 rounded-4 transition-all"
      style={{
        background: 'white',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        flex: '1',
        minWidth: '200px',
        borderLeft: `5px solid ${color}`
      }}
    >
      {/* Icon Container with soft background */}
      <div
        className="d-flex align-items-center justify-content-center rounded-3"
        style={{
          width: '45px',
          height: '45px',
          backgroundColor: `${color}15`, // 15% opacity of the theme color
          color: color
        }}
      >
        {icon}
      </div>

      <div>
        <p className="text-muted fw-bold mb-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          {label}
        </p>
        <h4 className="fw-black m-0" style={{ color: '#1f2937', fontSize: '1.4rem' }}>
          {value}
        </h4>
      </div>
    </div>
  );

  const totalLead = Lead.length;

  const wonLead = Lead.filter(
    (d) => d.Leadtatus?.toLowerCase() === "won"
  ).length;

  const lostLead = Lead.filter(
    (d) => d.Leadtatus?.toLowerCase() === "lost"
  ).length;
  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* TOP SECTION */}
        <div className="d-flex flex-column flex-md-row justify-content-between mb-5 gap-4">
          <div>
            <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-bold">CRM Dashboard</span>
            <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Lead</h1>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-3 mb-4">
          <StatCard
            icon={<Users size={22} />}
            label="Total Lead"
            value={totalLead}
            color="#6366f1"
          />

          <StatCard
            icon={<CheckCircle size={22} />}
            label="Won"
            value={wonLead}
            color="#10b981"
          />

          <StatCard
            icon={<Clock size={22} />}
            label="Lost"
            value={lostLead}
            color="#f59e0b"
          />
        </div>

        {/* DATA CARD */}
        <div className="card border-0 shadow-lg rounded-5 bg-white overflow-hidden">
          {/* ACTION BAR */}
          <div className="p-4 border-bottom bg-white">
            <div className="row align-items-center g-3">
              <div className="col-md-7">
                <div className="position-relative">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                  <input
                    type="text"
                    className="form-control ps-5 py-3 border-0 bg-light rounded-4 shadow-none"
                    placeholder="Search by name, email, or status..."
                    style={{ fontSize: '0.95rem' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-5 d-flex gap-2 justify-content-md-end justify-content-between">
                <div className="position-relative">
                  <button
                    className="btn btn-light border-0 py-3 px-4 rounded-4 fw-bold text-secondary d-flex align-items-center gap-2"
                    onClick={() => {
                      if (!filterVisible) {
                        setFilterVisible(true);
                        setFilterExpanded(false);
                      } else {
                        setFilterExpanded(!filterExpanded);
                      }
                    }}
                  >
                    <Filter size={18} /> Filter
                  </button>
                  {filterVisible && (
                    <div className="position-absolute mt-1 p-3 bg-white shadow rounded-4" style={{ zIndex: 10, minWidth: '220px' }}>
                      {/* Small module */}
                      {!filterExpanded && (
                        <div className="d-flex justify-content-between align-items-center">
                          <span
                            className="fw-bold"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setFilterExpanded(true)}
                          >
                            Filter
                          </span>
                          <div>||</div>
                          <button
                            className="btn border-0 fw-bold"
                            onClick={() => {
                              setStatusFilter('');
                              setSearchTerm(''); // 🔥 IMPORTANT (you forgot this)
                              setFilterExpanded(false);
                              setFilterVisible(false);
                            }}
                          >
                            Clear
                          </button>
                        </div>
                      )}

                      {filterExpanded && (
                        <div
                          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                          style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.4)', // Modern slate-tinted overlay
                            backdropFilter: 'blur(8px)',
                            zIndex: 1050,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <div
                            className="bg-white shadow-lg border-0"
                            style={{
                              width: '650px',
                              maxWidth: '92%',
                              borderRadius: '24px',
                              overflow: 'hidden'
                            }}
                          >
                            {/* Header */}
                            <div className="px-4 py-3 d-flex justify-content-between align-items-center border-bottom bg-light">
                              <h5 className="m-0 fw-bold" style={{ color: '#1e293b', letterSpacing: '-0.5px' }}>
                                <i className="bi bi-filter-right me-2 text-primary"></i> Filter Lead
                              </h5>
                              <button
                                className="btn-close shadow-none"
                                style={{ fontSize: '0.8rem' }}
                                onClick={() => {
                                  setStatusFilter('');
                                  setFilters([]);
                                  setFilterExpanded(false);
                                  setFilterVisible(false);
                                }}
                              />
                            </div>

                            <div className="p-4">
                              {/* Field Selector Section */}
                              <div className="mb-4">
                                <label className="form-label small fw-bold text-uppercase text-muted mb-2">Add New Filter</label>
                                <select
                                  className="form-select border-0 shadow-sm py-2 px-3"
                                  style={{ backgroundColor: '#f8fafc', borderRadius: '12px' }}
                                  value={statusFilter}
                                  onChange={(e) => {
                                    const field = e.target.value;
                                    if (!field) return;
                                    setFilters([
                                      ...filters,
                                      { field, operator: "equals", value: "" }
                                    ]);
                                  }}
                                >
                                  <option value="">Choose a field...</option>
                                  <option value="Status">Status</option>
                                  <option value="Negotiated Price">Negotiated Price</option>
                                  <option value="Discount %">Discount %</option>
                                  <option value="Payment Plan">Payment Plan</option>
                                </select>
                              </div>

                              {/* Dynamic Filter Rows */}
                              <div className="overflow-auto" style={{ maxHeight: '300px', paddingRight: '4px' }}>
                                {filters.map((f, i) => (
                                  <div
                                    key={i}
                                    className="p-3 mb-3 animate-in"
                                    style={{
                                      backgroundColor: '#ffffff',
                                      border: '1px solid #e2e8f0',
                                      borderRadius: '16px',
                                      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                    }}
                                  >
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                      <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                                        {f.field}
                                      </span>
                                      <button
                                        className="btn btn-sm text-danger border-0 p-0"
                                        onClick={() => setFilters(filters.filter((_, idx) => idx !== i))}
                                      >
                                        <i className="bi bi-trash3-fill"></i>
                                      </button>
                                    </div>

                                    <div className="d-flex gap-2 align-items-center">
                                      <select
                                        className="form-select form-select-sm border-0 shadow-sm w-auto"
                                        style={{ backgroundColor: '#f1f5f9', borderRadius: '8px', fontWeight: '500' }}
                                        value={f.operator} // Keeping logic: used your filters variable structure
                                        onChange={(e) => {
                                          const newFilters = [...filters];
                                          newFilters[i].operator = e.target.value;
                                          setFilters(newFilters);
                                        }}
                                      >
                                        <option value="equals">is equal to</option>
                                        <option value="contains">contains</option>
                                      </select>

                                      <input
                                        type="text"
                                        className="form-control form-control-sm border-0 shadow-sm"
                                        style={{ backgroundColor: '#f1f5f9', borderRadius: '8px' }}
                                        placeholder="Type value..."
                                        value={f.value}
                                        onChange={(e) => {
                                          const newFilters = [...filters];
                                          newFilters[i].value = e.target.value;
                                          setFilters(newFilters);
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}

                                {filters.length === 0 && (
                                  <div className="text-center py-4 border border-dashed rounded-4">
                                    <p className="text-muted small mb-0">Select a field above to start filtering Lead.</p>
                                  </div>
                                )}
                              </div>

                              {/* Footer Actions */}
                              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                <button
                                  className="btn btn-link text-muted text-decoration-none fw-semibold p-0"
                                  onClick={() => {
                                    setStatusFilter('');
                                    setFilters([]);
                                    setFilterExpanded(false);
                                    setFilterVisible(false);
                                  }}
                                >
                                  Reset All
                                </button>

                                <div className="d-flex gap-2">
                                  <button
                                    className="btn px-4 border-0 text-secondary fw-bold"
                                    style={{ background: '#f1f5f9', borderRadius: '12px' }}
                                    onClick={() => setFilterExpanded(false) || setFilterVisible(false)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="btn btn-primary px-4 fw-bold shadow-sm"
                                    style={{ borderRadius: '12px' }}
                                    onClick={() => {
                                      setFilterExpanded(false);
                                      setFilterVisible(false);
                                    }}
                                  >
                                    Apply Filters
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex align-items-center gap-2 shadow-sm"
                                    onClick={() => setNewLeadModal(true)} // open modal
                                >
                                    <UserPlus size={18} /> New Lead
                                </button> */}
                <button
                  className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                  onClick={() => {
                    setNewLeadModal(true);
                    localStorage.setItem("newLeadModal", "true");
                  }}
                >
                  <UserPlus size={18} />

                  <span className="d-none d-sm-inline">New Leads</span>

                  <span className="d-inline d-sm-none">+</span>
                </button>

                {/* New Lead Modal */}
                {newLeadModal && (
                  <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(15px)',
                      zIndex: 2000
                    }}
                  >
                    <div
                      className="bg-white shadow-lg"
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >

                      {/* HEADER */}
                      <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                        <div>
                          <h4 className="m-0 fw-black">Add Detailed Lead</h4>
                          <p className="text-muted small mb-0">Create complete lead profile</p>
                        </div>

                        <button
                          className="btn btn-light rounded-circle"
                          onClick={() => setNewLeadModal(false)}
                        >
                          ✕
                        </button>
                      </div>

                      {/* BODY */}
                      <div className="p-4 overflow-auto" style={{ flex: 1 }}>

                        {/* SECTION 1 */}
                        <div className="mb-5">
                          <h6 className="text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                            <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">01</span> Client & Property
                          </h6>

                          <div className="row g-2">
                            <div className="col-md-6">
                              <label className="label-style">Client / Prospect</label>
                              <input className="form-control input-style"
                                value={newLead.clientType}
                                onChange={(e) => setNewLead({ ...newLead, clientType: e.target.value })}
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="label-style">Property</label>
                              <input className="form-control input-style"
                                value={newLead.property}
                                onChange={(e) => setNewLead({ ...newLead, property: e.target.value })}
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="label-style">Unit</label>
                              <input className="form-control input-style"
                                value={newLead.unit}
                                onChange={(e) => setNewLead({ ...newLead, unit: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        {/* SECTION 2 */}
                        <div className="mb-5">
                          <h6 className="text-primary fw-bold text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                            <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">02</span> Pricing
                          </h6>

                          <div className="row g-3">
                            <div className="col-md-4">
                              <label className="label-style">Quoted Price</label>
                              <input type="number" className="form-control input-style"
                                value={newLead.quotedPrice}
                                onChange={(e) => setNewLead({ ...newLead, quotedPrice: e.target.value })}
                              />
                            </div>

                            <div className="col-md-4">
                              <label className="label-style">Negotiated Price</label>
                              <input type="number" className="form-control input-style"
                                value={newLead.negotiatedPrice}
                                onChange={(e) => setNewLead({ ...newLead, negotiatedPrice: e.target.value })}
                              />
                            </div>

                            <div className="col-md-4">
                              <label className="label-style">Discount %</label>
                              <input type="number" className="form-control input-style"
                                value={newLead.discount}
                                onChange={(e) => setNewLead({ ...newLead, discount: e.target.value })}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="label-style">Status</label>
                              <select className="form-select input-style"
                                value={newLead.Leadtatus}
                                onChange={(e) => setNewLead({ ...newLead, Leadtatus: e.target.value })}
                              >
                                <option value="open">Open</option>
                                <option value="won">Won</option>
                                <option value="lost">Lost</option>
                              </select>
                            </div>

                            <div className="col-md-4">
                              <label className="label-style">Payment Plan</label>
                              <input className="form-control input-style"
                                value={newLead.paymentPlan}
                                onChange={(e) => setNewLead({ ...newLead, paymentPlan: e.target.value })}
                              />
                            </div>

                            <div className="col-md-4">
                              <label className="label-style">Consultant</label>
                              <input className="form-control input-style"
                                value={newLead.consultant}
                                onChange={(e) => setNewLead({ ...newLead, consultant: e.target.value })}
                              />
                            </div>
                          </div>



                        </div>


                        {/* SECTION 3 */}
                        <div>
                          <h6 className="text-primary  text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                            <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">03</span> Notes
                          </h6>
                          <label className="label-style">Special Conditions / Remarks</label>
                          <textarea
                            className="form-control input-style"
                            rows="3"
                            value={newLead.notes}
                            onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                          />
                        </div>

                      </div>

                      {/* FOOTER */}
                      <div className="p-4 border-top d-flex gap-3 justify-content-end">
                        <button className="btn btn-light px-5"
                          onClick={() => {
                            setNewLeadModal(false);
                            localStorage.removeItem("newLeadDraft");
                          }}>
                          Discard
                        </button>

                        <button className="btn btn-dark px-5"
                          onClick={() => {

                            if (!newLead.property || !newLead.clientType) {
                              alert("Property and Client are required");
                              return;
                            }

                            const updatedLead = [
                              ...Lead,
                              {
                                ...newLead,
                                id: Date.now(),
                                date: new Date().toLocaleDateString()
                              }
                            ];

                            setLead(updatedLead);
                            localStorage.setItem("Lead", JSON.stringify(updatedLead));

                            // reset form
                            setNewLead({
                              clientType: "",
                              property: "",
                              unit: "",
                              quotedPrice: "",
                              negotiatedPrice: "",
                              Leadtatus: "Open",
                              consultant: "",
                              notes: "",
                              date: ""
                            });

                            setNewLeadModal(false);
                          }}>
                          Save Lead
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-responsive">
            <table className="table table-borderless align-middle mb-0">
              <thead>
                <tr className="bg-light">
                  <th className="ps-4 py-3">Property</th>
                  <th className="py-3">Unit</th>
                  <th className="py-3">Client</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Assigned To</th>
                  <th className="py-3">Date</th>
                  <th className="pe-4 py-3 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLead.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #eee' }}>

                    {/* Property */}
                    <td className="ps-4 py-3 fw-semibold">
                      {lead.property || "-"}
                    </td>

                    {/* Unit */}
                    <td className="py-3">
                      {lead.unit || "-"}
                    </td>

                    {/* Client */}
                    <td className="py-3">
                      {lead.clientType || "-"}
                    </td>

                    {/* Price */}
                    <td className="py-3 fw-bold text-success">
                      ₹ {lead.negotiatedPrice || lead.quotedPrice || "0"}
                    </td>

                    {/* Status */}
                    <td className="py-3">
                      <span className={`badge ${lead.Leadtatus === "Won"
                        ? "bg-success"
                        : lead.Leadtatus === "Lost"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                        }`}>
                        {lead.Leadtatus}
                      </span>
                    </td>

                    {/* Assigned To */}
                    <td className="py-3">
                      {lead.consultant || "-"}
                    </td>

                    {/* Date */}
                    <td className="py-3 text-muted small">
                      {lead.date || "-"}
                    </td>

                    {/* Actions */}
                    <td className="pe-4 py-3 text-end">
                      <button className="btn btn-light btn-sm">
                        ⋮
                      </button>
                    </td>

                  </tr>
                ))}

                {filteredLead.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No Lead found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
                .fw-black { font-weight: 900; }
                .tracking-wider { letter-spacing: 0.05em; }
                .extra-small { font-size: 0.8rem; }
                .lead-row:hover { 
                    background-color: #fcfdfe !important; 
                    transform: scale(1.002);
                    transition: all 0.2s ease;
                }
                .btn-icon-hover:hover {
                    background-color: #f1f3f5 !important;
                    color: #000 !important;
                }
            `}</style>
    </div>
  );
};

// Reusable Stat Component
const StatCard = ({ icon, label, value, color }) => (
  <div className="d-flex align-items-center gap-3 px-3 py-1">
    <div style={{ color }}>{icon}</div>
    <div>
      <div className="text-muted" style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>{label}</div>
      <div className="fw-black" style={{ fontSize: '1.1rem', color: '#111827' }}>{value}</div>
    </div>
  </div>
);

export default Leads;