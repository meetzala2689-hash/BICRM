import React, { useState, useEffect } from "react";
import InvoiceTemplate from "./InvoiceTemplate";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom/client";
import { jsPDF } from "jspdf";
import { FaEdit, FaEye, FaPaperPlane, FaPlus, FaTrash } from "react-icons/fa";
const countryCodes = [
  { code: "+44", label: "UK" },
  { code: "+1", label: "US" },
  { code: "+91", label: "IN" },
];

function Invoice() {
  // Load saved invoices from localStorage
  const [invoiceList, setInvoiceList] = useState(() => {
    const savedInvoices = localStorage.getItem("invoiceList");
    return savedInvoices ? JSON.parse(savedInvoices) : [];
  });
  const currencyMap = {
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
    INR: "en-IN",
  };
  const [editingIndex, setEditingIndex] = useState(null);

  // Form fields
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState("");

  const [billingAddress, setBillingAddress] = useState({
    name: "",
    address: "",
    countryCode: countryCodes[2].code,
    phone: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    countryCode: countryCodes[2].code,
    phone: "",
  });

  const [items, setItems] = useState([
    { description: "", qty: "", unitPrice: "", amount: 0 },
  ]);
  const [taxPercent, setTaxPercent] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Save invoice list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("invoiceList", JSON.stringify(invoiceList));
  }, [invoiceList]);

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    if (field === "qty" || field === "unitPrice") {
      const numericValue = value === "" ? "" : Math.max(0, Number(value));
      newItems[index][field] = numericValue;
      const qty = Number(newItems[index].qty) || 0;
      const price = Number(newItems[index].unitPrice) || 0;
      newItems[index].amount = qty * price;
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", qty: 1, unitPrice: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(
      newItems.length
        ? newItems
        : [{ description: "", qty: 1, unitPrice: 0, amount: 0 }],
    );
  };

  // Totals
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = Math.max(0, subtotal + taxAmount - discount);

  // Address handlers
  const handleBillingChange = (field, value) =>
    setBillingAddress({ ...billingAddress, [field]: value });
  const handleShippingChange = (field, value) =>
    setShippingAddress({ ...shippingAddress, [field]: value });

  // Dummy actions
  // const sendInvoice = () => {};

  const downloadInvoice = async (invData) => {
    const data = invData || {
      invoiceNumber,
      invoiceDate,
      dueDate,
      billingAddress,
      shippingAddress,
      items,
      taxPercent,
      discount,
      total,
    };

    // ✅ calculate subtotal
    const subtotal = data.items.reduce((sum, i) => sum + i.amount, 0);

    const finalData = {
      ...data,
      subtotal,
    };

    // ✅ temp div
    const tempDiv = document.createElement("div");
    document.body.appendChild(tempDiv);

    const root = ReactDOM.createRoot(tempDiv);
    root.render(<InvoiceTemplate data={finalData} />);

    // wait render
    await new Promise((res) => setTimeout(res, 500));

    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // ✅ multi-page support
    while (heightLeft > 0) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      if (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - imgHeight;
      }
    }

    pdf.save(`${data.invoiceNumber || "invoice"}.pdf`);

    // cleanup
    root.unmount();
    document.body.removeChild(tempDiv);
  };

  // Save or update invoice
  const saveInvoice = () => {
    if (
      !invoiceNumber ||
      !currency ||
      !invoiceDate ||
      !dueDate ||
      !paymentMethod ||
      !billingAddress?.phone ||
      !shippingAddress?.phone ||
      items.length === 0
    ) {
      alert("Please fill in all required");
      return;
    }

    const newInvoice = {
      invoiceNumber,
      currency,
      invoiceDate,
      dueDate,
      paymentMethod,
      billingAddress,
      shippingAddress,
      items,
      taxPercent,
      discount,
      total,
    };

    let updatedList;
    if (editingIndex !== null) {
      updatedList = [...invoiceList];
      updatedList[editingIndex] = newInvoice;
      setEditingIndex(null);
    } else {
      updatedList = [newInvoice, ...invoiceList];
    }
    setInvoiceList(updatedList);
    resetForm();
  };

  const resetForm = () => {
    setInvoiceNumber("");
    setCurrency("USD");
    setInvoiceDate(new Date().toISOString().slice(0, 10));
    setDueDate(new Date().toISOString().slice(0, 10));
    setPaymentMethod("");
    setBillingAddress({
      name: "",
      address: "",
      countryCode: countryCodes[2].code,
      phone: "",
    });
    setShippingAddress({
      name: "",
      address: "",
      countryCode: countryCodes[2].code,
      phone: "",
    });
    setItems([{ description: "", qty: 1, unitPrice: 0, amount: 0 }]);
    setTaxPercent(0);
    setDiscount(0);
  };

  const deleteInvoice = (index) =>
    setInvoiceList(invoiceList.filter((_, i) => i !== index));

  const editInvoice = (index) => {
    const inv = invoiceList[index];
    setInvoiceNumber(inv.invoiceNumber);
    setCurrency(inv.currency);
    setInvoiceDate(inv.invoiceDate);
    setDueDate(inv.dueDate);
    setPaymentMethod(inv.paymentMethod);
    setBillingAddress(inv.billingAddress);
    setShippingAddress(inv.shippingAddress);
    setItems(inv.items);
    setTaxPercent(inv.taxPercent);
    setDiscount(inv.discount);
    setEditingIndex(index);

    setShowInvoice(true);
  };
  const [showInvoice, setShowInvoice] = useState(false);

  const toggleInvoice = () => setShowInvoice((prev) => !prev);
  return (
    <div>
      <div className="container my-4 flex-grow-1">
        <button
          title="invoice"
          className="btn btn-primary d-flex align-items-center gap-2 mb-3"
          onClick={toggleInvoice}
        >
          <FaPlus />
          {showInvoice ? "Hide Invoice" : "Show Invoice"}
        </button>
        {showInvoice && (
          <div className="invoice-preview border p-3">
            <>
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>
                  <span
                    style={{
                      color: "#551A8B",
                      fontWeight: "bold",
                      fontSize: "28px",
                    }}
                  >
                    M
                  </span>
                  <span
                    style={{
                      color: "#272D6D",
                      fontWeight: "bold",
                      fontSize: "28px",
                    }}
                  >
                    EET
                  </span>
                </h2>
                <div className="d-flex gap-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. INV-0001"
                    value={invoiceNumber}
                    onChange={(e) =>
                      setInvoiceNumber(e.target.value.toUpperCase())
                    }
                    style={{ maxWidth: "180px" }}
                  />
                  <select
                    className="form-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{ maxWidth: "120px" }}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              {/* Dates & Payment */}
              <div className="row mb-4">
                <div className="col-md-3">
                  <label className="form-label">Invoice Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
              </div>

              {/* Addresses */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5>Billing Address</h5>
                  <input
                    className="form-control mb-2"
                    placeholder="Name"
                    value={billingAddress.name}
                    onChange={(e) =>
                      handleBillingChange("name", e.target.value)
                    }
                  />
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    placeholder="Address"
                    value={billingAddress.address}
                    onChange={(e) =>
                      handleBillingChange("address", e.target.value)
                    }
                  />
                  <div className="d-flex gap-2">
                    <select
                      className="form-select"
                      style={{ maxWidth: "110px" }}
                      value={billingAddress.countryCode}
                      onChange={(e) =>
                        handleBillingChange("countryCode", e.target.value)
                      }
                    >
                      {countryCodes.map(({ code, label }) => (
                        <option key={code} value={code}>
                          {code} ({label})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      value={billingAddress.phone}
                      onChange={(e) => {
                        const num = e.target.value;
                        if (/^\d*$/.test(num)) {
                          handleBillingChange("phone", num);
                        }
                      }}
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <h5>Shipping Address</h5>
                  <input
                    className="form-control mb-2"
                    placeholder="Name"
                    value={shippingAddress.name}
                    onChange={(e) =>
                      handleShippingChange("name", e.target.value)
                    }
                  />
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    placeholder="Address"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      handleShippingChange("address", e.target.value)
                    }
                  />
                  <div className="d-flex gap-2">
                    <select
                      className="form-select"
                      style={{ maxWidth: "110px" }}
                      value={shippingAddress.countryCode}
                      onChange={(e) =>
                        handleShippingChange("countryCode", e.target.value)
                      }
                    >
                      {countryCodes.map(({ code, label }) => (
                        <option key={code} value={code}>
                          {code} ({label})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      value={shippingAddress.phone}
                      onChange={(e) => {
                        const num = e.target.value;
                        // Only allow numbers
                        if (/^\d*$/.test(num)) {
                          handleShippingChange("phone", num);
                        }
                      }}
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>

              {/* Items */}
              <table className="table table-bordered align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Description</th>
                    <th>QTY</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(idx, "description", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(idx, "qty", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="form-control"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleItemChange(idx, "unitPrice", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={item.amount.toFixed(2)}
                          readOnly
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeItem(idx)}
                          disabled={items.length === 1}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                className="btn  border-1 border-dark mb-4"
                onClick={addItem}
              >
                + Add Item
              </button>

              {/* Totals */}
              <div
                className="d-flex flex-column align-items-end gap-2"
                style={{ maxWidth: "300px", marginLeft: "auto" }}
              >
                <div className="d-flex justify-content-between w-100">
                  <label className="form-label">Subtotal</label>
                  <input
                    type="number"
                    className="form-control"
                    readOnly
                    value={subtotal.toFixed(2)}
                    style={{ maxWidth: "150px" }}
                  />
                </div>
                <div className="d-flex justify-content-between w-100">
                  <label className="form-label">Tax (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={taxPercent}
                    onChange={(e) =>
                      setTaxPercent(Math.max(0, Number(e.target.value)))
                    }
                    min="0"
                    step="0.01"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
                <div className="d-flex justify-content-between w-100">
                  <label className="form-label">Discount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(Math.max(0, Number(e.target.value)))
                    }
                    min="0"
                    step="0.01"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
                <div className="d-flex justify-content-between w-100 fw-bold fs-5">
                  <label>Total</label>
                  <div>
                    {new Intl.NumberFormat(currencyMap[currency], {
                      style: "currency",
                      currency,
                    }).format(total)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex flex-column gap-2 mt-4">
                {/* <button
            className="btn btn-outline-secondary"
            onClick={previewInvoice}
          >
            Preview
          </button> */}
                {/* <button
            className="btn btn-outline-secondary"
            onClick={downloadInvoice}
          >
            Download
          </button> */}
                {/* <button className="btn btn-danger" onClick={sendInvoice}>
            Send
          </button> */}
                <button className="btn btn-success" onClick={saveInvoice}>
                  {editingIndex !== null ? "Update Invoice" : "Save Invoice"}
                </button>
              </div>
            </>
          </div>
        )}

        {/*Invoices list */}
        <div className="mt-5">
          <h4>Invoices List</h4>
          {invoiceList.length === 0 && <p>No invoices yet.</p>}
          {invoiceList.map((inv, idx) => (
            <div key={idx} className="card mb-3 p-3">
              {/* <div className="d-flex justify-content-between align-items-center">
                <strong>{inv.invoiceNumber || "No Number"}</strong>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: inv.currency,
                  }).format(inv.total)}
                </span>
              </div>
              <div>Invoice Date: {inv.invoiceDate}</div>
              <div>Due Date: {inv.dueDate}</div>
              <div>Payment Method: {inv.paymentMethod}</div>
              <div>
                Items: {inv.items.map((item) => item.description).join(", ")}
              </div> */}
              <div
                style={{
                  borderRadius: "8px",
                  padding: "16px",
                  backgroundColor: "#fff",
                  fontFamily: "Arial, sans-serif",
                  // border: "1px solid #ccc",
                  // marginBottom: "16px",
                  // boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                {/* Header: Invoice Number + Total */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // marginBottom: "12px",
                  }}
                >
                  <strong style={{ fontSize: "1.1rem", color: "#551A8B" }}>
                    {inv.invoiceNumber || "No Number"}
                  </strong>
                  <span style={{ fontWeight: "bold", color: "#272D6D" }}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: inv.currency,
                    }).format(inv.total)}
                  </span>
                </div>

                {/* Invoice Info */}
                <div style={{ marginBottom: "6px", color: "#555" }}>
                  <strong>Invoice Date:</strong> {inv.invoiceDate}
                </div>
                <div style={{ marginBottom: "6px", color: "#555" }}>
                  <strong>Due Date:</strong> {inv.dueDate}
                </div>
                <div style={{ marginBottom: "6px", color: "#555" }}>
                  <strong>Payment Method:</strong> {inv.paymentMethod}
                </div>

                {/* Items */}
                <div style={{ marginTop: "8px", color: "#555" }}>
                  <strong>Items:</strong>{" "}
                  {inv.items.map((item) => item.description).join(", ")}
                </div>
              </div>

              {/* Button */}
              <div className="mt-2 d-flex gap-2 justify-content-end">
                <button
                  className="btn btn-sm btn-light border-1 border-primary text-primary"
                  onClick={() => editInvoice(idx)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm border-1 border-danger text-danger"
                  onClick={() => deleteInvoice(idx)}
                >
                  <FaTrash />
                </button>
                <div className="d-flex justify-content-center">
                  <button
                  className="btn btn-light border-1 border-dark"
                    onClick={() => setPreviewData(inv)}
                  >
                    <FaEye />
                  </button>
                </div>
                {/* <button onClick={() => downloadInvoice(inv)}>Download</button> */}
                {/* <button className="btn btn-danger" onClick={sendInvoice}>
                  <FaPaperPlane />
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {previewData && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                maxHeight: "90%",
                overflowY: "auto",
              }}
            >
              <div className="d-flex justify-content-between mb-2">
                <h5>Invoice Preview</h5>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => setPreviewData(null)}
                >
                  Close
                </button>
              </div>

              <InvoiceTemplate data={previewData} />

              <div className="mt-3 text-end">
                <button
                  className="btn btn-primary"
                  onClick={() => downloadInvoice(previewData)}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <Drawer className="" onClick={open}></Drawer> */}
    </div>
  );
}

export default Invoice;
