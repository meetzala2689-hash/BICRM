import React, { useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Users, CheckCircle, Clock, Mail, Phone, Globe } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tag } from 'lucide-react';
const Property = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterExpanded, setFilterExpanded] = useState(false);
    const [newPropertyModal, setNewPropertyModal] = useState(false);
    // <-- FIX
    const [properties, setProperties] = useState(() => {
        const saved = localStorage.getItem("properties");
        return saved ? JSON.parse(saved) : [];
    });
    const [newProperty, setNewProperty] = useState({
        propertyCode: "",
        propertyTitle: "",
        category: "Apartment",
        purpose: "For Sale",
        unitNo: "",
        carpetArea: "",
        status: "Active"
    });


    const filteredProperty = properties.filter(property =>
        (property.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.propertyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === '' || property.status === statusFilter)
    );
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

    const handleSaveProperty = () => {
        const updatedProperties = [
            ...properties,
            {
                ...newProperty,
                id: Date.now(),
                createdBy: "Admin",
                date: new Date().toLocaleDateString()
            }
        ];

        setProperties(updatedProperties);
        localStorage.setItem("properties", JSON.stringify(updatedProperties));

        // Reset form
        setNewProperty({
            propertyCode: "",
            propertyTitle: "",
            category: "Apartment",
            purpose: "For Sale",
            unitNo: "",
            carpetArea: "",
            status: "Active"
        });

        setNewPropertyModal(false);
    };
    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* TOP SECTION */}
                <div className="d-flex flex-column flex-md-row justify-content-between mb-5 gap-4">
                    <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-bold">CRM Dashboard</span>
                        <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Property</h1>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mb-4">
                    <StatCard icon={<Users size={22} />} label="Total Property" value={properties.length} color="#6366f1" />
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
                                                            setFilterVisible(false);
                                                            setFilterExpanded(false);
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
                                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                                        backdropFilter: 'blur(5px)',
                                                        zIndex: 1050
                                                    }}
                                                >
                                                    <div className="bg-white rounded-4 p-4" style={{ width: '500px', maxWidth: '90%' }}>
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <h5 className="m-0 fw-bold">Filter Property</h5>
                                                            <button

                                                                className="btn btn-sm btn-outline-secondary"
                                                                onClick={() => {
                                                                    setStatusFilter('');
                                                                    setFilterExpanded(false);
                                                                    setFilterVisible(false);
                                                                }}
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>

                                                        {/* Status Filter */}
                                                        <div className="mb-3">
                                                            <label className="d-block mb-2 fw-bold">Status</label>
                                                            <select
                                                                className="form-select"
                                                                value={statusFilter}
                                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                            >
                                                                <option value="">All</option>
                                                                <option value="Active">Active</option>
                                                                <option value="Inactive">Inactive</option>
                                                            </select>
                                                        </div>

                                                        <div className="d-flex justify-content-end gap-2">
                                                            <button
                                                                className="btn btn-outline-secondary btn-sm"
                                                                onClick={() => {
                                                                    setStatusFilter('');
                                                                    setFilterExpanded(false);
                                                                    setFilterVisible(false);
                                                                }}
                                                            >
                                                                Clear Filter
                                                            </button>
                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                onClick={() => setFilterExpanded(false) ||
                                                                    setFilterVisible(false)
                                                                }
                                                            >
                                                                Apply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex align-items-center gap-2 shadow-sm"
                                    onClick={() => setNewPropertyModal(true)} // open modal
                                >
                                    <UserPlus size={18} /> New Property
                                </button> */}

                                <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                                    onClick={() => {
                                        setNewPropertyModal(true);
                                        localStorage.setItem("newPropertyModal", "true");
                                    }}
                                >
                                    <UserPlus size={18} />

                                    <span className="d-none d-sm-inline">New Property</span>

                                    <span className="d-inline d-sm-none">+</span>
                                </button>
                                {/* New Property Modal */}
                                {newPropertyModal && (
                                    <div
                                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
                                            backdropFilter: 'blur(12px)',
                                            WebkitBackdropFilter: 'blur(12px)',
                                            zIndex: 2000,
                                            animation: 'fadeIn 0.3s ease-out'
                                        }}
                                    >
                                        <div
                                            className="bg-white border-0 shadow-lg"
                                            style={{
                                                width: '650px',
                                                maxWidth: '92%',
                                                borderRadius: '24px',
                                                maxHeight: '90vh',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                            }}
                                        >
                                            {/* Modal Header - Fixed */}
                                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-white" style={{ borderRadius: '24px 24px 0 0' }}>
                                                <div>
                                                    <h4 className="m-0 fw-black text-dark" style={{ letterSpacing: '-0.5px' }}>
                                                        Create Property
                                                    </h4>
                                                    <p className="text-muted small mb-0">Fill in the details to add a new Property.</p>
                                                </div>
                                                <button
                                                    className="btn btn-light rounded-circle p-2 border-0 shadow-none"
                                                    onClick={() => setNewPropertyModal(false)}
                                                    style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <span style={{ fontSize: '18px', lineHeight: '0' }}>&times;</span>
                                                </button>
                                            </div>

                                            {/* Scrollable Form Body */}
                                            <div className="p-4 overflow-auto" style={{ flex: 1 }}>

                                                {/* Section: Basic Details */}
                                                <div className="mb-4">
                                                    <h6 className="fw-bold mb-3 text-primary d-flex align-items-center">
                                                        <span className="me-2">📍</span> Basic Details
                                                    </h6>
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <label className="small fw-bold text-uppercase text-muted mb-2 d-block">Property Code</label>
                                                            <input type="text" className="form-control border-0 py-2 px-3 bg-light rounded-3 shadow-none" placeholder="PROP-001"
                                                                value={newProperty.propertyCode || ""}
                                                                onChange={(e) =>
                                                                    setNewProperty({ ...newProperty, propertyCode: e.target.value })
                                                                } />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="small fw-bold text-uppercase text-muted mb-2 d-block">Property Title</label>
                                                            <input type="text" className="form-control border-0 py-2 px-3 bg-light rounded-3 shadow-none" placeholder="Sunset Villa"
                                                                value={newProperty.propertyTitle || ""}
                                                                onChange={(e) =>
                                                                    setNewProperty({ ...newProperty, propertyTitle: e.target.value })
                                                                } />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="small fw-bold text-uppercase text-muted mb-2 d-block">Property Type</label>
                                                            <select className="form-select border-0 py-2 px-3 bg-light rounded-3 shadow-none"
                                                                value={newProperty.propertyType || ""}
                                                                onChange={(e) =>
                                                                    setNewProperty({ ...newProperty, propertyType: e.target.value })
                                                                }>
                                                                <option>Apartment</option>
                                                                <option>Villa</option>
                                                                <option>Commercial</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="small fw-bold text-uppercase text-muted mb-2 d-block">Purpose</label>
                                                            <select
                                                                className="form-select"
                                                                value={newProperty.purpose}
                                                                onChange={(e) =>
                                                                    setNewProperty({ ...newProperty, purpose: e.target.value })
                                                                }
                                                            >
                                                                <option>For Sale</option>
                                                                <option>For Rent</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="small fw-bold text-uppercase text-muted mb-2 d-block">Area / Locality</label>
                                                            <input type="text" className="form-control border-0 py-2 px-3 bg-light rounded-3 shadow-none" placeholder="Downtown District"
                                                                value={newProperty.areaLocality || ""}
                                                                onChange={(e) =>
                                                                    setNewProperty({ ...newProperty, areaLocality: e.target.value })
                                                                } />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="small fw-bold text-uppercase text-muted mb-2 d-block">House / Unit No. & Building Name</label>
                                                            <input type="text" className="form-control border-0 py-2 px-3 bg-light rounded-3 shadow-none" placeholder="Flat 402, Skyline Heights"
                                                                value={newProperty.houseUnitNo || ""}
                                                                onChange={(e) =>
                                                                    setNewProperty({ ...newProperty, houseUnitNo: e.target.value })
                                                                } />
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr className="my-4 opacity-25" />

                                                {/* Section: Size Details */}
                                                <div className="mb-2">
                                                    <h6 className="fw-bold mb-3 text-primary d-flex align-items-center">
                                                        <span className="me-2">📏</span> Size Details
                                                    </h6>
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <label className="small fw-bold text-uppercase text-muted mb-2 d-block">Carpet Area (sq ft)</label>
                                                            <input type="number" className="form-control border-0 py-2 px-3 bg-light rounded-3 shadow-none" placeholder="0.00"
                                                                value={newProperty.carpetArea || ""}
                                                                onChange={(e) =>
                                                                    setNewProperty({ ...newProperty, carpetArea: e.target.value })
                                                                } />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="small fw-bold text-uppercase text-muted mb-2 d-block">Built-up Area (sq ft)</label>
                                                            <input type="number" className="form-control border-0 py-2 px-3 bg-light rounded-3 shadow-none" placeholder="0.00"
                                                                value={newProperty.builtUpArea || ""}
                                                                onChange={(e) =>
                                                                    setNewProperty({ ...newProperty, builtUpArea: e.target.value })
                                                                } />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Modal Footer - Fixed */}
                                            <div className="p-4 border-top d-flex gap-3 bg-white" style={{ borderRadius: '0 0 24px 24px' }}>
                                                <button
                                                    className="btn btn-light border-0 py-3 flex-grow-1 rounded-4 fw-bold text-secondary shadow-none"
                                                    onClick={() => setNewPropertyModal(false)}
                                                >
                                                    Discard
                                                </button>
                                                <button
                                                    className="btn btn-dark py-3 flex-grow-1 rounded-4 fw-bold shadow-sm border-0"
                                                    style={{ background: 'linear-gradient(135deg, #111827 0%, #374151 100%)' }}
                                                    onClick={handleSaveProperty}
                                                >
                                                    Save Property
                                                </button>
                                            </div>

                                            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                .fw-black { font-weight: 900; }
                .form-control:focus, .form-select:focus {
                    background-color: #fff !important;
                    box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1) !important;
                    border: 1px solid #0d6efd !important;
                }
                /* Custom Scrollbar for the form */
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
            `}</style>
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
                                    <th className="ps-4 py-4 text-uppercase small fw-black text-muted tracking-wider">Property Details</th>
                                    <th className="py-4 text-uppercase small fw-black text-muted tracking-wider">Category & Purpose</th>
                                    <th className="py-4 text-uppercase small fw-black text-muted tracking-wider">Unit & Area</th>
                                    <th className="py-4 text-uppercase small fw-black text-muted tracking-wider">Created By</th>
                                    <th className="py-4 text-uppercase small fw-black text-muted tracking-wider">Status</th>
                                    <th className="pe-4 py-4 text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProperty.map((property) => (
                                    <tr key={property.id} className="property-row" style={{ borderBottom: '1px solid #f8f9fa' }}>
                                        {/* Column 1: Code & Title */}
                                        <td className="ps-4 py-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="avatar-gradient d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                                                    style={{
                                                        width: '44px', height: '44px', borderRadius: '12px',
                                                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                                        fontSize: '0.8rem'
                                                    }}>
                                                    {property.propertyCode || 'P'}
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark mb-0" style={{ fontSize: '0.95rem' }}>{property.propertyTitle}</div>
                                                    <div className="text-muted small" style={{ fontSize: '0.8rem' }}>ID: {property.propertyCode}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Column 2: Category & Purpose */}
                                        <td className="py-4">
                                            <div className="d-flex flex-column gap-1">
                                                <span className="text-dark fw-medium small">{property.category}</span>
                                                <span className="text-muted extra-small d-flex align-items-center gap-1">
                                                    <Tag size={12} /> {property.purpose}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Column 3: Unit & Carpet Area */}
                                        <td className="py-4">
                                            <div className="d-flex flex-column">
                                                <div className="text-dark small fw-medium">Unit: {property.unitNo || 'N/A'}</div>
                                                <div className="text-muted small">{property.carpetArea} sq.ft</div>
                                            </div>
                                        </td>

                                        {/* Column 4: Created By & Date */}
                                        <td className="py-4">
                                            <div className="d-flex flex-column">
                                                <div className="text-dark small fw-medium">{property.createdBy}</div>
                                                <div className="text-muted extra-small">{property.date}</div>
                                            </div>
                                        </td>

                                        {/* Column 5: Status */}
                                        <td className="py-4">
                                            <span className={`d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill small fw-bold ${property.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                <span style={{
                                                    width: '6px', height: '6px', borderRadius: '50%',
                                                    backgroundColor: property.status === 'Active' ? '#10b981' : '#ef4444'
                                                }}></span>
                                                {property.status}
                                            </span>
                                        </td>

                                        {/* Column 6: Actions */}
                                        <td className="pe-4 py-4 text-end">
                                            <button className="btn btn-icon-hover p-2 rounded-3 border-0 bg-transparent">
                                                <MoreVertical size={20} className="text-muted" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <style>{`
    .extra-small { font-size: 0.75rem; }
    .property-row:hover { background-color: #fcfcfd; transition: all 0.2s ease; }
    .fw-black { font-weight: 800; }
    .btn-icon-hover:hover { background-color: #f1f5f9 !important; color: #6366f1 !important; }
`}</style>
                </div>
            </div>

            <style>{`
                .fw-black { font-weight: 900; }
                .tracking-wider { letter-spacing: 0.05em; }
                .extra-small { font-size: 0.8rem; }
                .property-row:hover { 
                    background-color: #fcfdfe !important; 
                    transform: scale(1.002);
                    transition: all 0.2s ease;
                }
                .btn-icon-hover:hover {
                    background-color: #f1f3f5 !important;
                    color: #000 !important;
                }
            `}</style>
        </div >
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

export default Property;