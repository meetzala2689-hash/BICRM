import React, { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Dashboard Tips for Beginners",
    author: "Amit",
    date: "27-03-2026",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum doloremque, laboriosam... (post contents)",
  },
  {
    id: 2,
    title: "Firebase Real-time Guide",
    author: "Priya",
    date: "26-03-2026",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt veritatis doloremque...",
  },
  {
    id: 3,
    title: "MySQL Queries Simplified",
    author: "Ravi",
    date: "25-03-2026",
    content:
      "MySQL me data fetch aur display karne ka easiest tarika, beginners ke liye...",
  },
];

const BlogDashboard = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Blog Dashboard</h2>

      {/* Blog Cards Grid */}
      <div className="row g-4 mb-5">
        {blogPosts.map((post) => (
          <div className="col-md-6 col-lg-4" key={post.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">{post.title}</h4>
                <h6 className="card-subtitle mb-2 text-muted">
                  {post.author} | {post.date}
                </h6>
                <p className="card-text flex-grow-1">
                  {post.content.split(" ").slice(0, 40).join(" ")}...
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => setSelectedPost(post)}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full Post */}
      {selectedPost && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedPost.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedPost(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{selectedPost.content}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedPost(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;