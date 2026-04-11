import React, { useEffect, useState } from "react";

function ComingSoon() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-04-29T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { completed: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      completed: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format numbers with leading zeros
  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        color: "#1e293b",
      }}
    >
      <div className="flex-grow-1 p-0 p-lg-2">
        <div className="card border-0">
          <div className="card-body min-vh-100 d-flex flex-column justify-content-center">
            <div className="mt-auto text-center">
              <h3 className="fw-bold my-2">
                <i className="bi bi-hourglass-split me-2"></i>{" "}
                {timeLeft.completed
                  ? "We’re Live!"
                  : "Something Exciting is Coming"}
              </h3>
              {!timeLeft.completed && (
                <p className="text-muted mb-0">
                  We’re working hard to bring you something amazing. Stay tuned!
                </p>
              )}

              {!timeLeft.completed && (
                <div className="row text-center justify-content-center my-4 g-2">
                  {["days", "hours", "minutes", "seconds"].map((unit) => (
                    <div key={unit} className="col-6 col-sm-4 col-md-3 col-lg">
                      <div className="bg-light bg-opacity-50 py-3 px-2 rounded">
                        <h2 className="fw-bold text-primary fs-36">
                          <time
                            dateTime={`${timeLeft[unit]} ${unit}`}
                            aria-label={`${timeLeft[unit]} ${unit}`}
                          >
                            {formatNumber(timeLeft[unit])}
                          </time>
                        </h2>
                        <p className="fw-semibold fs-xs mb-0">
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-center text-muted mt-auto mb-0">
              © {new Date().getFullYear()} Paces — by{" "}
              <span className="fw-semibold">Coderthemes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;