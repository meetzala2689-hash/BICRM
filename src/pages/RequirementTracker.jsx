import React, { useEffect, useState } from 'react';
import { Search, UserPlus, Filter, Users, CheckCircle, Clock, } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequirementTracker = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [filterVisible, setFilterVisible] = useState(() => {
        return localStorage.getItem("filterVisible") === "true";
    });

    const [filterExpanded, setFilterExpanded] = useState(() => {
        return localStorage.getItem("filterExpanded") === "true";
    });

    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem("requirementTrackerFilters");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("filterVisible", JSON.stringify(filterVisible));
        localStorage.setItem("filterExpanded", JSON.stringify(filterExpanded));
        localStorage.setItem("requirementTrackerFilters", JSON.stringify(filters));
    }, [filterVisible, filterExpanded, filters]);

    // REQUIREMENT TRACKER STATE
    const [requirementTracker, setRequirementTracker] = useState(() => {
        const saved = localStorage.getItem("requirementTracker");
        return saved ? JSON.parse(saved) : [];
    });

    // const [newRequirementTrackerModal, setNewRequirementTrackerModal] = useState(false);
    const [newRequirementTrackerModal, setNewRequirementTrackerModal] = useState(() => {
        return localStorage.getItem("newRequirementTrackerModal") === "true";
    });

    // NEW REQUIREMENT TRACKER STATE   
    const [newRequirementTracker, setNewRequirementTracker] = useState(() => {
        const saved = localStorage.getItem("newRequirementTrackerDraft");
        return saved
            ? JSON.parse(saved)
            : {
                client: "",
                minBudget: "",
                maxBudget: "",
                propertyType: "",
                urgencyLevel: "",
                purchaseTimeline: "",
                preferredAreas: "",
                occupation: "",
                familySize: "",
                loanRequired: "",
                financingType: "",
                preferredFloor: "",
                mustHaveAmenities: "",
                dealBreakers: "",
                notes: "",
                requirementStatus: "Active",
            };
    });

    // AUTO SAVE DRAFT
    useEffect(() => {
        localStorage.setItem("newRequirementTrackerDraft", JSON.stringify(newRequirementTracker));
    }, [newRequirementTracker]);

    useEffect(() => {
        localStorage.setItem("newRequirementTrackerModal", newRequirementTrackerModal);
    }, [newRequirementTrackerModal]);

    const filteredRequirementTracker = (requirementTracker || []).filter(item => {
        const matchesSearch =
            (item.propertyType || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.client || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === '' || item.requirementStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });


    const totalRequirementTrackers = (requirementTracker || []).length;
    const normalize = (v) => (v || "").toLowerCase();

    const activeRequirementTrackers = (requirementTracker || []).filter(
        (r) => normalize(r.urgencyLevel) === "active" || normalize(r.requirementStatus) === "active"
    ).length;

    const pendingRequirementTrackers = (requirementTracker || []).filter(
        (r) => normalize(r.urgencyLevel) === "pending" || normalize(r.requirementStatus) === "pending"
    ).length;

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* TOP SECTION */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-end mb-5 gap-4">
                    <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-bold">CRM Dashboard</span>
                        <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Requirement Tracker</h1>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mb-4">
                    <StatCard icon={<Users size={22} />} label="Total Requirements" value={totalRequirementTrackers} color="#6366f1" />
                    <StatCard icon={<CheckCircle size={22} />} label="Active Now" value={activeRequirementTrackers} color="#10b981" />
                    <StatCard icon={<Clock size={22} />} label="Pending" value={pendingRequirementTrackers} color="#f59e0b" />
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
                                            } else { }
                                        }}
                                    >
                                        <Filter size={18} /> Filter
                                    </button>

                                    {filterVisible && (
                                        <div className="position-absolute  mt-1 p-3 bg-white shadow rounded-4" style={{ zIndex: 10, minWidth: '220px' }}>
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
                                                                <i className="bi bi-filter-right me-2 text-primary"></i> Filter Requirement Tracker
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
                                                                        <p className="text-muted small mb-0">Select a field above to start filtering requirement tracker.</p>
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
                                {/* 
                                <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex align-items-center gap-2 shadow-sm"
                                    onClick={() => setNewRequirementTrackerModal(true)} // open modal
                                >
                                    <UserPlus size={18} /> New Requirement Tracker
                                </button> */}


                                <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                                    onClick={() => {
                                        setNewRequirementTrackerModal(true);
                                        localStorage.setItem("newRequirementTrackerModal", "true");
                                    }}
                                >
                                    <UserPlus size={18} />

                                    <span className="d-none d-sm-inline">New Requirement Tracker</span>

                                    <span className="d-inline d-sm-none">+</span>
                                </button>

                                {/* New Requirement Tracker Modal */}
                                {newRequirementTrackerModal && (
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
                                                    <h4 className="m-0 fw-black">Add Detailed Requirement Tracker</h4>
                                                    <p className="text-muted small mb-0">Create complete Requirement Tracker profile</p>
                                                </div>

                                                <button
                                                    className="btn btn-light rounded-circle"
                                                    onClick={() => setNewRequirementTrackerModal(false)}
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
                                                            <label className="label-style">Client</label>
                                                            <input className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.client}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, client: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="label-style">Min Budget</label>
                                                            <input className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.minBudget}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, minBudget: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="label-style">Max Budget</label>
                                                            <input className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.maxBudget}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, maxBudget: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="form-label small fw-semibold text-secondary mb-1">
                                                                Property Type
                                                            </label>
                                                            <select
                                                                className="form-select border-0 bg-light shadow-sm"
                                                                style={{
                                                                    fontSize: '0.875rem',
                                                                    padding: '0.6rem 0.75rem',
                                                                    cursor: 'pointer',
                                                                    borderRadius: '8px'
                                                                }}
                                                                value={newRequirementTracker.propertyType}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, propertyType: e.target.value })}
                                                            >
                                                                <option value="" disabled>Select Property Type</option>
                                                                <option value="Residential">Residential</option>
                                                                <option value="Commercial">Commercial</option>
                                                                <option value="Industrial">Industrial</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Urgency Level</label>
                                                            <input className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.urgencyLevel}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, urgencyLevel: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Purchase Timeline</label>
                                                            <input className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.purchaseTimeline}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, purchaseTimeline: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Occupation</label>
                                                            <input className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.occupation}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, occupation: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Family Size</label>
                                                            <input className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.familySize}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, familySize: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Loan Required</label>
                                                            <input className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.loanRequired}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, loanRequired: e.target.value })}
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
                                                        <div className="col-md-6">
                                                            <label className="label-style">Preferred Areas (Priority List)</label>
                                                            <input type="number" className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.preferredAreas}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, preferredAreas: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="label-style">Financing Type</label>
                                                            <input type="number" className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.financingType}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, financingType: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="label-style">Preferred Floor</label>
                                                            <select className="form-select input-style bg-light"
                                                                value={newRequirementTracker.preferredFloor}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, preferredFloor: e.target.value })}
                                                            >
                                                                <option>Open</option>
                                                                <option>Won</option>
                                                                <option>Lost</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="label-style">Must Have Amenities</label>
                                                            <input type="number" className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.mustHaveAmenities}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, mustHaveAmenities: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="label-style">Deal Breakers</label>
                                                            <input className="form-control input-style bg-light border-0"
                                                                value={newRequirementTracker.dealBreakers}
                                                                onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, dealBreakers: e.target.value })}
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
                                                        className="form-control input-style bg-light border-0"
                                                        rows="3"
                                                        value={newRequirementTracker.notes}
                                                        onChange={(e) => setNewRequirementTracker({ ...newRequirementTracker, notes: e.target.value })}
                                                    />
                                                </div>

                                            </div>

                                            {/* FOOTER */}
                                            <div className="p-4 border-top d-flex gap-3 justify-content-end">
                                                <button className="btn btn-light px-5"
                                                    onClick={() => {
                                                        setNewRequirementTrackerModal(false);
                                                        localStorage.removeItem("newRequirementTrackerDraft");
                                                    }}>
                                                    Discard
                                                </button>

                                                <button className="btn btn-dark px-5"
                                                    onClick={() => {

                                                        // if (!newRequirementTracker.client || !newRequirementTracker.minBudget || !newRequirementTracker.maxBudget || !newRequirementTracker.propertyType || !newRequirementTracker.urgencyLevel || !newRequirementTracker.purchaseTimeline || !newRequirementTracker.priorityAreas || !newRequirementTracker.occupation || !newRequirementTracker.preferredFloor || !newRequirementTracker.mustHaveAmenities || !newRequirementTracker.dealBreakers || !newRequirementTracker.notes) {
                                                        //     alert("Please fill all the fields");
                                                        //     return;
                                                        // }

                                                        const updatedRequirementTracker = [
                                                            ...requirementTracker,
                                                            {
                                                                ...newRequirementTracker,
                                                                id: Date.now(),
                                                                date: new Date().toLocaleDateString()
                                                            }
                                                        ];

                                                        setRequirementTracker(updatedRequirementTracker);
                                                        localStorage.setItem("requirementTracker", JSON.stringify(updatedRequirementTracker));

                                                        // reset form
                                                        setNewRequirementTracker({
                                                            client: "",
                                                            minBudget: "",
                                                            maxBudget: "",
                                                            propertyType: "",
                                                            urgencyLevel: "",
                                                            purchaseTimeline: "",
                                                            preferredAreas: "",
                                                            occupation: "",
                                                            familySize: "",
                                                            loanRequired: "",
                                                            financingType: "",
                                                            preferredFloor: "",
                                                            mustHaveAmenities: "",
                                                            dealBreakers: "",
                                                            notes: "",
                                                            requirementStatus: "Active",
                                                        });

                                                        setNewRequirementTrackerModal(false);
                                                    }}>
                                                    Save Requirement
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
                                    <th className="py-3">Client</th>
                                    <th className="ps-4 py-3">Budget (Min-Max)</th>
                                    <th className="py-3">Property Type</th>
                                    <th className="py-3">Preferred Areas</th>
                                    <th className="py-3">Timeline</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequirementTracker.map((req) => (
                                    <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>

                                        {/* Client */}
                                        <td className="ps-4 py-3 fw-semibold">
                                            {req.client || "-"}
                                        </td>

                                        {/* Budget */}
                                        <td className="py-3">
                                            {req.minBudget && req.maxBudget 
                                                ? `₹${req.minBudget} - ₹${req.maxBudget}` 
                                                : req.minBudget || req.maxBudget || "-"}
                                        </td>

                                        {/* Property Type */}
                                        <td className="py-3">
                                            {req.propertyType || "-"}
                                        </td>

                                        {/* Preferred Areas */}
                                        <td className="py-3 fw-bold">
                                            {req.preferredAreas || "-"}
                                        </td>

                                        {/* Timeline */}
                                        <td className="py-3">
                                            {req.purchaseTimeline || "-"}
                                        </td>

                                        {/* Status */}
                                        <td className="py-3">
                                            <span className={`badge ${normalize(req.urgencyLevel) === "high" || normalize(req.requirementStatus) === "active"
                                                ? "bg-danger"
                                                : normalize(req.urgencyLevel) === "low" || normalize(req.requirementStatus) === "closed"
                                                    ? "bg-secondary"
                                                    : "bg-warning text-dark"
                                                }`}>
                                                {req.urgencyLevel || req.requirementStatus || "Active"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="pe-4 py-3 text-end">
                                            <button className="btn btn-light btn-sm">
                                                ⋮
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                                {filteredRequirementTracker.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-muted">
                                            No requirementTracker found
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
                .requirementTracker-row:hover { 
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

export default RequirementTracker;