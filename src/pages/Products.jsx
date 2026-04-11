import React from "react";

function Products() {
  // Example products with reliable images from picsum.photos
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: "$1200",
      description: "High performance laptop for work and gaming.",
      image: "https://picsum.photos/300/200?random=1",
      // badge: "New",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Smartphone",
      price: "$800",
      description: "Latest smartphone model with high-end features.",
      image: "https://picsum.photos/300/200?random=2",
      // badge: "Hot",
      rating: 4,
    },
    {
      id: 3,
      name: "Headphones",
      price: "$150",
      description: "Noise-cancelling over-ear headphones.",
      image: "https://picsum.photos/300/200?random=3",
      // badge: "Sale",
      rating: 4.2,
    },
    {
      id: 4,
      name: "Laptop",
      price: "$250",
      description: "Feature-rich smartwatch with health tracking.",
      image: "https://picsum.photos/300/200?random=4",
      badge: "New",
      rating: 3.8,
    },
    {
      id: 5,
      name: "Camera",
      price: "$600",
      description: "High-quality DSLR camera for photography.",
      image: "https://picsum.photos/300/200?random=5",
      // badge: "Popular",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Tablet",
      price: "$400",
      description: "Lightweight and fast tablet for everyday use.",
      image: "https://picsum.photos/300/200?random=6",
      // badge: "New",
      rating: 4.1,
    },
  ];

  // Function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="container mt-5 m-4">
      <h2 className="mb-4 text-primary">Our Products</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="position-relative">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <span
                  className="badge bg-danger position-absolute top-0 start-0 m-2"
                  style={{ fontSize: "0.8rem" }}
                >
                  {product.badge}
                </span>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="text-success mb-2">{product.price}</h6>
                <p className="card-text">{product.description}</p>
                <div className="mb-2">{renderStars(product.rating)}</div>
                <button className="btn btn-primary mt-auto">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;