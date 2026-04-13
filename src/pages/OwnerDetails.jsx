import React, { useEffect, useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Users, CheckCircle, Clock, Mail, Phone, Globe, X } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function OwnerDetails() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // FILTER VISIBLE STATE
    const [filterVisible, setFilterVisible] = useState(() => {
        return localStorage.getItem("filterVisible") === "true";
    });

    // FILTER EXPANDED STATE
    const [filterExpanded, setFilterExpanded] = useState(() => {
        return localStorage.getItem("filterExpanded") === "true";
    });

    // FILTER STATE
    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem("ownerDetailsFilters");
        return saved ? JSON.parse(saved) : [];
    });

    // NEW OWNER DETAILS MODAL STATE
    const [newOwnerDetailsModal, setNewOwnerDetailsModal] = useState(() => {
        return localStorage.getItem("newOwnerDetailsModal") === "true";
    });

    // USE EFFECT TO SAVE STATE
    useEffect(() => {
        localStorage.setItem("filterVisible", JSON.stringify(filterVisible));
        localStorage.setItem("filterExpanded", JSON.stringify(filterExpanded));
        localStorage.setItem("ownerDetailsFilters", JSON.stringify(filters));
        localStorage.setItem("newOwnerDetailsModal", JSON.stringify(newOwnerDetailsModal));
    }, [filterVisible, filterExpanded, filters, newOwnerDetailsModal]);

    // OWNER DETAILS STATE
    const [ownerDetails, setOwnerDetails] = useState(() => {
        const saved = localStorage.getItem("ownerDetails");
        return saved ? JSON.parse(saved) : [];
    });

    // NEW OWNER DETAILS STATE   
    const [newOwnerDetails, setNewOwnerDetails] = useState(() => {
        const saved = localStorage.getItem("newOwnerDetailsDraft");
        return saved
            ? JSON.parse(saved)
            : {
                ownerName: "",
                phone: "",
                alternatePhone: "",
                email: "",
                preferredTime: "",
                country: "",
                state: "",
                city: "",
                pincode: "",
                address: "",
                idType: "",
                idNumber: "",
                ownershipType: "",
                panNumber: "",
                gstNumber: "",
                bankDetails: "",
                ownedProperties: "",
                isVerified: false,
                ownerStatus: "",
                notes: "",
            };
    });

    // AUTO SAVE DRAFT
    useEffect(() => {
        localStorage.setItem("newOwnerDetailsDraft", JSON.stringify(newOwnerDetails));
    }, [newOwnerDetails]);

    // AUTO SAVE NEW OWNER DETAILS MODAL
    useEffect(() => {
        localStorage.setItem("newOwnerDetailsModal", newOwnerDetailsModal);
    }, [newOwnerDetailsModal]);

    // FILTER OWNER DETAILS
    const filteredOwnerDetails = ownerDetails.filter(ownerDetail => {
        const matchesSearch =
            ownerDetail.property?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ownerDetail.clientType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ownerDetail.consultant?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === '' || ownerDetail.ownerDetailsStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // STAT CARD
    const StatCard = ({ icon, label, value, color }) => (
        <div
            className="d-flex align-items-center gap-3 px-4 py-3 rounded-4 transition-all "
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

    // HANDLE SAVE OWNER
    const handleSaveOwner = () => {
        const newEntry = {
            id: Date.now(),
            property: newOwnerDetails.ownerName, // mapping
            unit: "-",
            clientType: newOwnerDetails.email,
            negotiatedPrice: "0",
            ownerDetailsStatus: newOwnerDetails.ownerStatus || "Active",
            consultant: "Admin",
            date: new Date().toLocaleDateString()
        };

        const updatedOwners = [...ownerDetails, newEntry];

        setOwnerDetails(updatedOwners);
        localStorage.setItem("ownerDetails", JSON.stringify(updatedOwners));

        setNewOwnerDetailsModal(false);
    };

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* TOP SECTION */}
                <div className="d-flex flex-column flex-md-row justify-content-between  mb-5 gap-4">
                    <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-bold">CRM Dashboard</span>
                        <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Owner Details</h1>
                    </div>
                </div>

                {/* STAT CARDS */}
                <div className="d-flex flex-wrap gap-3 mb-4">
                    <StatCard icon={<Users size={22} />} label="Total Owner Details" value="1,284" color="#6366f1" />
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
                                                                <i className="bi bi-filter-right me-2 text-primary"></i> Filter Owner Details
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
                                                                        <p className="text-muted small mb-0">Select a field above to start filtering owner details.</p>
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
                                                                        onClick={() => setFilterExpanded(false) || setFilterVisible(false)}
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
                                    onClick={() => {
                                        setNewOwnerDetails({
                                            ownerName: "",
                                            phone: "",
                                            alternatePhone: "",
                                            email: "",
                                            preferredTime: "",
                                            country: "",
                                            state: "",
                                            city: "",
                                            pincode: "",
                                            address: "",

                                            idType: "",
                                            idNumber: "",
                                            ownershipType: "",
                                            panNumber: "",
                                            gstNumber: "",
                                            bankDetails: "",

                                            ownedProperties: "",
                                            isVerified: false,
                                            ownerStatus: "",

                                            notes: "",
                                        });

                                        setNewOwnerDetailsModal(true);
                                    }} // open modal
                                >
                                    <UserPlus size={18} /> New Owner Details
                                </button> */}


                                <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                                    onClick={() => {

                                        setNewOwnerDetails({
                                            ownerName: "",
                                            phone: "",
                                            alternatePhone: "",
                                            email: "",
                                            preferredTime: "",
                                            country: "",
                                            state: "",
                                            city: "",
                                            pincode: "",
                                            address: "",

                                            idType: "",
                                            idNumber: "",
                                            ownershipType: "",
                                            panNumber: "",
                                            gstNumber: "",
                                            bankDetails: "",

                                            ownedProperties: "",
                                            isVerified: false,
                                            ownerStatus: "",

                                            notes: "",
                                        });

                                        setNewOwnerDetailsModal(true);
                                        localStorage.setItem("newOwnerDetailsModal", "true");
                                    }}
                                >
                                    <UserPlus size={18} />

                                    <span className="d-none d-sm-inline">New Owner Details</span>

                                    <span className="d-inline d-sm-none">+</span>
                                </button>


                                {/* New Owner Details Modal */}
                                {newOwnerDetailsModal && (
                                    <div
                                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                        style={{
                                            background: 'rgba(15, 23, 42, 0.4)', // Darker overlay for better focus
                                            backdropFilter: 'blur(10px)',
                                            zIndex: 2000
                                        }}
                                    >
                                        <div
                                            className="bg-white shadow-2xl"
                                            style={{
                                                width: '100%',
                                                maxWidth: '100%', // Constrained width for better readability
                                                height: '100%',
                                                // borderRadius: '24px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                overflow: 'hidden'
                                            }}
                                        >

                                            {/* HEADER */}
                                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-white">
                                                <div>
                                                    <h4 className="m-0 fw-black text-dark">Register New Owner</h4>
                                                    <p className="text-muted small mb-0">Complete the personal, legal, and property relationship profile</p>
                                                </div>
                                                <button
                                                    className="btn btn-light rounded-circle shadow-sm"
                                                    onClick={() => setNewOwnerDetailsModal(false)}
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>

                                            {/* BODY */}
                                            <div className="p-4 overflow-auto bg-light bg-opacity-25" style={{ flex: 1 }}>

                                                {/* SECTION 1: Personal Information */}
                                                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                                                    <h6 className="text-primary fw-bold text-uppercase mb-4 d-flex align-items-center gap-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                                        <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">01</span> Personal Information
                                                    </h6>
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <label className="label-style">Owner Name</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.ownerName} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, ownerName: e.target.value })} placeholder="Full legal name" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="label-style">Email Address</label>
                                                            <input
                                                                type="email"
                                                                className={`form-control input-style ${newOwnerDetails.email && !/^\S+@\S+\.\S+$/.test(newOwnerDetails.email)
                                                                    ? 'border-danger'
                                                                    : ''
                                                                    }`}
                                                                value={newOwnerDetails.email}
                                                                onChange={(e) =>
                                                                    setNewOwnerDetails({
                                                                        ...newOwnerDetails,
                                                                        email: e.target.value,
                                                                    })
                                                                }
                                                                placeholder="owner@example.com"
                                                            />
                                                            {newOwnerDetails.email &&
                                                                !/^\S+@\S+\.\S+$/.test(newOwnerDetails.email) && (
                                                                    <small className="text-danger">Invalid email address</small>
                                                                )}
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Phone Number</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.phone} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, phone: e.target.value })} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Alt. Phone</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.alternatePhone} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, alternatePhone: e.target.value })} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Preferred Contact Time</label>
                                                            <select className="form-select input-style" value={newOwnerDetails.preferredTime} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, preferredTime: e.target.value })}>
                                                                <option>Morning (9AM - 12PM)</option>
                                                                <option>Afternoon (12PM - 5PM)</option>
                                                                <option>Evening (5PM - 9PM)</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-12"><hr className="my-2 opacity-50" /></div>
                                                        <div className="col-md-3">
                                                            <label className="label-style">Country</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.country} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, country: e.target.value })} />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="label-style">State</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.state} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, state: e.target.value })} />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="label-style">City</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.city} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, city: e.target.value })} />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="label-style">Pincode</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.pincode} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, pincode: e.target.value })} />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label className="label-style">Full Address</label>
                                                            <textarea className="form-control input-style" rows="2" value={newOwnerDetails.address} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, address: e.target.value })}></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* SECTION 2: Legal Information */}
                                                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                                                    <h6 className="text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                                        <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">02</span> Legal & Financial
                                                    </h6>
                                                    <div className="row g-3">
                                                        <div className="col-md-4">
                                                            <label className="label-style">ID Proof Type</label>
                                                            <select className="form-select input-style" value={newOwnerDetails.idType} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, idType: e.target.value })}>
                                                                <option>Aadhar Card</option>
                                                                <option>Passport</option>
                                                                <option>Voter ID</option>
                                                                <option>Driving License</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">ID Number</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.idNumber} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, idNumber: e.target.value })} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="label-style">Ownership Type</label>
                                                            <select className="form-select input-style" value={newOwnerDetails.ownershipType} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, ownershipType: e.target.value })}>
                                                                <option>Individual</option>
                                                                <option>Joint Venture</option>
                                                                <option>Corporate/Company</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="label-style">PAN Number</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.panNumber} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, panNumber: e.target.value })} />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="label-style">GST Number (Optional)</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.gstNumber} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, gstNumber: e.target.value })} />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label className="label-style">Bank Details (Bank, A/C No, IFSC)</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.bankDetails} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, bankDetails: e.target.value })} placeholder="Bank Name - 00000000000 - IFSC0000" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* SECTION 3: Property Relation & Docs */}
                                                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                                                    <h6 className="text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                                        <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">03</span> Property Relation
                                                    </h6>
                                                    <div className="row g-3">
                                                        <div className="col-md-12">
                                                            <label className="label-style">Owned Properties</label>
                                                            <input className="form-control input-style" value={newOwnerDetails.ownedProperties} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, ownedProperties: e.target.value })} placeholder="List related units or property IDs" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="label-style">Ownership Proof (PDF/Image)</label>
                                                            <input type="file" className="form-control input-style" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="label-style">Agreement Copy (PDF/Image)</label>
                                                            <input type="file" className="form-control input-style" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* SECTION 4: Owner Status */}
                                                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                                                    <h6 className="text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                                        <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">04</span> Verification & Status
                                                    </h6>
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <label className="label-style">Ownership Verified</label>
                                                            <div className="d-flex gap-3 mt-2">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="verified" id="v1" checked={newOwnerDetails.isVerified === true} onChange={() => setNewOwnerDetails({ ...newOwnerDetails, isVerified: true })} />
                                                                    <label className="form-check-label" htmlFor="v1">Yes, Verified</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="verified" id="v2" checked={newOwnerDetails.isVerified === false} onChange={() => setNewOwnerDetails({ ...newOwnerDetails, isVerified: false })} />
                                                                    <label className="form-check-label" htmlFor="v2">Pending</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="label-style">Owner Status</label>
                                                            <select className="form-select input-style" value={newOwnerDetails.ownerStatus} onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, ownerStatus: e.target.value })}>
                                                                <option>Active</option>
                                                                <option>On Hold</option>
                                                                <option>Inactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* SECTION 5: Notes */}
                                                <div className="card border-0 shadow-sm rounded-4 p-4">
                                                    <h6 className="text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                                        <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">05</span> Additional Remarks
                                                    </h6>
                                                    <textarea
                                                        className="form-control input-style"
                                                        rows="3"
                                                        placeholder="Internal notes or description..."
                                                        value={newOwnerDetails.notes}
                                                        onChange={(e) => setNewOwnerDetails({ ...newOwnerDetails, notes: e.target.value })}
                                                    />
                                                </div>

                                            </div>

                                            {/* FOOTER */}
                                            <div className="p-4 border-top d-flex gap-3 justify-content-end bg-white">
                                                <button className="btn btn-light px-4 fw-bold" onClick={() => setNewOwnerDetailsModal(false)}>
                                                    Discard
                                                </button>
                                                <button
                                                    className="btn btn-dark px-5 fw-bold shadow-sm"
                                                    onClick={handleSaveOwner}
                                                >
                                                    Save Profile
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                )}

                                <style>{`
    .label-style { font-size: 0.75rem; font-weight: 700; color: #64748b; text-uppercase; margin-bottom: 0.5rem; display: block; letter-spacing: 0.5px; }
    .input-style { border-radius: 10px; border: 1px solid #e2e8f0; padding: 0.6rem 0.8rem; font-size: 0.9rem; transition: all 0.2s; }
    .input-style:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); outline: none; }
    .card { background: white !important; }
`}</style>
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
                                {filteredOwnerDetails.map((ownerDetails) => (
                                    <tr key={ownerDetails.id} style={{ borderBottom: '1px solid #eee' }}>

                                        {/* Property */}
                                        <td className="ps-4 py-3 fw-semibold">
                                            {ownerDetails.property || "-"}
                                        </td>

                                        {/* Unit */}
                                        <td className="py-3">
                                            {ownerDetails.unit || "-"}
                                        </td>

                                        {/* Client */}
                                        <td className="py-3">
                                            {ownerDetails.clientType || "-"}
                                        </td>

                                        {/* Price */}
                                        <td className="py-3 fw-bold text-success">
                                            ₹ {ownerDetails.negotiatedPrice || ownerDetails.quotedPrice || "0"}
                                        </td>

                                        {/* Status */}
                                        <td className="py-3">
                                            <span className={`badge ${ownerDetails.ownerDetailsStatus === "Won"
                                                ? "bg-success"
                                                : ownerDetails.ownerDetailsStatus === "Lost"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                                }`}>
                                                {ownerDetails.ownerDetailsStatus}
                                            </span>
                                        </td>

                                        {/* Assigned To */}
                                        <td className="py-3">
                                            {ownerDetails.consultant || "-"}
                                        </td>

                                        {/* Date */}
                                        <td className="py-3 text-muted small">
                                            {ownerDetails.date || "-"}
                                        </td>

                                        {/* Actions */}
                                        <td className="pe-4 py-3 text-end">
                                            <button className="btn btn-light btn-sm">
                                                ⋮
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                                {filteredOwnerDetails.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-muted">
                                            No Owner Details found
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
                .owner-row:hover { 
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

export default OwnerDetails;