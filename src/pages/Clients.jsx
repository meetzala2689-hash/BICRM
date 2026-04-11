import React, { useState, useEffect } from "react";
import { putData, getAllData, deleteData } from "../utils/indexedDB";

function Clients() {
  const currencyMap = { INR: "₹", USD: "$", EUR: "€", AED: "DH ", GBP: "£" };

  const initialClients = [];

  // State for clients
  const [clientList, setClientList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Invoice modal state
  const [inVoice, setInvoice] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [paidAmountInput, setPaidAmountInput] = useState("");

  const [currentClient, setCurrentClient] = useState({
    id: null,
    name: "",
    status: "active",
    company_name: "",
    billing_method: "",
    currency: "INR",
    contact_person: "",
    country_code: "+91",
    mobile: "",
    address: "",
    invoices: [],
  });

  // Load from IndexedDB on mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const storedClients = await getAllData("clients");
        if (storedClients && storedClients.length > 0) {
          setClientList(storedClients);
        } else {
          // Migration from localStorage if needed
          const saved = localStorage.getItem("clients");
          if (saved) {
            const parsed = JSON.parse(saved);
            setClientList(parsed);
            parsed.forEach(c => putData("clients", c));
          }
        }
      } catch (error) {
        console.error("Error loading clients from DB:", error);
      }
    };
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentClient({ ...currentClient, [name]: value });
  };

  const handleSaveClient = () => {
    if (!currentClient.name || !currentClient.company_name) {
      alert("Client Name and Company are required!");
      return;
    }

    if (isEditing) {
      const updatedList = clientList.map((c) =>
        c.id === currentClient.id ? currentClient : c
      );
      setClientList(updatedList);
      putData("clients", currentClient).catch(err => console.error(err));
    } else {
      const newClient = {
        ...currentClient,
        id: Date.now(),
        invoices: currentClient.invoices || [],
      };
      setClientList([...clientList, newClient]);
      putData("clients", newClient).catch(err => console.error(err));
    }

    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentClient({
      id: null,
      name: "",
      status: "active",
      company_name: "",
      billing_method: "",
      currency: "INR",
      contact_person: "",
      country_code: "+91",
      mobile: "",
      address: "",
      invoices: [],
    });
    setIsEditing(false);
  };

  const handleEditClient = (client) => {
    setCurrentClient(client);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteClient = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClientList(clientList.filter((c) => c.id !== id));
      deleteData("clients", id).catch(err => console.error("Error deleting from DB", err));
    }
  };

  const handleViewClient = (client) => {
    alert(`Viewing ${client.name}`);
  };

  const handleAddInvoice = () => {
    if (!invoiceAmount) return alert("Enter amount");

    let updatedClientRecord = null;
    const updatedClients = clientList.map((c) => {
      if (c.id === currentClient.id) {
        updatedClientRecord = {
          ...c,
          invoices: [
            ...(c.invoices || []),
            {
              amount: Number(invoiceAmount),
              paid_amount: Number(paidAmountInput || 0),
            },
          ],
        };
        return updatedClientRecord;
      }
      return c;
    });

    setClientList(updatedClients);
    if (updatedClientRecord) {
      putData("clients", updatedClientRecord).catch(err => console.error("Error saving invoice invoice", err));
    }
    setInvoice(false);
    setInvoiceAmount("");
    setPaidAmountInput("");
  };

  // Reusable components
  const StylishInfo = ({ label, children, icon }) => (
    <div className="col-6">
      <label className="label-style">{label}</label>
      <div className="d-flex align-items-center mt-1">
        <i className={`bi ${icon} me-2 text-muted small`}></i>
        <p className="fw-bold text-dark m-0 small">{children}</p>
      </div>
    </div>
  );

  const MiniStat = ({ label, value, isSuccess }) => (
    <div className="col-4">
      <div className="bg-white p-2 rounded-3 border border-light text-center shadow-sm">
        <p
          className="m-0 text-muted"
          style={{ fontSize: "0.55rem", fontWeight: 700 }}
        >
          {label}
        </p>
        <p
          className={`m-0 fw-black small ${isSuccess ? "text-success" : "text-dark"
            }`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  const ModernActionBtn = ({ icon, onClick }) => (
    <button
      onClick={onClick}
      className="btn btn-link p-2 text-muted text-decoration-none"
    >
      <i className={`bi ${icon}`} style={{ fontSize: "1rem" }}></i>
    </button>
  );

  return (
    <div
      style={{ backgroundColor: "#f3efdb", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="p-0">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <span className="text-primary fw-bold small text-uppercase tracking-wider">
              Relationship Manager
            </span>
            <h2 className="fw-black text-dark m-0">Clients</h2>
          </div>

          <button
            onClick={() => {
              setShowModal(true);
              resetForm();
            }}

            className="btn btn-dark px-4 py-2 shadow-sm border-0 d-flex align-items-center"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            }}
          >
            <i className="bi bi-plus-lg me-2"></i>
            <span className="fw-bold">New Client</span>
          </button>
          {console.log(showModal)}
        </div>
        {/* Client Cards */}
        <div className="row g-4">
          {clientList.map((client) => {
            const invoices = client.invoices || [];
            const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);
            const paidAmount = invoices.reduce((sum, i) => sum + i.paid_amount, 0);
            const dueAmount = totalAmount - paidAmount;
            const symbol = currencyMap[client.currency] || client.currency + " ";

            return (
              <div className="col-md-6 col-xl-6 mb-3" key={client.id}>
                <div className="card border-0 shadow-md h-100 overflow-hidden stylish-card">
                  <div className="status-bar bg-success"></div>
                  <div className="card-body p-0">
                    <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="contract-dot me-2"></div>
                        <span
                          className="text-muted fw-bold"
                          style={{ fontSize: "1rem" }}
                        >
                          NO CONTRACT
                        </span>
                      </div>
                      <div className="d-flex gap-2">
                        <ModernActionBtn
                          icon="bi-eye"
                          title="View"
                          onClick={() => handleViewClient(client)}
                        />
                        <ModernActionBtn
                          icon="bi-pencil-square"
                          title="Edit"
                          onClick={() => handleEditClient(client)}
                        />
                        <ModernActionBtn
                          icon="bi-trash3 text-danger"
                          title="Delete"
                          onClick={() => handleDeleteClient(client.id)}
                        />
                        <ModernActionBtn
                          icon="bi-plus-circle"
                          title="Add Invoice"
                          onClick={() => {
                            setCurrentClient(client);
                            setInvoice(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="d-flex align-items-center mb-4">
                        <div className="avatar-circle me-3 shadow-sm">
                          {client.name?.charAt(0)}
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fw-bold m-0 text-dark">{client.name}</h5>
                          <span className="text-muted small fw-medium">
                            {client.company_name}
                          </span>
                        </div>
                        <span className="badge-modern">{client.status}</span>
                      </div>

                      <div className="row g-3 mb-4">
                        <StylishInfo label="BILLING METHOD" icon="bi-credit-card">
                          {client.billing_method} ({client.currency})
                        </StylishInfo>
                        <StylishInfo label="CONTACT PERSON" icon="bi-person">
                          {client.contact_person}
                        </StylishInfo>

                        <div className="row d-flex">
                          <StylishInfo label="PHONE" icon="bi-phone">
                            {client.country_code} {client.mobile}
                          </StylishInfo>

                          <div className="col-6">
                            <label className="label-style">PRIMARY ADDRESS</label>
                            <div className="d-flex align-items-center mt-1">
                              <i className="bi bi-geo-alt text-primary me-2 small"></i>
                              <p className="fw-bold text-dark m-0 small text-truncate">
                                {client.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accounting-box shadow-inner">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6
                            className="fw-black m-0"
                            style={{ fontSize: "0.7rem", color: "#64748b" }}
                          >
                            FINANCIALS
                          </h6>
                          <div className="currency-pill">{client.currency}</div>
                        </div>

                        <div className="row g-2 mb-3">
                          <MiniStat
                            label="FILES"
                            value={client.invoices?.length || 0}
                          />
                          <MiniStat
                            label="TOTAL"
                            value={`${symbol}${totalAmount.toLocaleString()}`}
                          />
                          <MiniStat
                            label="PAID"
                            value={`${symbol}${paidAmount.toLocaleString()}`}
                            isSuccess
                          />
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-3 border-top border-white">
                          <span className="fw-bold text-muted small">NET DUE</span>
                          <h4 className="fw-black text-danger m-0">
                            {symbol}
                            {dueAmount.toLocaleString()}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice Modal */}
      {
        inVoice && (
          <>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Add Invoice - {currentClient?.name}
                    </h5>
                    <button className="btn-close" onClick={() => setInvoice(false)}></button>
                  </div>

                  <div className="modal-body">
                    <input
                      type="number"
                      className="form-control mb-3"
                      placeholder="Invoice Amount"
                      value={invoiceAmount}
                      onChange={(e) => setInvoiceAmount(e.target.value)}
                    />

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Paid Amount"
                      value={paidAmountInput}
                      onChange={(e) => setPaidAmountInput(e.target.value)}
                    />
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setInvoice(false)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleAddInvoice}>
                      Save Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal-backdrop fade show"
              onClick={() => setInvoice(false)}
            ></div>
          </>
        )
      }

      {/* Client Modal */}
      {
        showModal && (
          <div className="modal-overlay"
            style={{ zIndex: "9999" }}>
            <div className="modal-box">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-black m-0">{isEditing ? "Edit Client" : "Add New Client"}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="row g-3">
                {[
                  "name",
                  "company_name",
                  "billing_method",
                  "currency",
                  "contact_person",
                  "country_code",
                  "mobile",
                  "address",
                ].map((field) => (
                  <div key={field} className={field === "address" ? "col-12" : "col-6"}>
                    {field === "address" ? (
                      <textarea
                        className="form-control"
                        placeholder={field.replace("_", " ").toUpperCase()}
                        name={field}
                        value={currentClient[field]}
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        className="form-control"
                        placeholder={field.replace("_", " ").toUpperCase()}
                        name={field}
                        value={currentClient[field]}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-end mt-4 gap-2">
                <button className="btn btn-light" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-dark px-3"
                  style={{ borderRadius: "10px" }}
                  onClick={handleSaveClient}
                >
                  Save Client
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* STYLES */}
      <style>{`
        .fw-black { font-weight: 900; }
        .stylish-card { border-radius: 24px; transition: transform 0.3s; position: relative; }
        .stylish-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        .status-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 7px;}
        .avatar-circle { width: 48px; height: 48px; background: #EEF2FF; color: #4F46E5; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: 900; }
        .label-style { font-size: 0.6rem; font-weight: 800; color: #94A3B8; }
        .badge-modern { background: #DCFCE7; color: #15803D; font-size: 0.65rem; font-weight: 800; padding: 6px 12px; border-radius: 8px; }
        .accounting-box { background: #F1F5F9; border-radius: 20px; padding: 20px; border: 1px solid #E2E8F0; }
        .currency-pill { background: white; padding: 2px 8px; border-radius: 6px; font-size: 0.65rem; font-weight: 700; border: 1px solid #E2E8F0; }
        .contract-dot { width: 8px; height: 8px; background: #CBD5E1; border-radius: 50%; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15,23,42,0.35); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 999; }
        .modal-box { background: #fff; padding: 24px; border-radius: 20px; width: 520px; max-width: 95%; box-shadow: 0 20px 40px rgba(0,0,0,0.08); border: 1px solid #E2E8F0; }
        .modal-box input, .modal-box textarea { border-radius: 12px; padding: 10px; font-size: 0.85rem; background: #F8FAFC; border: 1px solid #E2E8F0; }
        .modal-box input:focus, .modal-box textarea:focus { outline: none; border-color: #4F46E5; box-shadow: 0 0 0 2px rgba(79,70,229,0.1); }
      `}</style>
    </div >
  );
}

export default Clients;