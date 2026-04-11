import React, { useState, useEffect } from "react";
import InvoiceTemplate from "./InvoiceTemplate";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom/client";
import { jsPDF } from "jspdf";
import { FaEdit, FaEye, FaPaperPlane, FaPlus, FaTrash } from "react-icons/fa";

const STYLES = `
  .fw-black { font-weight: 900; }
  .stylish-card { border-radius: 24px; transition: transform 0.3s; position: relative; border: 1px solid #e2e8f0; }
  .stylish-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
  .status-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 7px; }
  .avatar-circle { width: 48px; height: 48px; background: #EEF2FF; color: #4F46E5; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: 900; }
  .label-style { font-size: 0.6rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px; }
  .badge-modern { background: #DCFCE7; color: #15803D; font-size: 0.65rem; font-weight: 800; padding: 6px 12px; border-radius: 8px; }
  .accounting-box { background: #f1f5f9; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0; }
  .currency-pill { background: white; padding: 2px 8px; border-radius: 6px; font-size: 0.65rem; font-weight: 800; border: 1px solid #e2e8f0; color: #334155; }
  .contract-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; }
  .form-control, .form-select { border-radius: 12px; padding: 10px 14px; border: 1px solid #e2e8f0; font-size: 0.9rem; font-weight: 500; }
  .form-control:focus, .form-select:focus { border-color: #4F46E5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
  .w-fit { width: fit-content; }
`;

