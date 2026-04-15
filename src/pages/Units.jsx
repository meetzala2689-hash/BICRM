import React, { useEffect, useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Users, CheckCircle, Clock, Mail, Phone, Globe } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Units = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [filterVisible, setFilterVisible] = useState(() => {
        return localStorage.getItem("filterVisible") === "true";
    });

    const [filterExpanded, setFilterExpanded] = useState(() => {
        return localStorage.getItem("filterExpanded") === "true";
    });

    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem("unitFilters");
        return saved ? JSON.parse(saved) : [];
    });

    const [selectedUnitType, setSelectedUnitType] = useState(() => {
        return localStorage.getItem("selectedUnitType") || null;
    });

    const [modalType, setModalType] = useState(() => {
        return localStorage.getItem("modalType") === true;
    });

    useEffect(() => {
        localStorage.setItem("filterVisible", JSON.stringify(filterVisible));
        localStorage.setItem("filterExpanded", JSON.stringify(filterExpanded));
        localStorage.setItem("unitFilters", JSON.stringify(filters));
        localStorage.setItem("modalType", modalType);
        localStorage.setItem("selectedUnitType", selectedUnitType);
    }, [filterVisible, filterExpanded, filters, modalType, selectedUnitType]);

    // UNITS STATE
    const [units, setUnits] = useState(() => {
        const saved = localStorage.getItem("units");
        return saved ? JSON.parse(saved) : [];
    });

    // const [newUnitsModal, setNewUnitsModal] = useState(false);
    const [newUnitsModal, setNewUnitsModal] = useState(() => {
        return localStorage.getItem("newUnitsModal") === "true";
    });

    // NEW UNITS STATE   
    const [newUnits, setNewUnits] = useState(() => {
        const saved = localStorage.getItem("newUnitsDraft");
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
                unitStatus: "",
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
        localStorage.setItem("newUnitsDraft", JSON.stringify(newUnits));
    }, [newUnits]);

    useEffect(() => {
        localStorage.setItem("newUnitsModal", newUnitsModal);
    }, [newUnitsModal]);

    const filteredUnits = units.filter(unit => {
        const matchesSearch =
            unit.property?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.clientType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.consultant?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === '' || unit.unitStatus === statusFilter;

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
                    backgroundColor: `${color}15`,
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


    const normalize = (v) => (v || "").toLowerCase();

    const totalUnits = units.length;

    const openUnits = units.filter(
        (u) => normalize(u.unitStatus) === "open"
    ).length;

    const wonUnits = units.filter(
        (u) => normalize(u.unitStatus) === "won"
    ).length;

    const lostUnits = units.filter(
        (u) => normalize(u.unitStatus) === "lost"
    ).length;
    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* TOP SECTION */}
                <div className="d-flex flex-column flex-md-row justify-content-between mb-5 gap-4">
                    <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-bold">CRM Dashboard</span>
                        <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Units</h1>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mb-4">
                    <StatCard icon={<Users size={22} />} label="Total Units" value={totalUnits} color="#6366f1" />
                    <StatCard icon={<CheckCircle size={22} />} label="Open Units" value={openUnits} color="#10b981" />
                    <StatCard icon={<Clock size={22} />} label="Won Units" value={wonUnits} color="#f59e0b" />
                    <StatCard icon={<Clock size={22} />} label="Lost Units" value={lostUnits} color="#f59e0b" />
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

                                    {/* Backdrop with Soft Blur */}
                                    {filterVisible && (
                                        <div
                                            onClick={() => setFilterVisible(false)}
                                            style={{
                                                position: "fixed",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                zIndex: 9998,
                                            }}
                                        ></div>
                                    )}
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
                                                            setModalType("");
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
                                                                <i className="bi bi-filter-right me-2 text-primary"></i> Filter Units
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
                                                                        <p className="text-muted small mb-0">Select a field above to start filtering units.</p>
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
                                    // onClick={() => setNewUnitsModal(true)}
                                    onClick={() => setModalType("new")}
                                >
                                    <UserPlus size={18} /> New Units
                                </button> */}


                                <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                                    onClick={() => {
                                        setModalType("new");
                                        localStorage.setItem("modalType", "new");
                                    }}
                                >
                                    <UserPlus size={18} />

                                    <span className="d-none d-sm-inline">New Units</span>

                                    <span className="d-inline d-sm-none">+</span>
                                </button>


                                {modalType && (
                                    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                                        <div className="modal-dialog modal-lg modal-dialog-centered">
                                            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>

                                                {/* Header */}
                                                <div className="modal-header border-0 pb-0">
                                                    <button
                                                        type="button"
                                                        className="btn-sm btn-light rounded-pill border-0 px-3"
                                                        onClick={() => setModalType("")}
                                                    >
                                                        <i className="bi bi-arrow-left me-1"></i> Back
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn-close shadow-none"
                                                        onClick={() => setModalType("")}
                                                    ></button>
                                                </div>

                                                <div className="modal-body p-4 pt-2">
                                                    {/* Title Section */}
                                                    <div className="text-center mb-4">
                                                        <h4 className="fw-bold mb-1">Select Unit Type</h4>
                                                        <p className="text-muted small">Choose a category to continue the workflow</p>
                                                    </div>

                                                    {/* Grid Selection */}
                                                    <div className="row g-3 mb-4">
                                                        {[
                                                            { id: "apartment", label: "Apartment", icon: "bi-building", color: "primary" },
                                                            { id: "bungalow", label: "Bungalow", icon: "bi-house-heart", color: "success" },
                                                            { id: "plot", label: "Plot", icon: "bi-map", color: "warning" }
                                                        ].map((item) => (
                                                            <div className="col-md-4" key={item.id}>
                                                                <div
                                                                    onClick={() => {
                                                                        setSelectedUnitType({ id: item.id, label: item.label });
                                                                        setModalType("");    // Keep track of selected type
                                                                        setNewUnitsModal(true);
                                                                        // setFilterVisible(false);  // Open the detailed units modal
                                                                    }}
                                                                    className={`card h-100 border-2 text-center p-3 selection-card ${modalType === item.id ? 'border-primary bg-light' : 'border-light'}`}
                                                                    style={{ cursor: 'pointer', transition: '0.3s ease' }}
                                                                >
                                                                    <div className={`icon-box mb-2 mx-auto rounded-circle d-flex align-items-center justify-content-center bg-soft-${item.color}`}
                                                                        style={{ width: '60px', height: '60px', backgroundColor: `var(--bs-${item.color}-bg-subtle)` }}>
                                                                        <i className={`bi ${item.icon} fs-2 text-${item.color}`}></i>
                                                                    </div>
                                                                    <h6 className="fw-bold mb-0">{item.label}</h6>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Add this to your Global CSS file */}
                                <style>
                                    {`
  .selection-card:hover {
    transform: translateY(-5px);
    border-color: #0d6efd !important;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  }
  .bg-soft-primary { background-color: #e7f1ff; }
  .bg-soft-success { background-color: #e1f7ec; }
  .bg-soft-warning { background-color: #fff8e6; }
`}
                                </style>

                                {/* New Units Modal */}
                                {newUnitsModal && (
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
                                                    <h4 className="m-0 fw-black"> Add Detailed Units {selectedUnitType ? ` ${selectedUnitType.label}` : ""}</h4>
                                                    <p className="text-muted small mb-0">Create complete units profile </p>
                                                </div>

                                                <button
                                                    className="btn btn-light rounded-circle"
                                                    onClick={() => setNewUnitsModal(false)}
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
                                                                value={newUnits.clientType}
                                                                onChange={(e) => setNewUnits({ ...newUnits, clientType: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="label-style">Property</label>
                                                            <input className="form-control input-style"
                                                                value={newUnits.property}
                                                                onChange={(e) => setNewUnits({ ...newUnits, property: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="label-style">Unit</label>
                                                            <input className="form-control input-style"
                                                                value={newUnits.unit}
                                                                onChange={(e) => setNewUnits({ ...newUnits, unit: e.target.value })}
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
                                                                value={newUnits.quotedPrice}
                                                                onChange={(e) => setNewUnits({ ...newUnits, quotedPrice: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="label-style">Negotiated Price</label>
                                                            <input type="number" className="form-control input-style"
                                                                value={newUnits.negotiatedPrice}
                                                                onChange={(e) => setNewUnits({ ...newUnits, negotiatedPrice: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="label-style">Discount %</label>
                                                            <input type="number" className="form-control input-style"
                                                                value={newUnits.discount}
                                                                onChange={(e) => setNewUnits({ ...newUnits, discount: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Status</label>
                                                            <select className="form-select input-style"
                                                                value={newUnits.unitStatus}
                                                                onChange={(e) => setNewUnits({ ...newUnits, unitStatus: e.target.value })}
                                                            >
                                                                <option>Open</option>
                                                                <option>Won</option>
                                                                <option>Lost</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="label-style">Payment Plan</label>
                                                            <input className="form-control input-style"
                                                                value={newUnits.paymentPlan}
                                                                onChange={(e) => setNewUnits({ ...newUnits, paymentPlan: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="label-style">Consultant</label>
                                                            <input className="form-control input-style"
                                                                value={newUnits.consultant}
                                                                onChange={(e) => setNewUnits({ ...newUnits, consultant: e.target.value })}
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
                                                        value={newUnits.notes}
                                                        onChange={(e) => setNewUnits({ ...newUnits, notes: e.target.value })}
                                                    />
                                                </div>

                                            </div>

                                            {/* FOOTER */}
                                            <div className="p-4 border-top d-flex gap-3 justify-content-end">
                                                <button className="btn btn-light px-5"
                                                    onClick={() => {
                                                        setNewUnitsModal(false);
                                                        localStorage.removeItem("newUnitsDraft");
                                                    }}>
                                                    Discard
                                                </button>

                                                <button className="btn btn-dark px-5"
                                                    onClick={() => {

                                                        if (!newUnits.property || !newUnits.clientType) {
                                                            alert("Property and Client are required");
                                                            return;
                                                        }

                                                        const updatedUnits = [
                                                            ...units,
                                                            {
                                                                ...newUnits,
                                                                id: Date.now(),
                                                                date: new Date().toLocaleDateString()
                                                            }
                                                        ];

                                                        setUnits(updatedUnits);
                                                        localStorage.setItem("units", JSON.stringify(updatedUnits));

                                                        // reset form
                                                        setNewUnits({
                                                            clientType: "",
                                                            property: "",
                                                            unit: "",
                                                            quotedPrice: "",
                                                            negotiatedPrice: "",
                                                            unitStatus: "Open",
                                                            consultant: "",
                                                            notes: "",
                                                            date: ""
                                                        });

                                                        setNewUnitsModal(false);
                                                    }}>
                                                    Save Units
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
                                {filteredUnits.map((unit) => (
                                    <tr key={unit.id} style={{ borderBottom: '1px solid #eee' }}>

                                        {/* Property */}
                                        <td className="ps-4 py-3 fw-semibold">
                                            {unit.property || "-"}
                                        </td>

                                        {/* Unit */}
                                        <td className="py-3">
                                            {unit.unit || "-"}
                                        </td>

                                        {/* Client */}
                                        <td className="py-3">
                                            {unit.clientType || "-"}
                                        </td>

                                        {/* Price */}
                                        <td className="py-3 fw-bold text-success">
                                            ₹ {unit.negotiatedPrice || unit.quotedPrice || "0"}
                                        </td>

                                        {/* Status */}
                                        <td className="py-3">
                                            <span className={`badge ${unit.unitStatus === "Won"
                                                ? "bg-success"
                                                : unit.unitStatus === "Lost"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                                }`}>
                                                {unit.unitStatus}
                                            </span>
                                        </td>

                                        {/* Assigned To */}
                                        <td className="py-3">
                                            {unit.consultant || "-"}
                                        </td>

                                        {/* Date */}
                                        <td className="py-3 text-muted small">
                                            {unit.date || "-"}
                                        </td>

                                        {/* Actions */}
                                        <td className="pe-4 py-3 text-end">
                                            <button className="btn btn-light btn-sm">
                                                ⋮
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                                {filteredUnits.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-muted">
                                            No units found
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
                .unit-row:hover { 
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

export default Units;