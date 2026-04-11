import React, { useState, useEffect } from "react";
import { FaStar, FaTrash, FaEdit } from "react-icons/fa";

function Reviews() {
  // Form states
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("newest");
  const [editId, setEditId] = useState(null);

  // Reviews storage
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  // Add / Update Review
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required");
    if (!comment.trim()) return setError("Review is required");
    if (rating === 0) return setError("Please select a rating");

    if (editId) {
      // Update
      setReviews(
        reviews.map((rev) =>
          rev.id === editId ? { ...rev, name, comment, rating } : rev,
        ),
      );
      setEditId(null);
    } else {
      // Add new
      const newReview = {
        id: Date.now(),
        name,
        comment,
        rating,
        date: new Date().toLocaleDateString(),
        helpful: 0,
        dislike: 0,
      };
      setReviews([newReview, ...reviews]);
    }

    setName("");
    setComment("");
    setRating(0);
    setError("");
  };

  // Delete
  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((rev) => rev.id !== id));
  };

  // Edit
  const handleEdit = (rev) => {
    setName(rev.name);
    setComment(rev.comment);
    setRating(rev.rating);
    setEditId(rev.id);
  };

  // Helpful / Not Helpful
  const handleHelpful = (id) => {
    setReviews(
      reviews.map((rev) =>
        rev.id === id ? { ...rev, helpful: rev.helpful + 1 } : rev,
      ),
    );
  };

  const handleDislike = (id) => {
    setReviews(
      reviews.map((rev) =>
        rev.id === id ? { ...rev, dislike: rev.dislike + 1 } : rev,
      ),
    );
  };

  // Average rating
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  // Sorting
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "highest") return b.rating - a.rating;
    if (sort === "lowest") return a.rating - b.rating;
    return b.id - a.id; // newest
  });

  // Pagination
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage,
  );

  // Reset page on sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  return (
    <div className="bg-light">
      <div className="flex-grow-1 p-0 p-lg-2">
        <h1 className="mb-4 text-primary">Reviews</h1>

        {/* FORM */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5>{editId ? "Edit Review" : "Add a Review"}</h5>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleAddReview}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Review</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* Stars */}
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={24}
                      style={{ cursor: "pointer" }}
                      color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    />
                  ))}
                </div>
              </div>

              <button className="btn btn-success">
                {editId ? "Update Review" : "Submit Review"}
              </button>
            </form>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h5>
            ⭐ {avgRating} / 5 ({reviews.length} reviews)
          </h5>
          <select
            className="form-select w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>

        {/* REVIEWS */}
        <div className="row">
          {sortedReviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            paginatedReviews.map((rev) => (
              <div key={rev.id} className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm border-0 hover-shadow">
                  <div className="card-body">
                    {/* Header */}
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="badge bg-primary me-2">
                          {rev.name}
                        </span>
                        <small className="text-muted">{rev.date}</small>
                      </div>
                      <div>
                        <FaEdit
                          className="text-primary me-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(rev)}
                        />
                        <FaTrash
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteReview(rev.id)}
                        />
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="mt-3">{rev.comment}</p>

                    {/* Stars */}
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={18}
                          color={star <= rev.rating ? "#ffc107" : "#e4e5e9"}
                        />
                      ))}
                    </div>

                    {/* Helpful / Not Helpful */}
                    <button
                      className="btn btn-sm btn-outline-secondary mt-2"
                      onClick={() => handleHelpful(rev.id)}
                    >
                      👍 Helpful ({rev.helpful})
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary mt-2 ms-2"
                      onClick={() => handleDislike(rev.id)}
                    >
                      👎 Not Helpful ({rev.dislike})
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-end align-items-center gap-1 mt-3">
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              « Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${
                  currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-sm btn-outline-primary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next »
            </button>
          </div>
        )}

        {/* CSS */}
        <style>{`
          .hover-shadow:hover {
            transform: translateY(-4px);
            transition: 0.2s ease;
            box-shadow: 0 6px 16px rgba(0,0,0,0.1);
          }
        `}</style>
      </div>
    </div>
  );
}

export default Reviews;