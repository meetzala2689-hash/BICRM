import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
);

// Styles object for easy maintenance
const styles = {
  card: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
    transition: "transform 0.2s ease-in-out",
  },
  mainBg: {
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  },
  accent: "#4f46e5", // Modern Indigo
};

function Ecommerce() {
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Mouse", stock: 50, price: 25, sold: 120 },
    { id: 2, name: "Bluetooth Headset", stock: 30, price: 45, sold: 80 },
    { id: 3, name: "Laptop Stand", stock: 20, price: 35, sold: 60 },
  ]);

  const [shoesData] = useState([
    { id: 1, name: "Running Sneakers", category: "Sports", price: 120, stock: 20 },
    { id: 2, name: "Leather Boots", category: "Casual", price: 150, stock: 15 },
    { id: 3, name: "High Heels", category: "Formal", price: 80, stock: 10 },
    { id: 4, name: "Canvas Shoes", category: "Casual", price: 60, stock: 25 },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    sport: "",
    product: "",
  });

  const shoeCategories = ["All", "Sports", "Casual", "Formal"];
  const filteredShoes =
    selectedCategory === "All"
      ? shoesData
      : shoesData.filter((s) => s.category === selectedCategory);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (!formData.name || !formData.email)
      return alert("Required fields missing");
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      stock: 0,
      price: 0,
      sold: 0,
    };
    setProducts([newProduct, ...products]);
    setFormData({ name: "", phone: "", email: "", sport: "", product: "" });
    setShowAddModal(false);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { display: false }, x: { grid: { display: false } } },
  };

  return (
    <div style={styles.mainBg}>
      <div className="p-2">
        {/* TOP NAV */}

        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold tracking-tight text-dark mb-1">
              Analytics Overview
            </h2>
            <p className="text-muted small">Updated 2 minutes ago</p>
          </div>
          <button
            className="btn text-white px-4 py-2 fw-semibold"
            style={{
              borderRadius: "12px",
              background: styles.accent,
              border: "none",
              boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.39)",
            }}
            onClick={() => setShowAddModal(true)}
          >
            <span className="me-2">+</span>New Entry
          </button>
        </div>

        {/* METRICS & CHARTS */}
        <div className="row g-4 mb-5">
          <div className="col-lg-8">
            <div className="p-4" style={styles.card}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold text-uppercase small text-muted letter-spacing-1">
                  Revenue Performance
                </h6>
                <div
                  className="badge bg-success-soft text-success px-3 py-2"
                  style={{ backgroundColor: "#dcfce7" }}
                >
                  +12.5%
                </div>
              </div>
              <div style={{ height: "280px" }}>
                <Bar
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        data: [45, 52, 38, 65, 48, 70],
                        backgroundColor: styles.accent,
                        borderRadius: 10,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="p-4" style={styles.card}>
              <h6 className="fw-bold text-uppercase small text-muted mb-4">
                Market Share
              </h6>
              <div style={{ height: "280px" }}>
                <Pie
                  data={{
                    labels: ["Direct", "Social", "Referral"],
                    datasets: [
                      {
                        data: [55, 25, 20],
                        backgroundColor: [styles.accent, "#818cf8", "#c7d2fe"],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    ...chartOptions,
                    plugins: { legend: { display: true, position: "bottom" } },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="p-4" style={styles.card}>
              <h5 className="fw-bold mb-4">Recent Products</h5>

              {/* Scrollable table using Bootstrap only */}
              <div className="table-responsive overflow-auto" style={{ maxHeight: "300px" }}>
                <table className="table table-borderless align-middle mb-0">
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-bottom-faint">
                        <td className="ps-0 py-3">
                          <div className="d-flex align-items-center">
                            <div
                              className="me-3"
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: "#f1f5f9",
                                display: "grid",
                                placeItems: "center",
                              }}
                            >
                              📦
                            </div>
                            <span className="fw-semibold text-dark">{p.name}</span>
                          </div>
                        </td>
                        <td className="text-end text-muted fw-medium">${p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4" style={styles.card}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0">Inventory</h5>
                <select
                  className="form-select w-auto border-0 bg-light rounded-pill px-3"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {shoeCategories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="table-responsive">
                <table className="table table-borderless align-middle">
                  <tbody>
                    {filteredShoes.map((s) => (
                      <tr key={s.id} className="border-bottom-faint">
                        <td className="ps-0 py-3 fw-semibold">{s.name}</td>
                        <td className="text-end">
                          <span
                            className="badge rounded-pill px-3"
                            style={{
                              background: "#e0e7ff",
                              color: styles.accent,
                            }}
                          >
                            {s.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* DATA TABLE SECTION */}
        <div className="p-0 border-0 overflow-hidden" style={styles.card}>
          <div className="px-4 py-3 bg-white border-bottom">
            <h6 className="m-0 fw-bold">Global Operations</h6>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="small text-uppercase text-muted letter-spacing-1">
                  <th className="px-4 py-3 border-0">Name</th>
                  <th className="border-0">Location</th>
                  <th className="border-0 text-end px-4">Net Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "Alice", c: "New York", p: "$24,000", img: "https://i.pravatar.cc/150?u=1" },
                  { n: "Bob", c: "Los Angeles", p: "$12,400", img: "https://i.pravatar.cc/150?u=2" },
                  { n: "Charlie", c: "Chicago", p: "$150,000", img: "https://i.pravatar.cc/150?u=3" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center">
                        <img
                          src={row.img}
                          alt=""
                          className="rounded-circle me-3"
                          width="32"
                          height="32"
                        />
                        <span className="fw-bold">{row.n}</span>
                      </div>
                    </td>
                    <td className="text-muted">{row.c}</td>
                    <td className="text-end px-4 fw-bold text-dark">{row.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODERN MODAL */}
        {showAddModal && (
          <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}
            onClick={() => setShowAddModal(false)}
          >
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content border-0 p-4" style={{ borderRadius: "24px" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold m-0">Add New Product</h4>
                  <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">Product Name</label>
                  <input
                    name="name"
                    className="form-control border-0 bg-light py-2 px-3"
                    style={{ borderRadius: "10px" }}
                    placeholder="Enter name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold">Email Contact</label>
                  <input
                    name="email"
                    className="form-control border-0 bg-light py-2 px-3"
                    style={{ borderRadius: "10px" }}
                    placeholder="email@domain.com"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="btn w-100 py-3 fw-bold text-white shadow-sm"
                  style={{ background: styles.accent, borderRadius: "12px", border: "none" }}
                  onClick={handleAdd}
                >
                  Confirm and Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .border-bottom-faint { border-bottom: 1px solid #f1f5f9; }
        .letter-spacing-1 { letter-spacing: 0.05rem; }
        .tracking-tight { letter-spacing: -0.025rem; }
        .table-hover tbody tr:hover { background-color: #f8fafc; transition: 0.2s; }
      `}</style>
    </div>
  );
}

export default Ecommerce;
