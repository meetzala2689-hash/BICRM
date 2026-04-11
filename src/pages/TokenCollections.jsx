import React, { useState } from 'react';

const TokenCollections = () => {
    // Mock data for tokens
    const tokens = [
        { name: "Ethereum", symbol: "ETH", balance: "1.45", value: "$3,200", trend: "+2.4%", icon: "bi-currency-ethereum", color: "primary" },
        { name: "Bitcoin", symbol: "BTC", balance: "0.02", value: "$1,100", trend: "+1.2%", icon: "bi-currency-bitcoin", color: "warning" },
        { name: "Cardano", symbol: "ADA", balance: "450", value: "$210", trend: "-0.5%", icon: "bi-coin", color: "info" },
        { name: "Solana", symbol: "SOL", balance: "12.5", value: "$1,800", trend: "+5.8%", icon: "bi-lightning-charge", color: "secondary" },
    ];

    const [newTokenModal, setNewTokenModal] = useState(false);
    return (
        <div className="container-fluid py-4">
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="fw-bold text-dark mb-1">Token Collections</h2>
                    <p className="text-muted small mb-0">Manage and track your digital asset performance.</p>
                </div>
                <button className="btn btn-primary btn-sm rounded-pill px-4 shadow-sm fw-bold">
                    <i className="bi bi-plus-lg me-2" onClick={() => setNewTokenModal(true)}></i>Add Token
                </button>
            </div>

            <div className="row g-4">
                {tokens.map((token, index) => (
                    <div className="col-12 col-sm-6 col-lg-3" key={index}>
                        <div
                            className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative token-card"
                            style={{ transition: 'all 0.3s ease', cursor: 'pointer', background: '#fff' }}
                        >
                            {/* Subtle background glow */}
                            <div className={`position-absolute top-0 end-0 p-4 opacity-10 text-${token.color}`}>
                                <i className={`bi ${token.icon}`} style={{ fontSize: '5rem', transform: 'translate(20%, -20%)' }}></i>
                            </div>

                            <div className="card-body p-4 position-relative" style={{ zIndex: 1 }}>
                                <div className="d-flex align-items-center mb-4 ">
                                    <div className={`bg-${token.color}-subtle text-${token.color} rounded-3 p-2 me-3 d-flex align-items-center justify-content-center`} style={{ width: '45px', height: '45px' }}>
                                        <i className={`bi ${token.icon} fs-4`}></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold">{token.name}</h6>
                                        <small className="text-muted">{token.symbol}</small>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <span className="text-muted small d-block mb-1 text-uppercase fw-semibold" style={{ letterSpacing: '1px' }}>Available Balance</span>
                                    <h4 className="fw-bold mb-0">{token.balance} <span className="fs-6 fw-normal text-muted">{token.symbol}</span></h4>
                                </div>

                                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                    <div>
                                        <span className="fw-bold text-dark">{token.value}</span>
                                    </div>
                                    <div className={`badge rounded-pill ${token.trend.startsWith('+') ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                        {token.trend}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Unique Styling Tag */}
            <style>{`
        .token-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
        }
        .bg-primary-subtle { background-color: #e7f0ff !important; }
        .bg-warning-subtle { background-color: #fff8e6 !important; }
        .bg-info-subtle { background-color: #e6f7ff !important; }
        .bg-secondary-subtle { background-color: #f4f4f4 !important; }
        .bg-success-subtle { background-color: #dcfce7 !important; }
        .bg-danger-subtle { background-color: #fee2e2 !important; }
      `}</style>
            {newTokenModal &&
                <div>

                </div>
            }
        </div>
    );
};

export default TokenCollections;