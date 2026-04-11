import React, { useEffect, useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Users, CheckCircle, Clock, Mail, Phone, Globe } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { putData, getAllData } from '../utils/indexedDB';

const Contacts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [filterVisible, setFilterVisible] = useState(() => {
        return localStorage.getItem("filterVisible") === "true";
    });

    const [filterExpanded, setFilterExpanded] = useState(() => {
        return localStorage.getItem("filterExpanded") === "true";
    });

    const [newContactModal, setNewContactModal] = useState(() => {
        return localStorage.getItem("newContactModal") === "true";
    });

    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem("dealFilters");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("filterVisible", JSON.stringify(filterVisible));
        localStorage.setItem("filterExpanded", JSON.stringify(filterExpanded));
        localStorage.setItem("dealFilters", JSON.stringify(filters));
    }, [filterVisible, filterExpanded, filters]);

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContactsFromDB = async () => {
            try {
                const storedContacts = await getAllData("contacts");
                if (storedContacts && storedContacts.length > 0) {
                    setContacts(storedContacts);
                } else {
                    // Fallback to check localStorage for migration
                    const saved = localStorage.getItem("contacts");
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        setContacts(parsed);
                        parsed.forEach(contact => putData("contacts", contact));
                    }
                }
            } catch (error) {
                console.error("Error loading contacts from DB:", error);
            }
        };
        fetchContactsFromDB();
    }, []);

    const [newContact, setNewContact] = useState(() => {
        const saved = localStorage.getItem("newContactData");
        return saved
            ? JSON.parse(saved)
            : {
                Salutation: "Mr.",
                name: "",
                Occupation: "",
                email: "",
                phone: "",
                Type: "",
                Source: "",
                status: "",
                Created: "",
                location: "",
            };
    });

    useEffect(() => {
        localStorage.setItem("newContactData", JSON.stringify(newContact));
    }, [newContact]);

    const filteredContacts = contacts.filter(contact =>
        ((contact.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (contact.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (contact.status || "").toLowerCase().includes(searchTerm.toLowerCase()))
        && (statusFilter === '' || contact.status === statusFilter)
    );

    const [moreVerticalClicked, setMoreVerticalClicked] = useState(false);

    const StatCard = ({ icon, label, value, color }) => (
        <div className="d-flex align-items-center gap-3 px-4 py-3 rounded-4 transition-all" style={{ background: 'white', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)', flex: '1', minWidth: '200px', borderLeft: `5px solid ${color}` }}>
            <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '45px', height: '45px', backgroundColor: `${color}15`, color: color }}>
                {icon}
            </div>
            <div>
                <p className="text-muted fw-bold mb-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</p>
                <h4 className="fw-black m-0" style={{ color: '#1f2937', fontSize: '1.4rem' }}>{value}</h4>
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
                        <h1 className="fw-black m-0" style={{ color: '#111827', fontSize: '2.5rem', letterSpacing: '-1px' }}>Contacts</h1>
                    </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mb-4">
                    <StatCard icon={<Users size={22} />} label="Total Contacts" value="1,284" color="#6366f1" className />
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
                                    <input type="text" className="form-control ps-5 py-3 border-0 bg-light rounded-4 shadow-none" placeholder="Search by name, email, or status..." style={{ fontSize: '0.95rem' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-5 d-flex gap-2 justify-content-md-end">
                                <div className="position-relative">
                                    <button className="btn btn-light border-0 py-3 px-4 rounded-4 fw-bold text-secondary d-flex align-items-center gap-2" onClick={() => { if (!filterVisible) { setFilterVisible(true); setFilterExpanded(false); } else { setFilterExpanded(!filterExpanded); } }}>
                                        <Filter size={18} /> Filter
                                    </button>
                                    {filterVisible && (
                                        <div className="position-absolute end-0 mt-1 p-3 bg-white shadow rounded-4" style={{ zIndex: 10, minWidth: '220px' }}>
                                            {!filterExpanded && (
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="fw-bold" style={{ cursor: 'pointer' }} onClick={() => setFilterExpanded(true)}> Filter </span>
                                                    <div>||</div>
                                                    <button className="btn border-0 fw-bold" onClick={() => { setStatusFilter(''); setFilterVisible(false); setFilterExpanded(false); }}> Clear </button>
                                                </div>
                                            )}
                                            {filterExpanded && (
                                                <div
                                                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                                    style={{
                                                        backgroundColor: 'rgba(15, 23, 42, 0.4)', // Sophisticated slate overlay
                                                        backdropFilter: 'blur(8px)', // Deep blur for focus
                                                        zIndex: 1050,
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <div
                                                        className="bg-white shadow-lg border-0"
                                                        style={{
                                                            width: '500px', // Slightly slimmer for a focused "Status" filter
                                                            maxWidth: '95%',
                                                            borderRadius: '24px',
                                                            overflow: 'hidden',
                                                            animation: 'fadeInUp 0.2s ease-out'
                                                        }}
                                                    >
                                                        {/* Header */}
                                                        <div className="px-4 py-3 d-flex justify-content-between align-items-center border-bottom bg-light/50">
                                                            <div>
                                                                <h5 className="m-0 fw-bold" style={{ color: '#1e293b', letterSpacing: '-0.5px' }}>
                                                                    Filter Contacts
                                                                </h5>
                                                                <p className="text-muted small mb-0">Refine your contact list view</p>
                                                            </div>
                                                            <button
                                                                className="btn-close shadow-none"
                                                                style={{ fontSize: '0.8rem' }}
                                                                onClick={() => {
                                                                    setStatusFilter('');
                                                                    setFilterExpanded(false);
                                                                    setFilterVisible(false);
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="p-4">
                                                            {/* Status Filter Section */}
                                                            <div className="mb-4">
                                                                <label className="form-label small fw-bold text-uppercase text-muted mb-2" style={{ letterSpacing: '0.5px' }}>
                                                                    Current Status
                                                                </label>
                                                                <div className="position-relative">
                                                                    <select
                                                                        className="form-select border-0 shadow-sm py-2 px-3"
                                                                        style={{
                                                                            backgroundColor: '#f8fafc',
                                                                            borderRadius: '12px',
                                                                            fontSize: '0.95rem',
                                                                            fontWeight: '500',
                                                                            color: '#334155'
                                                                        }}
                                                                        value={statusFilter}
                                                                        onChange={(e) => setStatusFilter(e.target.value)}
                                                                    >
                                                                        <option value="">All Contacts</option>
                                                                        <option value="Active">Active</option>
                                                                        <option value="Inactive">Inactive</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            {/* Footer Actions */}
                                                            <div className="d-flex justify-content-between align-items-center mt-2 pt-3 border-top">
                                                                <button
                                                                    className="btn btn-link text-muted text-decoration-none fw-semibold p-0 shadow-none"
                                                                    style={{ fontSize: '0.9rem' }}
                                                                    onClick={() => {
                                                                        setStatusFilter('');
                                                                        setFilterExpanded(false);
                                                                        setFilterVisible(false);
                                                                    }}
                                                                >
                                                                    Clear Filter
                                                                </button>

                                                                <div className="d-flex gap-2">
                                                                    <button
                                                                        className="btn px-4 border-0 text-secondary fw-bold"
                                                                        style={{ background: '#f1f5f9', borderRadius: '12px', fontSize: '0.9rem' }}
                                                                        onClick={() => setFilterExpanded(false) || setFilterVisible(false)}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-primary px-4 fw-bold shadow-sm"
                                                                        style={{ borderRadius: '12px', fontSize: '0.9rem' }}
                                                                        onClick={() => setFilterExpanded(false) || setFilterVisible(false)}
                                                                    >
                                                                        Apply View
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
                                <button className="btn btn-dark py-3 px-4 rounded-4 fw-bold d-flex align-items-center gap-2 shadow-sm" onClick={() => {
                                    setNewContactModal(true);
                                    localStorage.setItem("newContactModal", "true");
                                }}>
                                    <UserPlus size={18} /> New Contact
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* New Contact Modal */}
                    {newContactModal && (
                        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', zIndex: 2000, animation: 'fadeIn 0.3s ease-out' }}>
                            <div className="bg-white border-0 shadow-lg" style={{ width: '100%', maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.18)' }}>
                                {/* Header */}
                                <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="m-0 fw-black text-dark" style={{ letterSpacing: '-0.5px' }}>Add Detailed Contact</h4>
                                        <p className="text-muted small mb-0">Create a comprehensive profile for your CRM</p>
                                    </div>
                                    <button className="btn btn-light rounded-circle p-0 border-0" onClick={() => {
                                        setNewContactModal(false);
                                        localStorage.setItem("newContactModal", "false");
                                    }} style={{ width: '40px', height: '40px' }}> ✕ </button>
                                </div>

                                {/* Scrollable Body */}
                                <div className="p-4 overflow-auto custom-scrollbar" style={{ flex: 1 }}>
                                    {/* Section 1: Basic Details */}
                                    <div className="mb-5">
                                        <h6 className="text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                            <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">01</span> Basic Details
                                        </h6>

                                        {/* Basic Details */}
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="label-style">Salutation</label>
                                                <select className="form-select input-style" value={newContact.Salutation} onChange={(e) => setNewContact({ ...newContact, Salutation: e.target.value })}>
                                                    <option>Mr.</option>
                                                    <option>Ms.</option>
                                                    <option>Mrs.</option>
                                                    <option>Dr.</option>
                                                </select>
                                            </div>

                                            {/* Full Name */}
                                            <div className="col-md-8">
                                                <label className="label-style">Full Name</label>
                                                <input type="text" className="form-control input-style" placeholder="John Doe" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} />
                                            </div>

                                            {/* Email  */}
                                            <div className="col-md-6">
                                                <label className="label-style">Email Address</label>
                                                <input
                                                    type="email"
                                                    className={`form-control input-style ${newContact.email && !/^\S+@\S+\.\S+$/.test(newContact.email) ? 'border-danger' : ''}`}
                                                    value={newContact.email}
                                                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                                                    placeholder="example@mail.com"
                                                />
                                                {newContact.email && !/^\S+@\S+\.\S+$/.test(newContact.email) && (
                                                    <small className="text-danger">Invalid email address</small>
                                                )}
                                            </div>

                                            {/* Phone Number */}
                                            <div className="col-md-6">
                                                <label className="label-style">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className={`form-control input-style ${newContact.phone && !/^\+?\d{7,15}$/.test(newContact.phone)
                                                        ? 'border-danger'
                                                        : ''
                                                        }`}
                                                    value={newContact.phone}
                                                    onChange={(e) =>
                                                        setNewContact({ ...newContact, phone: e.target.value })
                                                    }
                                                    placeholder="+91 00000 00000"
                                                />
                                                {newContact.phone && !/^\+?\d{7,15}$/.test(newContact.phone) && (
                                                    <small className="text-danger">Invalid phone number</small>
                                                )}
                                            </div>

                                            {/* Type */}
                                            <div className="col-md-4">
                                                <label className="label-style">Type</label>
                                                <select className="form-select input-style" value={newContact.Type} onChange={(e) => setNewContact({ ...newContact, Type: e.target.value })}>
                                                    <option>Client</option>
                                                    <option>Lead</option>
                                                    <option>Partner</option>
                                                </select>
                                            </div>

                                            {/* Status */}
                                            <div className="col-md-4">
                                                <label className="label-style">Status</label>
                                                <select className="form-select input-style" value={newContact.status} onChange={(e) => setNewContact({ ...newContact, status: e.target.value })}>
                                                    <option>Active</option>
                                                    <option>Inactive</option>
                                                    <option>Pending</option>
                                                </select>
                                            </div>

                                            {/* Occupation */}
                                            <div className="col-md-4">
                                                <label className="label-style">Occupation</label>
                                                <input type="text" className="form-control input-style" placeholder="Software Engineer" value={newContact.Occupation} onChange={(e) => setNewContact({ ...newContact, Occupation: e.target.value })} />
                                            </div>

                                            {/* Contact Source */}
                                            <div className="col-md-12">
                                                <label className="label-style">Contact Source</label>
                                                <input type="text" className="form-control input-style" placeholder="Referral, Website, Social Media..." value={newContact.Source} onChange={(e) => setNewContact({ ...newContact, Source: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Identification (KYC) */}
                                    <div className="mb-5">
                                        <h6 className="text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                            <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">02</span> Identification (KYC)
                                        </h6>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="label-style">Nationality</label>
                                                <input type="text" className="form-control input-style" placeholder="Indian" value={newContact.nationality} onChange={(e) => setNewContact({ ...newContact, nationality: e.target.value })} />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="label-style">PAN Number</label>
                                                <input type="text" className="form-control input-style" placeholder="ABCDE1234F" value={newContact.PAN} onChange={(e) => setNewContact({ ...newContact, PAN: e.target.value })} />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="label-style">Aadhar Number</label>
                                                <input type="text" className="form-control input-style" placeholder="0000 0000 0000" value={newContact.Aadhar} onChange={(e) => setNewContact({ ...newContact, Aadhar: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Address Details */}
                                    <div className="mb-5">
                                        <h6 className="text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                            <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">03</span> Address Details
                                        </h6>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="label-style">Country</label>
                                                <input type="text" className="form-control input-style" placeholder="India" value={newContact.country} onChange={(e) => setNewContact({ ...newContact, country: e.target.value })} />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="label-style">State</label>
                                                <input type="text" className="form-control input-style" placeholder="Gujarat" value={newContact.state} onChange={(e) => setNewContact({ ...newContact, state: e.target.value })} />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="label-style">City</label>
                                                <input type="text" className="form-control input-style" placeholder="Surat" value={newContact.city} onChange={(e) => setNewContact({ ...newContact, city: e.target.value })} />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="label-style">Pincode</label>
                                                <input type="text" className="form-control input-style" placeholder="395000" value={newContact.pincode} onChange={(e) => setNewContact({ ...newContact, pincode: e.target.value })} />
                                            </div>
                                            <div className="col-md-8">
                                                <label className="label-style">Street Address</label>
                                                <input type="text" className="form-control input-style" placeholder="123, Business Hub Area" value={newContact.street} onChange={(e) => setNewContact({ ...newContact, street: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 4: Notes */}
                                    <div className="mb-2">
                                        <h6 className="text-primary fw-bold text-uppercase mb-4" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                            <span className="bg-primary bg-opacity-10 px-2 py-1 rounded">04</span> Additional Notes
                                        </h6>
                                        <textarea className="form-control input-style" rows="3" placeholder="Add any specific details or conversation history..." value={newContact.notes} onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}></textarea>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="p-4 border-top bg-light bg-opacity-50 d-flex gap-3 justify-content-end">
                                    <button className="btn btn-light px-5 py-2 rounded-4 fw-bold" onClick={() => setNewContactModal(false)}>Discard</button>
                                    <button className="btn btn-dark px-5 py-2 rounded-4 fw-bold shadow-sm" onClick={() => {
                                        if (!newContact.name || !newContact.email) return;
                                        
                                        const newContactRecord = { 
                                            ...newContact, 
                                            id: Date.now(), 
                                            Created: new Date().toLocaleDateString() 
                                        };
                                        const updatedContacts = [...contacts, newContactRecord];

                                        setContacts(updatedContacts);
                                        // Save to DB
                                        putData("contacts", newContactRecord).catch(err => console.error("Error saving contact", err));
                                        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
                                        setNewContact({
                                            Salutation: "Mr.",
                                            name: "",
                                            Occupation: "",
                                            email: "",
                                            phone: "",
                                            Type: "Client",
                                            Source: "",
                                            status: "Active",
                                            Created: "",
                                            location: "",
                                            nationality: "",
                                            PAN: "",
                                            Aadhar: "",
                                            country: "",
                                            state: "",
                                            city: "",
                                            pincode: "",
                                            street: "",
                                            notes: "",
                                        });
                                        setNewContactModal(false);
                                        localStorage.setItem("newContactModal", "false");
                                    }}>Save Contact</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CONTACT TABLE */}
                    <div className="table-responsive p-4">
                        <table className="table table-borderless align-middle">
                            <thead className="text-muted small text-uppercase">
                                <tr>
                                    <th>Name</th>
                                    <th>Occupation</th>
                                    <th>Email / Phone</th>
                                    <th>Type</th>
                                    <th>Source</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="contact-row">
                                        {/* Name */}
                                        <td>{contact.name}</td>

                                        {/* Occupation */}
                                        <td>{contact.Occupation}</td>

                                        {/* Email / Phone */}
                                        <td>
                                            <div className="d-flex flex-column">
                                                <span>{contact.email}</span>
                                                <span className="text-muted small">{contact.phone}</span>
                                            </div>
                                        </td>

                                        {/* Type */}
                                        <td>
                                            <span className={`px-3 py-1 rounded-pill small fw-bold ${contact.Type === 'Enterprise' ? 'bg-primary-subtle text-primary' : 'bg-light text-dark'
                                                }`}>
                                                {contact.Type}
                                            </span>
                                        </td>

                                        {/* Source */}
                                        <td>{contact.Source}</td>

                                        {/* Status */}
                                        <td>
                                            <span className={`d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill small fw-bold ${contact.status === 'Active' ? 'bg-success-subtle text-success' :
                                                contact.status === 'Inactive' ? 'bg-danger-subtle text-danger' :
                                                    'bg-warning-subtle text-warning'
                                                }`}>
                                                {contact.status}
                                            </span>
                                        </td>

                                        {/* Created */}
                                        <td>{contact.Created}</td>

                                        {/* Actions */}
                                        <td>
                                            <button className="btn btn-light btn-sm rounded-circle border-0" onClick={() => setMoreVerticalClicked(contact.id)}>
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {moreVerticalClicked && (
                                <div
                                    className="position-absolute bg-white border  shadow rounded-2"
                                    style={{ top: "40px", right: "10px", zIndex: 1000 }}
                                >
                                    <div
                                        className="p-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/dashboard")}
                                    >
                                        View Details
                                    </div>
                                    <div
                                        className="p-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleAction("edit", project)}
                                    >
                                        Edit Details
                                    </div>
                                    <div
                                        className="p-2 text-danger"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleAction("delete", project)}
                                    >
                                        Delete
                                    </div>
                                </div>
                            )}
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contacts;