import React from "react";

function InvoiceTemplate({ data }) {
  return (
    <div
      style={{
        width: "800px",
        padding: "30px",
        fontFamily: "Arial",
        background: "#fff",
        color: "#333",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ color: "#551A8B", margin: 0 }}>MEET</h2>
          <p style={{ margin: 0 }}>Your Company Pvt Ltd</p>
          <p style={{ fontSize: "12px" }}>GSTIN: 22AAAAA0000A1Z5</p>
        </div>

        <div style={{ textAlign: "right" }}>
          <h3 style={{ margin: 0 }}>INVOICE</h3>
          <p style={{ margin: 0 }}>
            <strong>No:</strong> {data.invoiceNumber}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Date:</strong> {data.invoiceDate}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Due:</strong> {data.dueDate}
          </p>
        </div>
      </div>

      <hr />

      {/* ADDRESS */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h4>Billing Address</h4>
          <p>{data.billingAddress.name}</p>
          <p>{data.billingAddress.address}</p>
          <p>
            {data.billingAddress.countryCode} {data.billingAddress.phone}
          </p>
        </div>

        <div>
          <h4>Shipping Address</h4>
          <p>{data.shippingAddress.name}</p>
          <p>{data.shippingAddress.address}</p>
          <p>
            {data.shippingAddress.countryCode} {data.shippingAddress.phone}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f3f3" }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>QTY</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.items.map((item, i) => (
            <tr key={i}>
              <td style={tdStyle}>{i + 1}</td>
              <td style={tdStyle}>{item.description}</td>
              <td style={tdStyle}>{item.qty}</td>
              <td style={tdStyle}>{item.unitPrice}</td>
              <td style={tdStyle}>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: "300px" }}>
          <div style={rowStyle}>
            <span>Subtotal</span>
            <span>{data.subtotal?.toFixed(2)}</span>
          </div>

          <div style={rowStyle}>
            <span>Tax ({data.taxPercent}%)</span>
            <span>{((data.subtotal * data.taxPercent) / 100).toFixed(2)}</span>
          </div>

          <div style={rowStyle}>
            <span>Discount</span>
            <span>{data.discount}</span>
          </div>

          <div style={{ ...rowStyle, fontWeight: "bold", fontSize: "18px" }}>
            <span>Total</span>
            <span>{data.total}</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "40px", fontSize: "12px", textAlign: "center" }}>
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
};

// styles
const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

export default InvoiceTemplate;