function ClientInvoice() {
  const [activeTab, setActiveTab] = useState("clients");
  const currencyMap = { INR: "₹", USD: "$", EUR: "€", AED: "DH ", GBP: "£" };

  const [clientList, setClientList] = useState(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });

  const [invoiceList, setInvoiceList] = useState(() => {
    const saved = localStorage.getItem("invoiceList");
    return saved ? JSON.parse(saved) : [];
  });

  const [showClientModal, setShowClientModal] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    id: null, name: "", status: "active", company_name: "", billing_method: "", currency: "INR",
    contact_person: "", country_code: "+91", mobile: "", address: "", invoices: []
  });

  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [editingInvoiceIndex, setEditingInvoiceIndex] = useState(null);
  const [previewInvoiceData, setPreviewInvoiceData] = useState(null);
  const [invoiceForm, setInvoiceForm] = useState({
    invoiceNumber: "", currency: "USD", invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date().toISOString().slice(0, 10), billingAddress: { name: "", address: "", countryCode: "+91", phone: "" },
    shippingAddress: { name: "", address: "", countryCode: "+91", phone: "" },
    items: [{ description: "", qty: 1, unitPrice: 0, amount: 0 }], taxPercent: 0, discount: 0, paidAmount: 0
  });

  useEffect(() => { localStorage.setItem("clients", JSON.stringify(clientList)); }, [clientList]);
  useEffect(() => { localStorage.setItem("invoiceList", JSON.stringify(invoiceList)); }, [invoiceList]);

  const handleClientChange = (e) => setCurrentClient({ ...currentClient, [e.target.name]: e.target.value });

  const handleSaveClient = () => {
    if (!currentClient.name || !currentClient.company_name) return alert("Required fields missing");
    if (isEditingClient) {
      setClientList(clientList.map(c => c.id === currentClient.id ? currentClient : c));
    } else {
      setClientList([...clientList, { ...currentClient, id: Date.now() }]);
    }
    setShowClientModal(false);
    resetClientForm();
  };

  const resetClientForm = () => {
    setCurrentClient({ id: null, name: "", status: "active", company_name: "", billing_method: "", currency: "INR", contact_person: "", country_code: "+91", mobile: "", address: "", invoices: [] });
    setIsEditingClient(false);
  };

  const handleEditClient = (c) => { setCurrentClient(c); setIsEditingClient(true); setShowClientModal(true); };
  const handleDeleteClient = (id) => { if (window.confirm("Delete client?")) setClientList(clientList.filter(c => c.id !== id)); };

  const handleInvoiceItemChange = (idx, field, val) => {
    const items = [...invoiceForm.items];
    items[idx][field] = (field === "qty" || field === "unitPrice") ? Math.max(0, Number(val)) : val;
    items[idx].amount = (items[idx].qty || 0) * (items[idx].unitPrice || 0);
    setInvoiceForm({ ...invoiceForm, items });
  };

  const handleInvoiceSave = () => {
    if (!invoiceForm.invoiceNumber) return alert("Invoice # required");
    const subtotal = invoiceForm.items.reduce((s, i) => s + i.amount, 0);
    const tax = (subtotal * invoiceForm.taxPercent) / 100;
    const total = subtotal + tax - invoiceForm.discount;
    const finalInv = { ...invoiceForm, total, subtotal };

    if (editingInvoiceIndex !== null) {
      const newList = [...invoiceList];
      newList[editingInvoiceIndex] = finalInv;
      setInvoiceList(newList);
    } else {
      setInvoiceList([finalInv, ...invoiceList]);
    }
    setShowInvoiceForm(false);
    resetInvoiceForm();
  };

  const resetInvoiceForm = () => {
    setInvoiceForm({ invoiceNumber: "", currency: "USD", invoiceDate: new Date().toISOString().slice(0, 10), dueDate: new Date().toISOString().slice(0, 10), billingAddress: { name: "", address: "", countryCode: "+91", phone: "" }, shippingAddress: { name: "", address: "", countryCode: "+91", phone: "" }, items: [{ description: "", qty: 1, unitPrice: 0, amount: 0 }], taxPercent: 0, discount: 0, paidAmount: 0 });
    setEditingInvoiceIndex(null);
  };

  const handleCreateInvoiceForClient = (client) => {
    setInvoiceForm({ ...invoiceForm, invoiceNumber: `INV-${Date.now().toString().slice(-4)}`, currency: client.currency || "USD", billingAddress: { name: "MEET - Your Company", address: "Business City, IN", countryCode: "+91", phone: "9876543210" }, shippingAddress: { name: client.name, address: client.address, countryCode: "+91", phone: client.mobile }, items: [{ description: "Consulting Services", qty: 1, unitPrice: 0, amount: 0 }], paidAmount: 0 });
    setActiveTab("invoices");
    setShowInvoiceForm(true);
  };

  const handleDownloadPDF = async (invData) => {
    const subtotal = invData.items.reduce((s, i) => s + i.amount, 0);
    const totalV = subtotal + (subtotal * invData.taxPercent / 100) - invData.discount;
    const finalData = { ...invData, subtotal, total: new Intl.NumberFormat('en-US', { style: 'currency', currency: invData.currency }).format(totalV) };
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute"; tempDiv.style.left = "-9999px";
    document.body.appendChild(tempDiv);
    const root = ReactDOM.createRoot(tempDiv);
    root.render(<InvoiceTemplate data={finalData} />);
    await new Promise(r => setTimeout(r, 800));
    const canvas = await html2canvas(tempDiv, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save(`${invData.invoiceNumber}.pdf`);
    root.unmount(); document.body.removeChild(tempDiv);
  };

  const StylishInfo = ({ label, children, icon }) => (
    <div className="col-6">
      <label className="label-style">{label}</label>
      <div className="d-flex align-items-center mt-1">
        <i className={`bi ${icon} me-2 text-primary small`}></i>
        <p className="fw-bold text-dark m-0 small text-truncate">{children}</p>
      </div>
    </div>
  );

  const MiniStat = ({ label, value, isSuccess }) => (
    <div className="col-4">
      <div className="bg-white p-2 rounded-3 border border-light text-center shadow-sm">
        <p className="m-0 text-muted" style={{ fontSize: "0.55rem", fontWeight: 700 }}>{label}</p>
        <p className={`m-0 fw-black small ${isSuccess ? "text-success" : "text-dark"}`}>{value}</p>
      </div>
    </div>
  );

  const ModernActionBtn = ({ icon, onClick, title }) => (
    <button onClick={onClick} title={title} className="btn btn-link p-2 text-muted text-decoration-none">
      <i className={`bi ${icon}`} style={{ fontSize: "1.1rem" }}></i>
    </button>
  );

  return (
    <div className="container-fluid p-0" style={{ minHeight: "100vh", backgroundColor: "#f3efdb", fontFamily: "'Inter', sans-serif" }}>
      <div className="p-4 p-lg-5">
        {/* Tab Switcher */}
        <div className="d-flex gap-2 mb-5 bg-white p-2 rounded-4 shadow-sm w-fit" style={{ width: "fit-content" }}>
          <button onClick={() => setActiveTab("clients")} className={`btn px-4 py-2 rounded-3 fw-bold border-0 ${activeTab === "clients" ? "btn-dark shadow-sm" : "btn-light text-muted"}`}>Clients</button>
          <button onClick={() => setActiveTab("invoices")} className={`btn px-4 py-2 rounded-3 fw-bold border-0 ${activeTab === "invoices" ? "btn-dark shadow-sm" : "btn-light text-muted"}`}>Invoices</button>
        </div>

        {activeTab === "clients" && (
          <div>
            <div className="d-flex justify-content-between align-items-end mb-5">
              <div>
                <span className="text-primary fw-bold small text-uppercase tracking-wider">Relationship Manager</span>
                <h2 className="fw-black text-dark m-0">Clients</h2>
              </div>
              <button onClick={() => { setShowClientModal(true); resetClientForm(); }} className="btn btn-dark px-4 py-2 shadow-sm border-0 d-flex align-items-center" style={{ borderRadius: "12px", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}>
                <i className="bi bi-plus-lg me-2"></i> <span className="fw-bold">New Client</span>
              </button>
            </div>

            <div className="row g-4">
              {clientList.map(c => {
                const invs = invoiceList.filter(i => i.shippingAddress.name === c.name);
                const totalAmount = invs.reduce((sum, i) => sum + i.total, 0);
                const paidAmount = invs.reduce((sum, i) => sum + (Number(i.paidAmount) || 0), 0);
                const dueAmount = totalAmount - paidAmount;
                const symbol = currencyMap[c.currency] || c.currency + " ";

                return (
                  <div className="col-md-6 col-xl-6 mb-3" key={c.id}>
                    <div className="card border-0 shadow-md h-100 overflow-hidden stylish-card shadow-sm bg-white">
                      <div className="status-bar bg-success"></div>
                      <div className="card-body p-0">
                        <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom">
                          <div className="d-flex align-items-center">
                            <div className="contract-dot me-2 bg-success"></div>
                            <span className="text-muted fw-bold" style={{ fontSize: "0.85rem" }}>NO CONTRACT</span>
                          </div>
                          <div className="d-flex gap-1">
                            <ModernActionBtn icon="bi-eye" title="View" onClick={() => alert('View')} />
                            <ModernActionBtn icon="bi-pencil-square" title="Edit" onClick={() => handleEditClient(c)} />
                            <ModernActionBtn icon="bi-trash3 text-danger" title="Delete" onClick={() => handleDeleteClient(c.id)} />
                            <ModernActionBtn icon="bi-plus-circle text-primary" title="Add Invoice" onClick={() => handleCreateInvoiceForClient(c)} />
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="d-flex align-items-center mb-4">
                            <div className="avatar-circle me-3 shadow-sm">{c.name?.charAt(0)}</div>
                            <div className="flex-grow-1">
                              <h5 className="fw-bold m-0 text-dark">{c.name}</h5>
                              <span className="text-muted small fw-medium">{c.company_name}</span>
                            </div>
                            <span className="badge-modern">{c.status}</span>
                          </div>

                          <div className="row g-3 mb-4">
                            <StylishInfo label="BILLING METHOD" icon="bi-credit-card">{c.billing_method || "Bank Transfer"} ({c.currency})</StylishInfo>
                            <StylishInfo label="CONTACT PERSON" icon="bi-person">{c.contact_person}</StylishInfo>
                            <div className="row d-flex">
                              <StylishInfo label="PHONE" icon="bi-phone">{c.country_code} {c.mobile}</StylishInfo>
                              <div className="col-6">
                                <label className="label-style">PRIMARY ADDRESS</label>
                                <div className="d-flex align-items-center mt-1">
                                  <i className="bi bi-geo-alt text-primary me-2 small"></i>
                                  <p className="fw-bold text-dark m-0 small text-truncate">{c.address}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="accounting-box shadow-inner">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6 className="fw-black m-0" style={{ fontSize: "0.7rem", color: "#64748b" }}>FINANCIALS</h6>
                              <div className="currency-pill">{c.currency}</div>
                            </div>
                            <div className="row g-2 mb-3">
                              <MiniStat label="FILES" value={invs.length} />
                              <MiniStat label="TOTAL" value={`${symbol}${totalAmount.toLocaleString()}`} />
                              <MiniStat label="PAID" value={`${symbol}${paidAmount.toLocaleString()}`} isSuccess />
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-3 border-top border-white">
                              <span className="fw-bold text-muted small">NET DUE</span>
                              <h4 className="fw-black text-danger m-0">{symbol}{dueAmount.toLocaleString()}</h4>
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
        )}

        {activeTab === "invoices" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h2 className="fw-black text-dark m-0">Invoices</h2>
              <button
                onClick={() => { setShowInvoiceForm(true); resetInvoiceForm(); }}
                className="btn btn-dark px-4 py-2 rounded-3 shadow-sm border-0 d-flex align-items-center"
                style={{ background: "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)" }}
              >
                <FaPlus className="me-2" /> Create Invoice
              </button>
            </div>

            {showInvoiceForm && (
              <div className="card border-0 shadow-md rounded-4 p-4 mb-5 bg-white shadow">
                <div className="d-flex justify-content-between mb-4"><h4 className="fw-black">{editingInvoiceIndex !== null ? "Edit Invoice" : "New Invoice"}</h4><button className="btn-close" onClick={() => setShowInvoiceForm(false)}></button></div>
                <div className="row g-3 mb-4">
                  <div className="col-md-3"><label className="form-label small fw-bold">Invoice Number</label><input className="form-control" value={invoiceForm.invoiceNumber} onChange={e => setInvoiceForm({ ...invoiceForm, invoiceNumber: e.target.value })} /></div>
                  <div className="col-md-2"><label className="form-label small fw-bold">Currency</label><select className="form-select" value={invoiceForm.currency} onChange={e => setInvoiceForm({ ...invoiceForm, currency: e.target.value })}><option value="USD">USD</option><option value="INR">INR</option></select></div>
                  <div className="col-md-2"><label className="form-label small fw-bold">Amount Paid</label><input type="number" className="form-control" value={invoiceForm.paidAmount} onChange={e => setInvoiceForm({ ...invoiceForm, paidAmount: e.target.value })} /></div>
                  <div className="col-md-5"></div>
                </div>
                <div className="row g-4 mb-4">
                  <div className="col-md-6 p-3 bg-light rounded-4 border border-white">
                    <h6 className="fw-bold mb-3 text-primary">Billing From</h6>
                    <input className="form-control mb-2" placeholder="Name" value={invoiceForm.billingAddress.name} onChange={e => setInvoiceForm({ ...invoiceForm, billingAddress: { ...invoiceForm.billingAddress, name: e.target.value } })} />
                    <textarea className="form-control" rows="2" placeholder="Address" value={invoiceForm.billingAddress.address} onChange={e => setInvoiceForm({ ...invoiceForm, billingAddress: { ...invoiceForm.billingAddress, address: e.target.value } })} />
                  </div>
                  <div className="col-md-6 p-3 bg-light rounded-4 border border-white">
                    <h6 className="fw-bold mb-3 text-primary">Shipping To</h6>
                    <input className="form-control mb-2" placeholder="Name" value={invoiceForm.shippingAddress.name} onChange={e => setInvoiceForm({ ...invoiceForm, shippingAddress: { ...invoiceForm.shippingAddress, name: e.target.value } })} />
                    <textarea className="form-control" rows="2" placeholder="Address" value={invoiceForm.shippingAddress.address} onChange={e => setInvoiceForm({ ...invoiceForm, shippingAddress: { ...invoiceForm.shippingAddress, address: e.target.value } })} />
                  </div>
                </div>
                <table className="table">
                  <thead><tr><th>Description</th><th style={{ width: '80px' }}>Qty</th><th style={{ width: '120px' }}>Price</th><th>Total</th><th style={{ width: '50px' }}></th></tr></thead>
                  <tbody>
                    {invoiceForm.items.map((item, idx) => (
                      <tr key={idx}>
                        <td><input className="form-control" value={item.description} onChange={e => handleInvoiceItemChange(idx, "description", e.target.value)} /></td>
                        <td><input type="number" className="form-control" value={item.qty} onChange={e => handleInvoiceItemChange(idx, "qty", e.target.value)} /></td>
                        <td><input type="number" className="form-control" value={item.unitPrice} onChange={e => handleInvoiceItemChange(idx, "unitPrice", e.target.value)} /></td>
                        <td className="fw-bold">{(item.qty * item.unitPrice).toFixed(2)}</td>
                        <td><button className="btn btn-link text-danger p-0" onClick={() => setInvoiceForm({ ...invoiceForm, items: invoiceForm.items.filter((_, i) => i !== idx) })} disabled={invoiceForm.items.length === 1}><FaTrash /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn btn-outline-dark btn-sm" onClick={() => setInvoiceForm({ ...invoiceForm, items: [...invoiceForm.items, { description: "", qty: 1, unitPrice: 0, amount: 0 }] })}><FaPlus className="me-1" /> Add Item</button>

                <div className="d-flex justify-content-end mt-4 pt-3 border-top gap-2">
                  <button className="btn btn-light" onClick={() => setShowInvoiceForm(false)}>Cancel</button>
                  <button className="btn btn-dark px-4" onClick={handleInvoiceSave}>Save Invoice</button>
                </div>
              </div>
            )}

            <div className="row g-4">
              {invoiceList.map((inv, idx) => (
                <div className="col-md-6 col-lg-4" key={idx}>
                  <div className="card border-0 shadow-md rounded-4 p-4 h-100 bg-white border-top border-4 border-primary">
                    <div className="d-flex justify-content-between mb-3 align-items-center">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '0.7rem' }}>{inv.invoiceNumber}</span>
                      <button onClick={() => { setEditingInvoiceIndex(idx); setInvoiceForm(inv); setShowInvoiceForm(true); }} className="btn btn-light btn-sm rounded-3"><FaEdit /></button>
                    </div>
                    <h4 className="fw-black mb-1">{inv.currency} {inv.total?.toLocaleString()}</h4>
                    <p className="text-muted small mb-4 fw-medium"><i className="bi bi-person me-1"></i> {inv.shippingAddress.name}</p>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                      <span className="small text-muted fw-bold">{inv.invoiceDate}</span>
                      <div className="d-flex gap-2">
                        <button onClick={() => setPreviewInvoiceData(inv)} className="btn btn-sm btn-dark px-3 rounded-3"><FaEye className="me-1" /> View</button>
                        <button onClick={() => handleDownloadPDF(inv)} className="btn btn-sm btn-outline-dark px-3 rounded-3"><FaPaperPlane className="me-1" /> PDF</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CLient Modal Overlay */}
      {showClientModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: 'blur(15px)',
            zIndex: 2000
          }}>
          <div className="bg-white p-4  shadow-lg border border-light" style={{ width: "100%", height: "100%" }}>
            <h4 className="fw-black mb-4">{isEditingClient ? "Edit Client" : "New Client"}</h4>
            <div className="row g-3">
              <div className="col-12"><label className="label-style d-block mb-1">Client Full Name</label><input className="form-control" name="name" value={currentClient.name} onChange={handleClientChange} placeholder="e.g. John Doe" /></div>
              <div className="col-12"><label className="label-style d-block mb-1">Company Name</label><input className="form-control" name="company_name" value={currentClient.company_name} onChange={handleClientChange} placeholder="e.g. Acme Corp" /></div>
              <div className="col-6"><label className="label-style d-block mb-1">Contact Person</label><input className="form-control" name="contact_person" value={currentClient.contact_person} onChange={handleClientChange} placeholder="Name" /></div>
              <div className="col-6"><label className="label-style d-block mb-1">Mobile</label><input className="form-control" name="mobile" value={currentClient.mobile} onChange={handleClientChange} placeholder="Phone number" /></div>
              <div className="col-12"><label className="label-style d-block mb-1">Address</label><textarea className="form-control" name="address" value={currentClient.address} onChange={handleClientChange} rows="3" placeholder="Full Billing Address" /></div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              <button className="btn btn-light px-4" onClick={() => setShowClientModal(false)}>Cancel</button>
              <button className="btn btn-dark px-4" style={{ background: "#0f172a" }} onClick={handleSaveClient}>Save Client</button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Preview Modal */}
      {previewInvoiceData && (
        <div className="modal-overlay">
          <div className="bg-white p-4 rounded-4 shadow-2xl overflow-auto border border-light" style={{ maxWidth: "850px", maxHeight: "95vh" }}>
            <div className="d-flex justify-content-between mb-4 border-bottom pb-3">
              <h5 className="fw-black m-0 text-dark">Invoice Summary</h5>
              <button className="btn-close" onClick={() => setPreviewInvoiceData(null)}></button>
            </div>
            <InvoiceTemplate data={previewInvoiceData} />
            <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
              <button className="btn btn-light px-4" onClick={() => setPreviewInvoiceData(null)}>Close</button>
              <button className="btn btn-primary px-4 bg-primary border-0" onClick={() => handleDownloadPDF(previewInvoiceData)}>Download Document (PDF)</button>
            </div>
          </div>
        </div>
      )}

      <style>{STYLES}</style>
    </div>
  );
}

export default ClientInvoice;
