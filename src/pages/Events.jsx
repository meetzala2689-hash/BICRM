import React, { useEffect, useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Users, CheckCircle, Clock, Mail, Phone, Globe } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Events() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [filterVisible, setFilterVisible] = useState(() => {
        return JSON.parse(localStorage.getItem("filterVisible")) || false;
    });

    const [filterExpanded, setFilterExpanded] = useState(() => {
        return JSON.parse(localStorage.getItem("filterExpanded")) || false;
    });

    const [newEventsModal, setNewEventsModal] = useState(() => {
        return localStorage.getItem("newEventModal") === "true";
    });

    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem("events");
        return saved ? JSON.parse(saved) : [];
    });
    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem("eventFilters");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("filterVisible", JSON.stringify(filterVisible));
        localStorage.setItem("filterExpanded", JSON.stringify(filterExpanded));
        localStorage.setItem("eventFilters", JSON.stringify(filters));
    }, [filterVisible, filterExpanded, filters]);

    const [newEvents, setNewEvents] = useState(() => {
        const draft = localStorage.getItem("newEventDraft");
        return draft
            ? JSON.parse(draft)
            : {
                subject: "",
                referenceTo: "",
                eventType: "Meeting",
                start: "",
                end: "",
                location: "",
                reminder: "15 min before",
                visibility: "Public",
                description: ""
            };
    });

    useEffect(() => {
        localStorage.setItem("newEventDraft", JSON.stringify(newEvents));
    }, [newEvents]);

    useEffect(() => {
        localStorage.setItem("newEventModal", newEventsModal);
    }, [newEventsModal]);

    const filteredEvents = events.filter(event => {

        // search
        const matchesSearch =
            (event.subject || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (event.referenceTo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (event.eventType || "").toLowerCase().includes(searchTerm.toLowerCase());

        // dynamic filters
        const matchesFilters = filters.every(f => {
            const fieldValue = (event[f.field] || "").toString().toLowerCase();
            const filterValue = f.value.toLowerCase();

            if (f.operator === "equals") {
                return fieldValue === filterValue;
            } else if (f.operator === "contains") {
                return fieldValue.includes(filterValue);
            }
            return true;
        });

        return matchesSearch && matchesFilters;
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
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-end mb-5 gap-4">
                    <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-bold">CRM Dashboard</span>
                        <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Events</h1>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mb-4">
                    <StatCard icon={<Users size={22} />} label="Total Events" value="1,284" color="#6366f1" />
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

                            <div className="col-md-5 d-flex gap-2 justify-content-md-end">
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
                                        <div className="position-absolute end-0 mt-1 p-3 bg-white shadow rounded-4" style={{ zIndex: 10, minWidth: '220px' }}>
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
                                                            setFilters([]);
                                                            setFilterVisible(false);
                                                            setFilterExpanded(false);

                                                            localStorage.removeItem("eventFilters");
                                                            localStorage.removeItem("filterVisible");
                                                            localStorage.removeItem("filterExpanded");
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
                                                        backgroundColor: 'rgba(15, 23, 42, 0.4)', // Deeper, modern slate overlay
                                                        backdropFilter: 'blur(8px)',
                                                        zIndex: 1050,
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <div
                                                        className="bg-white border-0 shadow-lg"
                                                        style={{
                                                            width: '750px',
                                                            maxWidth: '95%',
                                                            borderRadius: '24px',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {/* Header */}
                                                        <div className="px-4 py-3 d-flex justify-content-between align-items-center border-bottom bg-light">
                                                            <div>
                                                                <h5 className="m-0 fw-bold" style={{ color: '#1e293b', letterSpacing: '-0.5px' }}>
                                                                    <i className="bi bi-sliders2-vertical me-2 text-primary"></i>
                                                                    Advanced Filters
                                                                </h5>
                                                                <small className="text-muted">Narrow down your event list</small>
                                                            </div>
                                                            <button
                                                                className="btn-close shadow-none"
                                                                onClick={() => {
                                                                    setStatusFilter('');
                                                                    setFilterExpanded(false);
                                                                    setFilterVisible(false);
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="p-4">
                                                            {/* Main Selector */}
                                                            <div className="mb-4">
                                                                <label className="form-label fw-semibold mb-2" style={{ color: '#64748b' }}>
                                                                    Add a filter criteria
                                                                </label>
                                                                <div className="input-group shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                                                    <span className="input-group-text bg-white border-end-0">
                                                                        <i className="bi bi-plus-lg text-primary"></i>
                                                                    </span>
                                                                    <select
                                                                        className="form-select border-start-0 py-2 shadow-none"
                                                                        style={{ cursor: 'pointer' }}
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
                                                                        <option value="">Select a field to filter by...</option>
                                                                        <option value="Customer">Customer</option>
                                                                        <option value="Phone Call">Phone Call</option>
                                                                        <option value="Company">Company</option>
                                                                        <option value="Email">Email</option>
                                                                        <option value="State">State</option>
                                                                        <option value="Country">Country</option>
                                                                        <option value="Status">Status</option>
                                                                        <option value="Amount">Amount</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            {/* Dynamic Filter Rows */}
                                                            <div className="overflow-auto mb-4" style={{ maxHeight: '350px', paddingRight: '5px' }}>
                                                                {filters.length === 0 ? (
                                                                    <div className="text-center py-4 border border-dashed rounded-4 bg-light">
                                                                        <p className="text-muted mb-0 small">No active filters. Select a field above to start.</p>
                                                                    </div>
                                                                ) : (
                                                                    filters.map((filter, idx) => (
                                                                        <div
                                                                            key={idx}
                                                                            className="d-flex gap-3 mb-3 p-3 align-items-center bg-light border-0 animate-in"
                                                                            style={{ borderRadius: '16px', border: '1px solid #f1f5f9' }}
                                                                        >
                                                                            <div className="fw-bold text-primary flex-grow-1" style={{ width: '120px', fontSize: '0.9rem' }}>
                                                                                {filter.field}
                                                                            </div>

                                                                            <select
                                                                                className="form-select form-select-sm border-0 shadow-sm"
                                                                                style={{ width: '130px', borderRadius: '8px' }}
                                                                                value={filter.operator}
                                                                                onChange={(e) => {
                                                                                    const newFilters = [...filters];
                                                                                    newFilters[idx].operator = e.target.value;
                                                                                    setFilters(newFilters);
                                                                                }}
                                                                            >
                                                                                <option value="equals">Equal to</option>
                                                                                <option value="contains">Contains</option>
                                                                            </select>

                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-sm border-0 shadow-sm flex-grow-1"
                                                                                style={{ borderRadius: '8px' }}
                                                                                placeholder="Value..."
                                                                                value={filter.value}
                                                                                onChange={(e) => {
                                                                                    const newFilters = [...filters];
                                                                                    newFilters[idx].value = e.target.value;
                                                                                    setFilters(newFilters);
                                                                                }}
                                                                            />

                                                                            <button
                                                                                className="btn btn-sm btn-link text-danger p-0"
                                                                                onClick={() => setFilters(filters.filter((_, i) => i !== idx))}
                                                                            >
                                                                                <i className="bi bi-trash3-fill fs-5"></i>
                                                                            </button>
                                                                        </div>
                                                                    ))
                                                                )}
                                                            </div>

                                                            {/* Footer Actions */}
                                                            <div className="d-flex justify-content-between align-items-center mt-2 pt-3 border-top">
                                                                <button
                                                                    className="btn btn-link text-muted text-decoration-none fw-semibold p-0"
                                                                    onClick={() => {
                                                                        setStatusFilter('');
                                                                        setFilters([]);
                                                                        setFilterExpanded(false);
                                                                        setFilterVisible(false);
                                                                    }}
                                                                >
                                                                    Clear All
                                                                </button>

                                                                <div className="d-flex gap-2">
                                                                    <button
                                                                        className="btn px-4 py-2"
                                                                        style={{ background: '#f1f5f9', color: '#475569', borderRadius: '12px', fontWeight: '600' }}
                                                                        onClick={() => setFilterExpanded(false) || setFilterVisible(false)}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-primary px-4 py-2 shadow-sm"
                                                                        style={{ borderRadius: '12px', fontWeight: '600' }}
                                                                        onClick={() => setFilterExpanded(false) || setFilterVisible(false)}
                                                                    >
                                                                        Apply Changes
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
                                <button
                                    className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex align-items-center gap-2 shadow-sm"
                                    onClick={() => setNewEventsModal(true)} // open modal
                                >
                                    <UserPlus size={18} /> New Events
                                </button>
                                {/* New Events Modal */}
                                {newEventsModal && (
                                    <div
                                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                        style={{
                                            background: 'rgba(0,0,0,0.4)',
                                            backdropFilter: 'blur(12px)',
                                            WebkitBackdropFilter: 'blur(12px)',
                                            zIndex: 2000,
                                            animation: 'fadeIn 0.3s ease-out'
                                        }}
                                    >
                                        <div
                                            className="bg-white border-0 shadow-lg"
                                            style={{
                                                width: '100%',
                                                maxWidth: '100%',
                                                // borderRadius: '24px',
                                                padding: '2rem',
                                                maxHeight: '100%',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            {/* Modal Header */}
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <h4 className="m-0 fw-black text-dark" style={{ letterSpacing: '-0.5px' }}>
                                                        Create Event
                                                    </h4>
                                                    <p className="text-muted small mb-0">Organize your schedule and set reminders.</p>
                                                </div>
                                                <button
                                                    className="btn btn-light rounded-circle p-2 border-0 shadow-none"
                                                    onClick={() => setNewEventsModal(false)}
                                                    style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <span style={{ fontSize: '18px', lineHeight: '0' }}>&times;</span>
                                                </button>
                                            </div>

                                            {/* Scrollable Form Body */}
                                            <div style={{ overflowY: 'auto', paddingRight: '10px' }} className="custom-scrollbar">

                                                {/* Section: Event Information */}
                                                <h6 className="fw-bold text-primary mb-3 small text-uppercase">Event Information</h6>
                                                <div className="mb-3">
                                                    <label className="small fw-bold text-muted mb-1 d-block">Subject</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 py-2 px-3 bg-light rounded-3 shadow-none"
                                                        placeholder="e.g. Project Kickoff"
                                                        value={newEvents.subject || ''}
                                                        onChange={(e) => setNewEvents({ ...newEvents, subject: e.target.value })}
                                                    />
                                                </div>

                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1 d-block">Event Type</label>
                                                        <select
                                                            className="form-select border-0 py-2 bg-light rounded-3 shadow-none"
                                                            value={newEvents.eventType || 'Meeting'}
                                                            onChange={(e) => setNewEvents({ ...newEvents, eventType: e.target.value })}
                                                        >
                                                            <option value="Meeting">Meeting</option>
                                                            <option value="Call">Call</option>
                                                            <option value="Deadline">Deadline</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1 d-block">Reference To</label>
                                                        <input
                                                            type="text"
                                                            className="form-control border-0 py-2 bg-light rounded-3 shadow-none"
                                                            placeholder="Client/Project"
                                                            value={newEvents.referenceTo || ''}
                                                            onChange={(e) => setNewEvents({ ...newEvents, referenceTo: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Section: Timing & Location */}
                                                <h6 className="fw-bold text-primary mt-4 mb-3 small text-uppercase">Timing & Location</h6>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1 d-block">Start Date & Time</label>
                                                        <input
                                                            type="datetime-local"
                                                            className="form-control border-0 py-2 bg-light rounded-3 shadow-none"
                                                            value={newEvents.start || ''}
                                                            onChange={(e) => setNewEvents({ ...newEvents, start: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1 d-block">End Date & Time</label>
                                                        <input
                                                            type="datetime-local"
                                                            className="form-control border-0 py-2 bg-light rounded-3 shadow-none"
                                                            value={newEvents.end || ''}
                                                            onChange={(e) => setNewEvents({ ...newEvents, end: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="small fw-bold text-muted mb-1 d-block">Location / Meeting Link</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 py-2 bg-light rounded-3 shadow-none"
                                                        placeholder="Office or URL"
                                                        value={newEvents.location || ''}
                                                        onChange={(e) => setNewEvents({ ...newEvents, location: e.target.value })}
                                                    />
                                                </div>

                                                {/* Section: Details */}
                                                <h6 className="fw-bold text-primary mt-4 mb-3 small text-uppercase">Details & Reminders</h6>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1 d-block">Reminder</label>
                                                        <select
                                                            className="form-select border-0 py-2 bg-light rounded-3 shadow-none"
                                                            value={newEvents.reminder || '15 min before'}
                                                            onChange={(e) => setNewEvents({ ...newEvents, reminder: e.target.value })}
                                                        >
                                                            <option value="None">None</option>
                                                            <option value="15 min before">15 min before</option>
                                                            <option value="1 hour before">1 hour before</option>
                                                            <option value="1 day before">1 day before</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="small fw-bold text-muted mb-1 d-block">Visibility</label>
                                                        <select
                                                            className="form-select border-0 py-2 bg-light rounded-3 shadow-none"
                                                            value={newEvents.visibility || 'Public'}
                                                            onChange={(e) => setNewEvents({ ...newEvents, visibility: e.target.value })}
                                                        >
                                                            <option value="Public">Public</option>
                                                            <option value="Private">Private</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="small fw-bold text-muted mb-1 d-block">Description / Agenda</label>
                                                    <textarea
                                                        className="form-control border-0 py-2 bg-light rounded-3 shadow-none"
                                                        rows="3"
                                                        placeholder="Add notes..."
                                                        value={newEvents.description || ''}
                                                        onChange={(e) => setNewEvents({ ...newEvents, description: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Modal Footer */}
                                            <div className="p-4 border-top d-flex gap-3 justify-content-end">
                                                <button
                                                    className="btn btn-light px-5"
                                                    onClick={() => setNewEventsModal(false)}
                                                >
                                                    Discard
                                                </button>
                                                <button
                                                    className="btn btn-dark px-5"
                                                    style={{ background: 'linear-gradient(135deg, #111827 0%, #374151 100%)' }}
                                                    onClick={() => {
                                                        if (!newEvents.subject || !newEvents.start) return;

                                                        const newEventFormatted = {
                                                            id: Date.now(),
                                                            subject: newEvents.subject,
                                                            referenceTo: newEvents.referenceTo,
                                                            eventType: newEvents.eventType,
                                                            start: newEvents.start,
                                                            end: newEvents.end,
                                                            location: newEvents.location,
                                                            status: "Active",
                                                            host: "Admin"
                                                        };

                                                        const updatedEvents = [...events, newEventFormatted];

                                                        setEvents(updatedEvents);
                                                        localStorage.setItem("events", JSON.stringify(updatedEvents));
                                                        localStorage.removeItem("newEventDraft");
                                                        // reset form
                                                        setNewEvents({
                                                            subject: "",
                                                            referenceTo: "",
                                                            eventType: "Meeting",
                                                            start: "",
                                                            end: "",
                                                            location: "",
                                                            reminder: "15 min before",
                                                            visibility: "Public",
                                                            description: ""
                                                        });

                                                        setNewEventsModal(false);
                                                    }}
                                                >
                                                    Save Event
                                                </button>
                                            </div>
                                        </div>

                                        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .fw-black { font-weight: 900; }
            .form-control:focus, .form-select:focus {
                background-color: #fff !important;
                box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1) !important;
                border: 1px solid #0d6efd !important;
            }
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #ccc;
                border-radius: 10px;
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
                                    <th className="ps-4 py-4 small fw-black text-muted">Event ID</th>
                                    <th className="py-4 small fw-black text-muted">Subject</th>
                                    <th className="py-4 small fw-black text-muted">Reference</th>
                                    <th className="py-4 small fw-black text-muted">Type</th>
                                    <th className="py-4 small fw-black text-muted">Start Time</th>
                                    <th className="py-4 small fw-black text-muted">Status</th>
                                    <th className="py-4 small fw-black text-muted">Host</th>
                                    <th className="pe-4 py-4 text-end"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEvents.map((event) => (
                                    <tr key={event.id} style={{ borderBottom: '1px solid #f8f9fa' }}>

                                        {/* Event ID */}
                                        <td className="ps-4 py-4">
                                            #{event.id}
                                        </td>

                                        {/* Subject */}
                                        <td className="py-4 fw-bold">
                                            {event.subject}
                                        </td>

                                        {/* Reference */}
                                        <td className="py-4">
                                            {event.referenceTo || "-"}
                                        </td>

                                        {/* Type */}
                                        <td className="py-4">
                                            <span className="badge bg-light text-dark">
                                                {event.eventType}
                                            </span>
                                        </td>

                                        {/* Start Time */}
                                        <td className="py-4">
                                            {event.start
                                                ? new Date(event.start).toLocaleString()
                                                : "-"
                                            }
                                        </td>

                                        {/* Status */}
                                        <td className="py-4">
                                            <span className="badge bg-success">
                                                {event.status || "Active"}
                                            </span>
                                        </td>

                                        {/* Host */}
                                        <td className="py-4">
                                            {event.host || "Admin"}
                                        </td>

                                        {/* Actions */}
                                        <td className="pe-4 py-4 text-end">
                                            <button className="btn btn-sm btn-light">
                                                <MoreVertical size={18} />
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

export default Events;