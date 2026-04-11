import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const cardData = [
  {
    id: 1,
    name: 'SBI Cashback Credit Card',
    category: 'Online Shopping',
    cashback: '5% on online, 1% others',
    notes: 'Good if you shop on Amazon/Flipkart regularly',
    rating: 5,
    link: 'https://www.creditlogic.in/2025/11/best-cashback-credit-cards-in-india.html?utm_source=chatgpt.com',
    icon: 'bi-cart4',
    color: 'success',
  },
  {
    id: 2,
    name: 'Amazon Pay ICICI Credit Card',
    category: 'Amazon Users',
    cashback: '5% Prime, 3% non-Prime',
    notes: 'Lifetime free, best for frequent Amazon orders',
    rating: 4,
    link: 'https://www.creditlogic.in/2025/11/best-cashback-credit-cards-in-india.html?utm_source=chatgpt.com',
    icon: 'bi-bag-check',
    color: 'warning',
  },
  {
    id: 3,
    name: 'HDFC Millennia Credit Card',
    category: 'Beginners / Salary People',
    cashback: '5% on Amazon/Flipkart/Swiggy, 1% others',
    notes: 'Good mix of cashback + offers',
    rating: 3,
    link: 'https://www.etnownews.com/about/credit-cards/best-cashback-credit-cards-in-india?utm_source=chatgpt.com',
    icon: 'bi-person-badge',
    color: 'primary',
  },
];

function BankCardSuggestions() {
  return (
    <div className="bg-light mt-2">
      <div className="p-0">
        <h1 className="mb-5 text-center">💳 Best Bank Credit Cards (2026)</h1>
        <div className="row g-4 mb-5">
          {cardData.map(card => (
            <div key={card.id} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-body d-flex flex-column hover-lift">
                  <div className="mb-2 d-flex align-items-center">
                    <i className={`bi ${card.icon} fs-2 text-${card.color} me-2`}></i>
                    <span className={`badge bg-${card.color}`}>{card.category}</span>
                  </div>
                  <h5 className="card-title">{card.name}</h5>
                  <p><strong>Cashback:</strong> {card.cashback} 💰</p>
                  <p>{card.notes}</p>
                  <div className="mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star${i < card.rating ? '-fill text-warning' : ''}`}
                      ></i>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary w-100"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BankCardSuggestions;