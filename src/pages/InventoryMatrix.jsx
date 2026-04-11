import React, { useEffect, useState } from 'react';

function InventoryMatrix() {
    // const floors = [1, 2, 3, 4, 5];
    const floors = [5, 4, 3, 2, 1];

    // Helper to simulate status based on unit ID
    const getUnitStatus = (unitId) => {
        if (unitId % 3 === 0) return 'sold';
        if (unitId % 2 === 1) return 'booked';
        if (unitId % 5 === 0) return 'hold';
        return 'available';
    };
    const [project, setProject] = useState('');
    const [assetType, setAssetType] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const getStatusStyle = (status) => {
        switch (status) {
            case 'sold': return 'bg-danger text-white border-danger';
            case 'booked': return 'bg-primary text-white border-primary';
            case 'hold': return 'bg-warning text-dark border-warning';
            default: return 'bg-white text-dark border-light-subtle shadow-sm hover-border-primary';
        }
    };
    useEffect(() => {
        filter();
    }, [project, assetType]);

    const resetFilter = () => {
        setProject('');
        setAssetType('');
        setFilteredData(data);
    };
    const filter = () => {
        let result = data;

        if (project) {
            result = result.filter(item => item.project === project);
        }

        if (assetType) {
            result = result.filter(item => item.assetType === assetType);
        }

        setFilteredData(result);
    };
    return (
        <div className="container-fluid py-4 bg-light min-vh-100">
            {/* Header & Filters Card */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                        <div>
                            <h4 className="fw-bold mb-0 text-dark">Inventory Matrix</h4>
                            <p className="text-muted small mb-0">Floor-wise unit availability</p>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary rounded-pill px-4 btn-sm">
                                <i className="bi bi-printer me-2"></i>Print
                            </button>
                            <button className="btn btn-primary rounded-pill px-4 btn-sm shadow-sm">
                                <i className="bi bi-download me-2"></i>Export Report
                            </button>
                        </div>
                    </div>

                    {/* Filter Row */}
                    <div className="row g-3 align-items-end border-bottom pb-4 mb-4">

                        {/* Project */}
                        <div className="col-lg-3 col-md-6">
                            <label className="form-label small fw-bold text-secondary text-uppercase mb-1">
                                <i className="bi bi-building me-2"></i>Project
                            </label>
                            <select
                                className="form-select py-2 shadow-sm"
                                value={project}
                                onChange={(e) => setProject(e.target.value)}
                            >
                                <option value="">All Projects</option>
                                <option value="Rivera Elegance">Rivera Elegance</option>
                                <option value="Satyamev high Sky">Satyamev high Sky</option>
                            </select>
                        </div>

                        {/* Asset Type */}
                        <div className="col-lg-3 col-md-6">
                            <label className="form-label small fw-bold text-secondary text-uppercase mb-1">
                                <i className="bi bi-house-gear me-2"></i>Asset Type
                            </label>
                            <select
                                className="form-select py-2 shadow-sm"
                                value={assetType}
                                onChange={(e) => setAssetType(e.target.value)}
                            >
                                <option value="">All Types</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="Plot">Plot</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="col-lg-3 col-md-6 d-flex gap-2">
                            <button
                                onClick={filter}
                                className="btn btn-dark w-100 py-2 fw-bold shadow-sm"
                            >
                                <i className="bi bi-funnel me-1"></i> Apply
                            </button>

                            <button
                                onClick={resetFilter}
                                className="btn btn-light border px-3"
                            >
                                <i className="bi bi-arrow-counterclockwise"></i>
                            </button>
                        </div>

                        {/* Legend */}
                        <div className="col-lg-3 col-md-6">
                            <div className="bg-white border-0 rounded-3 gap-2  d-flex text-center overflow-hidden">
                                {['Available', 'Booked', 'Sold', 'Hold'].map((label, index) => (
                                    <div key={label} className="flex-fill">
                                        <div
                                            className={getStatusStyle(label.toLowerCase())}
                                            style={{
                                                fontSize: '10px',
                                                fontWeight: '700',
                                                padding: '10px 0',
                                                borderRadius: '20px',
                                                gap: '10px',
                                                borderRight: index !== 3 ? '1px solid #eee' : 'none'
                                            }}
                                        >
                                            {label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    {/* Matrix Grid */}
                    <div className="mt-2">
                        {floors.map(floor => (
                            <div className="row mb-4 align-items-center g-0" key={floor}>
                                {/* Floor Label Side */}
                                <div className="col-md-2">
                                    <div className="d-flex align-items-center">
                                        <span className="badge bg-dark rounded-pill px-3 py-2 me-2">{floor}th Floor</span>
                                    </div>
                                </div>

                                {/* Units Container */}
                                <div className="col-md-10">

                                    {/* <div className='col-md-12'> */}
                                    <div className="d-flex flex-wrap gap-2">
                                        {Array.from({ length: 12 }, (_, i) => (floor * 100) + (i + 1)).map((unitId) => {
                                            const status = getUnitStatus(unitId);
                                            return (
                                                <div
                                                    key={unitId}
                                                    className={`unit-box d-flex flex-column  align-items-center justify-content-center fw-bold rounded-3 border-2 transition-all ${getStatusStyle(status)}`}
                                                    title={`Unit ${unitId} - ${status}`}
                                                    style={{
                                                        width: '60px',
                                                        height: '50px',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {/* Unit Number */}
                                                    <span className="fs-5 mb-2" style={{ lineHeight: '1.2' }}>
                                                        {unitId}
                                                    </span>

                                                    {/* Status Label - Styled as a subtle footer inside the box */}
                                                    <div
                                                        className="w-100 position-absolute bottom-0 text-center py-1"
                                                        style={{
                                                            fontSize: '0.50rem',
                                                            // backgroundColor: 'rgba(0,0,0,0.08)', 
                                                            letterSpacing: '0.5px',
                                                            fontWeight: '600',
                                                            textTransform: 'uppercase'
                                                        }}
                                                    >
                                                        {status}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>
                {`
                    .unit-box {
                        width: 55px;
                        height: 55px;
                        font-size: 0.9rem;
                        cursor: pointer;
                        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .unit-box:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                        filter: brightness(0.95);
                        z-index: 2;
                    }
                    .hover-border-primary:hover {
                        border-color: #0d6efd !important;
                    }
                    .bg-light {
                        background-color: #f8f9fa !important;
                    }
                `}
            </style>
        </div>
    );
};

export default InventoryMatrix;