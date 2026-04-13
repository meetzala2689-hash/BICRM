import React, { useEffect, useState } from 'react';
import { Search, UserPlus, Filter, Users, CheckCircle, Clock, } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropertySharing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [filterVisible, setFilterVisible] = useState(() => {
        return localStorage.getItem("filterVisible") === "true";
    });

    const [filterExpanded, setFilterExpanded] = useState(() => {
        return localStorage.getItem("filterExpanded") === "true";
    });

    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem("propertySharingFilters");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("filterVisible", JSON.stringify(filterVisible));
        localStorage.setItem("filterExpanded", JSON.stringify(filterExpanded));
        localStorage.setItem("propertySharingFilters", JSON.stringify(filters));
    }, [filterVisible, filterExpanded, filters]);

    // PROPERTY SHARING STATE
    const [propertySharing, setPropertySharing] = useState(() => {
        const saved = localStorage.getItem("propertySharing");
        return saved ? JSON.parse(saved) : [];
    });

    // const [newPropertySharingModal, setNewPropertySharingModal] = useState(false);
    const [newPropertySharingModal, setNewPropertySharingModal] = useState(() => {
        return localStorage.getItem("newPropertySharingModal") === "true";
    });

    // NEW PROPERTY SHARING STATE   
    const [newPropertySharing, setNewPropertySharing] = useState(() => {
        const saved = localStorage.getItem("newPropertySharingDraft");
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
                propertyStatus: "",
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
        localStorage.setItem("newPropertySharingDraft", JSON.stringify(newPropertySharing));
    }, [newPropertySharing]);

    useEffect(() => {
        localStorage.setItem("newPropertySharingModal", newPropertySharingModal);
    }, [newPropertySharingModal]);

    const filteredPropertySharing = propertySharing.filter(propertySharing => {
        const matchesSearch =
            propertySharing.property?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            propertySharing.clientType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            propertySharing.consultant?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === '' || propertySharing.propertyStatus === statusFilter;

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

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* TOP SECTION */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-end mb-3 gap-4">
                    <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-bold">CRM Dashboard</span>
                        <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Property Sharing</h1>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mb-4">
                    <StatCard icon={<Users size={22} />} label="Total Property Sharing" value="1,284" color="#6366f1" />
                    <StatCard icon={<CheckCircle size={22} />} label="Active Now" value="840" color="#10b981" />
                    <StatCard icon={<Clock size={22} />} label="Pending" value="12" color="#f59e0b" />
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
                                                                <i className="bi bi-filter-right me-2 text-primary"></i> Filter Property Sharing
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
                                                                        <p className="text-muted small mb-0">Select a field above to start filtering property sharing.</p>
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
                                    onClick={() => setNewPropertySharingModal(true)} // open modal
                                >
                                    <UserPlus size={18} /> New Property Sharing
                                </button> */}

                                <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                                    onClick={() => {
                                        setNewPropertySharingModal(true);
                                        localStorage.setItem("newPropertySharingModal", "true");
                                    }}
                                >
                                    <UserPlus size={18} />

                                    <span className="d-none d-sm-inline">New Property Sharing</span>

                                    <span className="d-inline d-sm-none">+</span>
                                </button>

                                {/* New Property Sharing Modal */}
                                {newPropertySharingModal && (
                                    <div
                                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                        style={{
                                            background: 'rgba(15, 23, 42, 0.7)', // Deeper, more modern overlay
                                            backdropFilter: 'blur(12px)',
                                            zIndex: 2000
                                        }}
                                    >
                                        <div
                                            className="bg-white shadow-2xl"
                                            style={{
                                                width: '100%',
                                                maxWidth: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                border: '1px solid rgba(0,0,0,0.05)',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {/* HEADER */}
                                            <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center bg-white">
                                                <div>
                                                    <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: '-0.5px' }}>Add Detailed Sharing</h4>
                                                    <p className="text-muted small mb-0">Configure sharing parameters and client profile</p>
                                                </div>

                                                <button
                                                    className="btn btn-link text-muted text-decoration-none p-2 hover-bg-light rounded-circle"
                                                    onClick={() => setNewPropertySharingModal(false)}
                                                    style={{ transition: 'all 0.2s' }}
                                                >
                                                    <span style={{ fontSize: '1.5rem', lineHeight: '1' }}>&times;</span>
                                                </button>
                                            </div>

                                            {/* BODY */}
                                            <div className="p-4 overflow-auto bg-light bg-opacity-50" style={{ flex: 1 }}>

                                                {/* SECTION 1: SHARE TARGET */}
                                                <div className="card border-0 shadow-sm rounded-3 mb-4 p-4">
                                                    <h6 className="d-flex align-items-center text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1.2px' }}>
                                                        <span className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle me-2" style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}>01</span>
                                                        Share Target & Identity
                                                    </h6>

                                                    <div className="row g-4">
                                                        <div className="col-md-4">
                                                            <label className="label-style small fw-semibold text-secondary mb-2">Property</label>
                                                            <select className="form-select border-0 bg-light py-2 shadow-none"
                                                                value={newPropertySharing.property}
                                                                onChange={(e) => setNewPropertySharing({ ...newPropertySharing, property: e.target.value })}
                                                            >
                                                                <option value="">Select Property</option>
                                                                <option value="Green Valley">Green Valley — 2BHK • $25L</option>
                                                                <option value="Marina Bay">Marina Bay — 2BHK • $48L</option>
                                                                <option value="Palam Heights">Palam Heights — 4BHK • $1.5cr</option>
                                                                <option value="Skyline Residency">Skyline Residency — 3BHK • $85L</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="label-style small fw-semibold text-secondary mb-2">Client</label>
                                                            <select className="form-select border-0 bg-light py-2 shadow-none"
                                                                value={newPropertySharing.client}
                                                                onChange={(e) => setNewPropertySharing({ ...newPropertySharing, client: e.target.value })}
                                                            >
                                                                <option value="">Select Client</option>
                                                                <option value="RaviKumar">Ravi Kumar</option>
                                                                <option value="PriyaSharma">Priya Sharma</option>
                                                                <option value="AmitSingh">Amit Singh</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="label-style small fw-semibold text-secondary mb-2">Share Mode</label>
                                                            <select className="form-select border-0 bg-light py-2 shadow-none"
                                                                value={newPropertySharing.shareMode}
                                                                onChange={(e) => setNewPropertySharing({ ...newPropertySharing, shareMode: e.target.value })}
                                                            >
                                                                <option value="">Select Share Mode</option>
                                                                <option value="Email">Email</option>
                                                                <option value="WhatsApp">WhatsApp</option>
                                                                <option value="Call">Call</option>
                                                                <option value="SMS">SMS</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="label-style small fw-semibold text-secondary mb-2">Recipient Contact</label>
                                                            <input className="form-control border-0 bg-light py-2 shadow-none"
                                                                placeholder="Enter contact info..."
                                                                value={newPropertySharing.recipientContact}
                                                                onChange={(e) => setNewPropertySharing({ ...newPropertySharing, recipientContact: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* SECTION 2: CONTENT SETTINGS */}
                                                <div className="card border-0 shadow-sm rounded-3 mb-4 p-4">
                                                    <h6 className="d-flex align-items-center text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1.2px' }}>
                                                        <span className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle me-2" style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}>02</span>
                                                        Content Settings
                                                    </h6>

                                                    <div className="row g-4">
                                                        <div className="col-md-12">
                                                            <label className="label-style small fw-semibold text-secondary mb-2">Message Template</label>
                                                            <select className="form-select border-0 bg-light py-2 shadow-none w-50"
                                                                value={newPropertySharing.messageTemplate}
                                                                onChange={(e) => setNewPropertySharing({ ...newPropertySharing, messageTemplate: e.target.value })}
                                                            >
                                                                <option value="">Select Template</option>
                                                                <option value="template1">Custom Message</option>
                                                                <option value="template2">Standard Introduction</option>
                                                                <option value="template3">Budget Friendly</option>
                                                                <option value="template4">Urgency / Limited Units</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <label className="label-style small fw-semibold text-secondary mb-2">Custom Message</label>
                                                            <textarea className="form-control border-0 bg-light py-2 shadow-none"
                                                                placeholder="Type your personalized message here..."
                                                                value={newPropertySharing.customMessage}
                                                                rows="3"
                                                                onChange={(e) => setNewPropertySharing({ ...newPropertySharing, customMessage: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="d-flex gap-5 border-top pt-4 mt-2">
                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox" role="switch" id="includePrice"
                                                                        checked={newPropertySharing.includePrice}
                                                                        onChange={(e) => setNewPropertySharing({ ...newPropertySharing, includePrice: e.target.checked })}
                                                                    />
                                                                    <label className="form-check-label small fw-medium text-dark" htmlFor="includePrice">Include Price</label>
                                                                </div>
                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox" role="switch" id="includeImages"
                                                                        checked={newPropertySharing.includeImages}
                                                                        onChange={(e) => setNewPropertySharing({ ...newPropertySharing, includeImages: e.target.checked })}
                                                                    />
                                                                    <label className="form-check-label small fw-medium text-dark" htmlFor="includeImages">Include Images</label>
                                                                </div>
                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox" role="switch" id="includeBrochure"
                                                                        checked={newPropertySharing.includeBrochure}
                                                                        onChange={(e) => setNewPropertySharing({ ...newPropertySharing, includeBrochure: e.target.checked })}
                                                                    />
                                                                    <label className="form-check-label small fw-medium text-dark" htmlFor="includeBrochure">Include Brochure</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* SECTION 3: TRACKING */}
                                                <div className="card border-0 shadow-sm rounded-3 p-4 border-start border-primary border-4">
                                                    <h6 className="d-flex align-items-center text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1.2px' }}>
                                                        <span className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle me-2" style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}>03</span>
                                                        Tracking <span className="ms-2 badge bg-primary bg-opacity-10 text-primary fw-normal">Auto-generated</span>
                                                    </h6>
                                                    <div className='row g-3'>
                                                        {[
                                                            { label: 'Share Status', key: 'shareStatus' },
                                                            { label: 'Share Date', key: 'shareDate' },
                                                            { label: 'Viewed Time', key: 'viewedTime' },
                                                            { label: 'Click Count', key: 'clickCount' }
                                                        ].map((field) => (
                                                            <div className="col-md-3" key={field.key}>
                                                                <label className="label-style small fw-semibold text-secondary mb-1">{field.label}</label>
                                                                <input className="form-control border-0 bg-white shadow-sm py-2"
                                                                    style={{ fontSize: '0.9rem' }}
                                                                    value={newPropertySharing[field.key]}
                                                                    onChange={(e) => setNewPropertySharing({ ...newPropertySharing, [field.key]: e.target.value })}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* FOOTER */}
                                            <div className="px-4 py-3 border-top d-flex gap-3 justify-content-end bg-white">
                                                <button className="btn btn-light px-4 fw-medium border"
                                                    onClick={() => {
                                                        setNewPropertySharingModal(false);
                                                        localStorage.removeItem("newPropertySharingDraft");
                                                    }}>
                                                    Discard
                                                </button>

                                                <button className="btn btn-dark px-5 fw-bold shadow-sm"
                                                    onClick={() => {


                                                        const updatedPropertySharing = [
                                                            ...propertySharing,
                                                            {
                                                                ...newPropertySharing,
                                                                id: Date.now(),
                                                                date: new Date().toLocaleDateString()
                                                            }
                                                        ];

                                                        setPropertySharing(updatedPropertySharing);
                                                        localStorage.setItem("propertySharing", JSON.stringify(updatedPropertySharing));

                                                        setNewPropertySharing({
                                                            clientType: "", property: "", unit: "", quotedPrice: "",
                                                            negotiatedPrice: "", propertyStatus: "Open", consultant: "",
                                                            notes: "", date: ""
                                                        });

                                                        setNewPropertySharingModal(false);
                                                    }}>
                                                    Save Property Sharing
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
                                {filteredPropertySharing.map((propertySharing) => (
                                    <tr key={propertySharing.id} style={{ borderBottom: '1px solid #eee' }}>

                                        {/* Property */}
                                        <td className="ps-4 py-3 fw-semibold">
                                            {propertySharing.property || "-"}
                                        </td>

                                        {/* Unit */}
                                        <td className="py-3">
                                            {propertySharing.unit || "-"}
                                        </td>

                                        {/* Client */}
                                        <td className="py-3">
                                            {propertySharing.clientType || "-"}
                                        </td>

                                        {/* Price */}
                                        <td className="py-3 fw-bold text-success">
                                            ₹ {propertySharing.negotiatedPrice || propertySharing.quotedPrice || "0"}
                                        </td>

                                        {/* Status */}
                                        <td className="py-3">
                                            <span className={`badge ${propertySharing.propertyStatus === "Won"
                                                ? "bg-success"
                                                : propertySharing.propertyStatus === "Lost"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                                }`}>
                                                {propertySharing.propertyStatus}
                                            </span>
                                        </td>

                                        {/* Assigned To */}
                                        <td className="py-3">
                                            {propertySharing.consultant || "-"}
                                        </td>

                                        {/* Date */}
                                        <td className="py-3 text-muted small">
                                            {propertySharing.date || "-"}
                                        </td>

                                        {/* Actions */}
                                        <td className="pe-4 py-3 text-end">
                                            <button className="btn btn-light btn-sm">
                                                ⋮
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                                {filteredPropertySharing.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-muted">
                                            No property sharing found
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
                .deal-row:hover { 
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

export default PropertySharing;