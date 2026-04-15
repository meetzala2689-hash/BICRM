import React, { useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Users, CheckCircle, Clock, Mail, Phone, Globe } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FollowUp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterExpanded, setFilterExpanded] = useState(false);
    const [newFollowUpModal, setNewFollowUpModal] = useState(false);
    // <-- FIX
    const [followUps, setFollowUps] = useState(() => {
        const saved = localStorage.getItem("followUps");
        return saved ? JSON.parse(saved) : [];
    });
    const [newFollowUp, setNewFollowUp] = useState({
        name: "",
        email: "",
        phone: "",
        location: "India",
        category: "General",
        status: "Active"
    });


    const filteredFollowUp = followUps.filter(followUp =>
        (followUp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            followUp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            followUp.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === '' || followUp.status === statusFilter)
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

    const totalFollowUps = followUps.length;

    const activeFollowUps = followUps.filter(
        (f) => f.status?.toLowerCase() === "active"
    ).length;

    const pendingFollowUps = followUps.filter(
        (f) => f.status?.toLowerCase() === "pending"
    ).length;
    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* TOP SECTION */}
                <div className="d-flex flex-column flex-md-row justify-content-between mb-5 gap-4">
                    <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-bold">CRM Dashboard</span>
                        <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Follow Up</h1>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mb-4">
                    <StatCard icon={<Users size={22} />} label="Total Follow Up" value={totalFollowUps} color="#6366f1" />
                    <StatCard icon={<CheckCircle size={22} />} label="Active Now" value={activeFollowUps} color="#10b981" />
                    <StatCard icon={<Clock size={22} />} label="Pending" value={pendingFollowUps} color="#f59e0b" />
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
                                                            <h5 className="m-0 fw-bold">Filter Follow Up</h5>
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
                                                                onClick={() => {
                                                                    setFilterExpanded(false);
                                                                    setFilterVisible(false);
                                                                }}
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
                                    onClick={() => setNewFollowUpModal(true)} // open modal
                                >
                                    <UserPlus size={18} /> New Follow Up
                                </button> */}

                                <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm"
                                    onClick={() => {
                                        setNewFollowUpModal(true);
                                        localStorage.setItem("newFollowUpModal", "true");
                                    }}
                                >
                                    <UserPlus size={18} />

                                    <span className="d-none d-sm-inline">New Contact</span>

                                    <span className="d-inline d-sm-none">+</span>
                                </button>
                                {/* New Follow Up Modal */}
                                {newFollowUpModal && (
                                    <div
                                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                                            backdropFilter: 'blur(12px)', // Stronger blur for glass effect
                                            WebkitBackdropFilter: 'blur(12px)',
                                            zIndex: 2000,
                                            animation: 'fadeIn 0.3s ease-out'
                                        }}
                                    >
                                        <div
                                            className="bg-white border-0 shadow-lg"
                                            style={{
                                                width: '450px',
                                                maxWidth: '92%',
                                                borderRadius: '24px', // Modern deep curves
                                                padding: '2.5rem',
                                                transform: 'translateY(0)',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                                            }}
                                        >
                                            {/* Modal Header */}
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <h4 className="m-0 fw-black text-dark" style={{ letterSpacing: '-0.5px' }}>
                                                        Create Follow Up
                                                    </h4>
                                                    <p className="text-muted small mb-0">Fill in the details to add a new Follow Up.</p>
                                                </div>
                                                <button
                                                    className="btn btn-light rounded-circle p-2 border-0 shadow-none"
                                                    onClick={() => setNewFollowUpModal(false)}
                                                    style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <span style={{ fontSize: '18px', lineHeight: '0' }}>&times;</span>
                                                </button>
                                            </div>

                                            {/* Form Fields */}
                                            <div className="mb-4">
                                                <div className="mb-3">
                                                    <label className="small fw-bold text-uppercase text-muted mb-2 d-block" style={{ letterSpacing: '0.05em' }}>Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 py-3 px-4 bg-light rounded-4 shadow-none"
                                                        placeholder="e.g. Alex Rivera"
                                                        style={{ fontSize: '0.95rem' }}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="small fw-bold text-uppercase text-muted mb-2 d-block" style={{ letterSpacing: '0.05em' }}>Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="form-control border-0 py-3 px-4 bg-light rounded-4 shadow-none"
                                                        placeholder="alex@example.com"
                                                        style={{ fontSize: '0.95rem' }}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="small fw-bold text-uppercase text-muted mb-2 d-block" style={{ letterSpacing: '0.05em' }}>Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 py-3 px-4 bg-light rounded-4 shadow-none"
                                                        placeholder="+1 (555) 000-0000"
                                                        style={{ fontSize: '0.95rem' }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Modal Footer Buttons */}
                                            <div className="d-flex gap-3 pt-2">
                                                <button
                                                    className="btn btn-light border-0 py-3 flex-grow-1 rounded-4 fw-bold text-secondary"
                                                    onClick={() => setNewFollowUpModal(false)}
                                                >
                                                    Discard
                                                </button>
                                                <button
                                                    className="btn btn-dark py-3 flex-grow-1 rounded-4 fw-bold shadow-sm"
                                                    style={{ background: 'linear-gradient(135deg, #111827 0%, #374151 100%)' }}
                                                >
                                                    Save Follow Up
                                                </button>
                                            </div>
                                        </div>

                                        {/* Animation CSS */}
                                        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .fw-black { font-weight: 900; }
            .form-control:focus {
                background-color: #fff !important;
                box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1) !important;
                border: 1px solid #0d6efd !important;
            }
        `}</style>
                                    </div>
                                )}
                                {/* New Follow Up Modal */}
                                {newFollowUpModal && (
                                    <div
                                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                                            backdropFilter: 'blur(12px)', // Stronger blur for glass effect
                                            WebkitBackdropFilter: 'blur(12px)',
                                            zIndex: 2000,
                                            animation: 'fadeIn 0.3s ease-out'
                                        }}
                                    >
                                        <div
                                            className="bg-white border-0 shadow-lg"
                                            style={{
                                                width: '450px',
                                                maxWidth: '92%',
                                                borderRadius: '24px', // Modern deep curves
                                                padding: '2.5rem',
                                                transform: 'translateY(0)',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                                            }}
                                        >
                                            {/* Modal Header */}
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <h4 className="m-0 fw-black text-dark" style={{ letterSpacing: '-0.5px' }}>
                                                        Create Follow Up
                                                    </h4>
                                                    <p className="text-muted small mb-0">Fill in the details to add a new Follow Up.</p>
                                                </div>
                                                <button
                                                    className="btn btn-light rounded-circle p-2 border-0 shadow-none"
                                                    onClick={() => setNewFollowUpModal(false)}
                                                    style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <span style={{ fontSize: '18px', lineHeight: '0' }}>&times;</span>
                                                </button>
                                            </div>

                                            {/* Form Fields */}
                                            <div className="mb-4">
                                                <div className="mb-3">
                                                    <label className="small fw-bold text-uppercase text-muted mb-2 d-block" style={{ letterSpacing: '0.05em' }}>Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 py-3 px-4 bg-light rounded-4 shadow-none"
                                                        placeholder="e.g. Alex Rivera"
                                                        value={newFollowUp.name}
                                                        onChange={(e) => setNewFollowUp({ ...newFollowUp, name: e.target.value })}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="small fw-bold text-uppercase text-muted mb-2 d-block" style={{ letterSpacing: '0.05em' }}>Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="form-control border-0 py-3 px-4 bg-light rounded-4 shadow-none"
                                                        placeholder="alex@example.com"
                                                        value={newFollowUp.email}
                                                        onChange={(e) => setNewFollowUp({ ...newFollowUp, email: e.target.value })}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="small fw-bold text-uppercase text-muted mb-2 d-block" style={{ letterSpacing: '0.05em' }}>Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 py-3 px-4 bg-light rounded-4 shadow-none"
                                                        placeholder="+1 (555) 000-0000"
                                                        value={newFollowUp.phone}
                                                        onChange={(e) => setNewFollowUp({ ...newFollowUp, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Modal Footer Buttons */}
                                            <div className="d-flex gap-3 pt-2">
                                                <button
                                                    className="btn btn-light border-0 py-3 flex-grow-1 rounded-4 fw-bold text-secondary"
                                                    onClick={() => setNewFollowUpModal(false)}
                                                >
                                                    Discard
                                                </button>
                                                <button
                                                    className="btn btn-dark py-3 flex-grow-1 rounded-4 fw-bold shadow-sm"
                                                    style={{ background: 'linear-gradient(135deg, #111827 0%, #374151 100%)' }}
                                                    onClick={() => {
                                                        if (!newFollowUp.name || !newFollowUp.email) return;

                                                        const updatedFollowUps = [
                                                            ...followUps,
                                                            { ...newFollowUp, id: Date.now() }
                                                        ];

                                                        setFollowUps(updatedFollowUps);
                                                        localStorage.setItem("followUps", JSON.stringify(updatedFollowUps));

                                                        // reset form
                                                        setNewFollowUp({
                                                            name: "",
                                                            email: "",
                                                            phone: "",
                                                            location: "India",
                                                            category: "General",
                                                            status: "Active"
                                                        });

                                                        setNewFollowUpModal(false);
                                                    }}
                                                >
                                                    Save Follow Up
                                                </button>
                                            </div>
                                        </div>

                                        {/* Animation CSS */}
                                        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .fw-black { font-weight: 900; }
            .form-control:focus {
                background-color: #fff !important;
                box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1) !important;
                border: 1px solid #0d6efd !important;
            }
        `}</style>
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
                                    <th className="ps-4 py-4 text-uppercase small fw-black text-muted tracking-wider">User Profile</th>
                                    <th className="py-4 text-uppercase small fw-black text-muted tracking-wider">Communication</th>
                                    <th className="py-4 text-uppercase small fw-black text-muted tracking-wider">Tier</th>
                                    <th className="py-4 text-uppercase small fw-black text-muted tracking-wider">Status</th>
                                    <th className="pe-4 py-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFollowUp.map((followUp) => (
                                    <tr key={followUp.id} className="deal-row" style={{ borderBottom: '1px solid #f8f9fa' }}>
                                        <td className="ps-4 py-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="avatar-gradient d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                                                    style={{
                                                        width: '48px', height: '48px', borderRadius: '16px',
                                                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
                                                    }}>
                                                    {followUp.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark mb-0" style={{ fontSize: '1rem' }}>{followUp.name}</div>
                                                    <div className="text-muted small d-flex align-items-center gap-1">
                                                        <Globe size={12} /> {followUp.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="d-flex flex-column gap-1">
                                                <div className="text-dark small fw-medium"><Mail size={14} className="me-2 text-muted" />{followUp.email}</div>
                                                <div className="text-muted extra-small"><Phone size={14} className="me-2 text-muted" />{followUp.phone}</div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-pill small fw-bold ${followUp.category === 'Enterprise' ? 'bg-primary-subtle text-primary' : 'bg-light text-dark'}`}>
                                                {followUp.category}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill small fw-bold ${followUp.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                <span className="dot" style={{
                                                    width: '6px', height: '6px', borderRadius: '50%',
                                                    backgroundColor: followUp.status === 'Active' ? '#10b981' : '#ef4444'
                                                }}></span>
                                                {followUp.status}
                                            </span>
                                        </td>
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

export default FollowUp;