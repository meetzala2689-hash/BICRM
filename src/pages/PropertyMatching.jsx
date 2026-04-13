import React, { useEffect, useState } from 'react';
import { Search, UserPlus, Filter, Users, CheckCircle, Clock, } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropertyMatching = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [filterVisible, setFilterVisible] = useState(() => {
        return localStorage.getItem("filterVisible") === "true";
    });
    const [filterExpanded, setFilterExpanded] = useState(() => {
        return localStorage.getItem("filterExpanded") === "true";
    });
    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem("propertyMatchingFilters");
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        localStorage.setItem("filterVisible", JSON.stringify(filterVisible));
        localStorage.setItem("filterExpanded", JSON.stringify(filterExpanded));
        localStorage.setItem("propertyMatchingFilters", JSON.stringify(filters));
    }, [filterVisible, filterExpanded, filters]);

    // PROPERTY MATCHING STATE
    const [propertyMatching, setPropertyMatching] = useState(() => {
        const saved = localStorage.getItem("propertyMatching");
        return saved ? JSON.parse(saved) : [];
    });

    // const [newPropertyMatchingModal, setNewPropertyMatchingModal] = useState(false);
    const [newPropertyMatchingModal, setNewPropertyMatchingModal] = useState(() => {
        return localStorage.getItem("newPropertyMatchingModal") === "true";
    });
    const [editId, setEditId] = useState(null);


    const handleView = (id) => {
        const selected = propertyMatching.find(item => item.id === id);

        if (!selected) return;

        setNewPropertyMatching({
            clientType: selected.clientName,
            property: selected.propertyName,
            quotedPrice: selected.price,
            dealStatus: selected.dealStatus,
            image: selected.image,
            unit: selected.type,
            location: selected.location
        });

        setNewPropertyMatchingModal(true);
    };

    const handleEdit = (id) => {
        const selected = propertyMatching.find(item => item.id === id);

        if (!selected) return;

        // ✅ SET EDIT ID FIRST
        setEditId(Number(id));

        // ✅ THEN SET DATA
        setNewPropertyMatching({
            clientType: selected.clientName || "",
            property: selected.propertyName || "",
            quotedPrice: selected.price || "",
            dealStatus: selected.dealStatus || "",
            image: selected.image || "",
            unit: selected.type || "",
            location: selected.location || ""
        });

        // ✅ OPEN MODAL LAST
        setNewPropertyMatchingModal(true);

    };

    const handleShare = (id) => {
        const selected = propertyMatching.find(item => item.id === id);
        if (!selected) return;
        setNewPropertyMatching({
            clientType: selected.clientName || "",
            property: selected.propertyName || "",
            quotedPrice: selected.price || "",
            dealStatus: selected.dealStatus || "",
            image: selected.image || "",
            unit: selected.type || "",
            location: selected.location || ""
        });
        setNewPropertyMatchingModal(true);
    };

    const handleDelete = (id) => {
        const updated = propertyMatching.filter(item => item.id !== id);
        setPropertyMatching(updated);
        localStorage.setItem("propertyMatching", JSON.stringify(updated));
    };

    // NEW PROPERTY MATCHING STATE   
    const [newPropertyMatching, setNewPropertyMatching] = useState(() => {
        const saved = localStorage.getItem("newPropertyMatchingDraft");
        return saved
            ? JSON.parse(saved)
            : {
                clientType: "",
                property: "",
                quotedPrice: "",
                dealStatus: "",
                image: "",
                unit: "",
                location: "",
            };
    });

    // AUTO SAVE DRAFT
    useEffect(() => {
        localStorage.setItem("newPropertyMatchingDraft", JSON.stringify(newPropertyMatching));
    }, [newPropertyMatching]);

    useEffect(() => {
        localStorage.setItem("newPropertyMatchingModal", newPropertyMatchingModal);
    }, [newPropertyMatchingModal]);

    const filteredPropertyMatching = propertyMatching.filter(deal => {
        const matchesSearch =
            deal.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.time?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.dealStatus?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.image?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.price?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === '' || deal.dealStatus === statusFilter;

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
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* TOP SECTION */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-end mb-3 gap-4">
                    <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-bold">CRM Dashboard</span>
                        <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Property Matching</h1>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mb-3">
                    <StatCard icon={<Users size={22} />} label="Total Property Matching" value="1,284" color="#6366f1" />
                    <StatCard icon={<CheckCircle size={22} />} label="Active Now" value="840" color="#10b981" />
                    <StatCard icon={<Clock size={22} />} label="Pending" value="12" color="#f59e0b" />
                </div>

                {/* DATA CARD */}
                <div className="card border-0 shadow-sm rounded-4 bg-white overflow-visible">
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
                                                                <i className="bi bi-filter-right me-2 text-primary"></i> Filter Property Matching
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
                                                                        <p className="text-muted small mb-0">Select a field above to start filtering property matching.</p>
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
                                    onClick={() => {
                                        setEditId(null);
                                        setNewPropertyMatching({
                                            clientType: "",
                                            property: "",
                                            quotedPrice: "",
                                            dealStatus: "",
                                            image: "",
                                            unit: "",
                                            location: ""
                                        });
                                        setNewPropertyMatchingModal(true);
                                    }}
                                >
                                    <UserPlus size={18} /> New Property Matching
                                </button> */}


                                <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                                    onClick={() => {
                                        setNewPropertyMatching({
                                            clientType: "",
                                            property: "",
                                            quotedPrice: "",
                                            dealStatus: "",
                                            image: "",
                                            unit: "",
                                            location: ""
                                        });
                                        setNewPropertyMatchingModal(true);
                                        localStorage.setItem("newPropertyMatchingModal", "true");
                                    }}
                                >
                                    <UserPlus size={18} />

                                    <span className="d-none d-sm-inline">New Property Matching</span>

                                    <span className="d-inline d-sm-none">+</span>
                                </button>

                                {/* New Property Matching Modal */}
                                {newPropertyMatchingModal && (
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
                                                    <h4 className="m-0 fw-black">Add Property Matching</h4>
                                                    <p className="text-muted small mb-0">Create complete property matching profile</p>
                                                </div>

                                                <button
                                                    className="btn btn-light rounded-circle"
                                                    onClick={() => setNewPropertyMatchingModal(false)}
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            {/* BODY */}
                                            <div className="p-4 overflow-auto" style={{ flex: 1 }}>
                                                <div className="row g-3">
                                                    <div className="col-12">
                                                        <label className="small fw-bold text-muted mb-1">Client Name</label>
                                                        <input className="form-control border-0 bg-light py-2 shadow-none"
                                                            placeholder="e.g. Ankit Verma"
                                                            value={newPropertyMatching.clientType}
                                                            onChange={(e) => setNewPropertyMatching({ ...newPropertyMatching, clientType: e.target.value })}
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <label className="small fw-bold text-muted mb-1">Property Name</label>
                                                        <input className="form-control border-0 bg-light py-2 shadow-none"
                                                            placeholder="e.g. Luxury Sky Villa"
                                                            value={newPropertyMatching.property}
                                                            onChange={(e) => setNewPropertyMatching({ ...newPropertyMatching, property: e.target.value })}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1">Price</label>
                                                        <input className="form-control border-0 bg-light py-2 shadow-none"
                                                            placeholder="e.g. 1.25 Cr"
                                                            value={newPropertyMatching.quotedPrice}
                                                            onChange={(e) => setNewPropertyMatching({ ...newPropertyMatching, quotedPrice: e.target.value })}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1">Deal Status</label>
                                                        <select className="form-select border-0 bg-light py-2 shadow-none"
                                                            value={newPropertyMatching.dealStatus}
                                                            onChange={(e) => setNewPropertyMatching({ ...newPropertyMatching, dealStatus: e.target.value })}
                                                        >
                                                            <option value="Open">Open</option>
                                                            <option value="Close">Close</option>
                                                            <option value="Matched">Matched</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-12">
                                                        <label className="small fw-bold text-muted mb-1">Image URL</label>
                                                        <input className="form-control border-0 bg-light py-2 shadow-none"
                                                            placeholder="Paste image link here"
                                                            value={newPropertyMatching.image} // Logic kept same
                                                            onChange={(e) => setNewPropertyMatching({ ...newPropertyMatching, image: e.target.value })}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1">Unit Detail</label>
                                                        <input className="form-control border-0 bg-light py-2 shadow-none"
                                                            placeholder="e.g. 3BHK"
                                                            value={newPropertyMatching.unit}
                                                            onChange={(e) => setNewPropertyMatching({ ...newPropertyMatching, unit: e.target.value.toUpperCase() })}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1">Location / Address</label>
                                                        <input className="form-control border-0 bg-light py-2 shadow-none"
                                                            placeholder="e.g. Bopal"
                                                            value={newPropertyMatching.location}
                                                            onChange={(e) => setNewPropertyMatching({ ...newPropertyMatching, location: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase() })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* FOOTER */}
                                            <div className="p-4 border-top d-flex gap-3 justify-content-end">
                                                <button className="btn btn-light px-5"
                                                    onClick={() => {
                                                        setNewPropertyMatchingModal(false);
                                                        localStorage.removeItem("newPropertyMatchingDraft");
                                                    }}>
                                                    Discard
                                                </button>

                                                <button
                                                    className="btn btn-dark px-5"
                                                    onClick={() => {
                                                        let updatedData = [];

                                                        if (editId) {
                                                            // ✅ UPDATE
                                                            updatedData = propertyMatching.map(item => {
                                                                if (item.id === Number(editId)) {
                                                                    return {
                                                                        ...item,
                                                                        clientName: newPropertyMatching.clientType,
                                                                        propertyName: newPropertyMatching.property,
                                                                        price: newPropertyMatching.quotedPrice,
                                                                        type: newPropertyMatching.unit,
                                                                        dealStatus: newPropertyMatching.dealStatus,
                                                                        location: newPropertyMatching.location,
                                                                        image: newPropertyMatching.image,
                                                                        title: newPropertyMatching.property
                                                                    };
                                                                }
                                                                return item;
                                                            });
                                                        } else {
                                                            // ✅ CREATE
                                                            const newEntry = {
                                                                id: Date.now(),
                                                                clientName: newPropertyMatching.clientType,
                                                                propertyName: newPropertyMatching.property,
                                                                price: newPropertyMatching.quotedPrice,
                                                                type: newPropertyMatching.unit,
                                                                dealStatus: newPropertyMatching.dealStatus,
                                                                location: newPropertyMatching.location,
                                                                image: newPropertyMatching.image || "https://via.placeholder.com/150",
                                                                title: newPropertyMatching.property,
                                                                consultant: "Admin",
                                                                date: new Date().toLocaleDateString()
                                                            };

                                                            updatedData = [...propertyMatching, newEntry];
                                                        }

                                                        // ✅ IMPORTANT: update state FIRST
                                                        setPropertyMatching(updatedData);

                                                        // ✅ THEN localStorage
                                                        localStorage.setItem("propertyMatching", JSON.stringify(updatedData));

                                                        // ✅ reset
                                                        setEditId(null);

                                                        setNewPropertyMatching({
                                                            clientType: "",
                                                            property: "",
                                                            quotedPrice: "",
                                                            dealStatus: "",
                                                            image: "",
                                                            unit: "",
                                                            location: ""
                                                        });

                                                        setNewPropertyMatchingModal(false);
                                                    }}
                                                >
                                                    Save Property Matching
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
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

            <div className="table-responsive">
                <div className="d-flex flex-wrap gap-3 p-3 ">
                    {filteredPropertyMatching.map((item) => (
                        <div
                            key={item.id}
                            className="card border-0 shadow-sm rounded-4 bg-white p-3"
                            style={{ width: '350px', border: '1px solid #f0f0f0' }}
                        >
                            {/* HEADER: Name and Matched Badge */}
                            <div className="d-flex justify-content-between align-items-start mb-0">
                                <div>
                                    <h5 className="fw-bold m-0" style={{ fontSize: '1.1rem', color: '#333' }}>
                                        {item.clientName}
                                    </h5>
                                    <p className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
                                        {item.id}
                                    </p>
                                </div>
                                <span
                                    className="badge rounded-pill border px-2 py-1"
                                    style={{ backgroundColor: '#eef2ff', color: '#6366f1', fontSize: '0.75rem', border: '1px solid #c7d2fe !important' }}
                                >
                                    <i className="bi bi-check2 me-1"></i>{item.dealStatus}
                                </span>
                            </div>

                            {/* BODY: Image and Main Details */}
                            <div className="d-flex gap-3 mb-3">
                                <div className="rounded-3 overflow-hidden" style={{ width: '100px', height: '100px' }}>
                                    <img
                                        src={item.image || "https://via.placeholder.com/150"}
                                        alt="property"
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                </div>

                                <div className="flex-grow-1">
                                    <h6 className="fw-bold m-0" style={{ color: '#4f46e5', fontSize: '1.05rem' }}>
                                        {item.title}
                                    </h6>
                                    <p className="text-muted m-0" style={{ fontSize: '0.9rem' }}>
                                        {item.type} • {item.location}
                                    </p>
                                    <p className="text-muted fw-medium m-0" style={{ fontSize: '0.9rem' }}>
                                        Price: <span style={{ color: '#999' }}>₹{item.price}</span>
                                    </p>
                                </div>
                            </div>

                            {/* PILLS: Extra Info */}
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="badge rounded-pill bg-light text-dark border px-2 py-2 fw-normal" style={{ fontSize: '0.8rem' }}>
                                    💰 {item.price}
                                </span>
                                <span className="badge rounded-pill bg-light text-dark border px-2 py-2 fw-normal" style={{ fontSize: '0.8rem' }}>
                                    {item.type}
                                </span>
                                <span className="badge rounded-pill bg-light text-dark border px-2 py-2 fw-normal" style={{ fontSize: '0.8rem' }}>
                                    📍 {item.location}
                                </span>
                                <span className="badge rounded-pill bg-light text-dark border px-2 py-2 fw-normal" style={{ fontSize: '0.8rem' }}>
                                    {item.propertyType}
                                </span>
                                <span className="badge rounded-pill bg-light text-dark border px-2 py-2 fw-normal" style={{ fontSize: '0.8rem' }}>
                                    {item.propertyStatus}
                                </span>
                            </div>

                            {/* FOOTER: Action Buttons */}
                            <div className="d-flex gap-2 pt-2 border-top-0">
                                {[
                                    { icon: 'bi-eye', color: '#666', onClick: () => handleView(item.id) },
                                    { icon: 'bi-share', color: '#666', onClick: () => handleShare(item.id) },
                                    { icon: 'bi-pencil-square', color: '#666', onClick: () => handleEdit(item.id) },
                                    { icon: 'bi-trash', color: '#666', onClick: () => handleDelete(item.id) }
                                ].map((btn, idx) => (
                                    <button
                                        key={idx}
                                        onClick={btn.onClick}
                                        className="btn btn-light bg-white border d-flex align-items-center justify-content-center rounded-3"
                                        style={{ width: '40px', height: '40px', padding: '0' }}
                                    >
                                        <i className={`bi ${btn.icon}`} style={{ color: btn.color, fontSize: '1.1rem' }}></i>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPropertyMatching.length === 0 && (

                    <div colSpan="8" className="text-center py-4 text-muted">
                        No property matching found
                    </div>

                )}


            </div>
        </div>
    );
};



export default PropertyMatching;