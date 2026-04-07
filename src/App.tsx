import { FormEvent, useEffect, useMemo, useState } from "react";
import jeepImage from "./assets/images/jeep.png";
import mclarenImage from "./assets/images/mclaren-orange.png";
import porscheImage from "./assets/images/porche.png";
import "./App.css";

type CarType = "SUV" | "Sports" | "Sedan";

interface Car {
  id: string;
  name: string;
  type: CarType;
  seats: number;
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Hybrid" | "Electric";
  pricePerDay: number;
  image: string;
  rating: number;
}

const CARS: Car[] = [
  {
    id: "jeep-elite",
    name: "Jeep Grand Elite",
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    pricePerDay: 118,
    image: jeepImage,
    rating: 4.8,
  },
  {
    id: "mclaren-gt",
    name: "McLaren GT Orange",
    type: "Sports",
    seats: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    pricePerDay: 299,
    image: mclarenImage,
    rating: 4.9,
  },
  {
    id: "porsche-s",
    name: "Porsche 911 S",
    type: "Sedan",
    seats: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    pricePerDay: 245,
    image: porscheImage,
    rating: 4.7,
  },
];

const LOCATIONS = ["New York", "Los Angeles", "Miami", "Dallas", "Seattle"];

const NAV_ITEMS = [
  { label: "Fleet", href: "#fleet", id: "fleet" },
  { label: "Booking", href: "#booking", id: "booking" },
  { label: "How it works", href: "#how-it-works", id: "how-it-works" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const FAQS = [
  {
    question: "What documents do I need to rent a car?",
    answer: "A valid driver's license, a payment card, and a government-issued photo ID are required.",
  },
  {
    question: "Can I cancel or change my booking?",
    answer: "Yes. You can modify or cancel up to 24 hours before pickup for free.",
  },
  {
    question: "Is insurance included?",
    answer: "Basic coverage is included. You can add premium protection during checkout.",
  },
];

function getRentalDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  if (Number.isNaN(diffMs) || diffMs < 0) return 0;
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

function App() {
  const today = new Date().toISOString().split("T")[0];
  const [pickup, setPickup] = useState(LOCATIONS[0]);
  const [dropoff, setDropoff] = useState(LOCATIONS[1]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [carType, setCarType] = useState<"Any" | CarType>("Any");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(CARS[0].id);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [needInsurance, setNeedInsurance] = useState(true);
  const [needGps, setNeedGps] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("fleet");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      }
    );

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const filteredCars = useMemo(() => {
    return CARS.filter((car) => {
      const typeMatch = carType === "Any" || car.type === carType;
      const textMatch =
        searchTerm.trim().length === 0 ||
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.type.toLowerCase().includes(searchTerm.toLowerCase());
      return typeMatch && textMatch;
    });
  }, [carType, searchTerm]);

  const selectedCar = CARS.find((car) => car.id === selectedCarId) ?? CARS[0];
  const days = getRentalDays(startDate, endDate);

  const total =
    selectedCar.pricePerDay * days +
    (needInsurance ? 25 * days : 0) +
    (needGps ? 9 * days : 0);

  const canSubmit =
    fullName.trim().length > 1 &&
    email.trim().length > 4 &&
    phone.trim().length >= 7 &&
    days > 0 &&
    pickup !== dropoff;

  function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingError(null);
    setBookingSuccess(null);

    if (!fullName || !email || !phone) {
      setBookingError("Please complete your contact details before checkout.");
      return;
    }

    if (!startDate || !endDate || days <= 0) {
      setBookingError("Please choose valid pickup and drop-off dates.");
      return;
    }

    if (pickup === dropoff) {
      setBookingError("Pickup and drop-off locations cannot be the same.");
      return;
    }

    const ref = `CR-${Date.now().toString().slice(-6)}`;
    setBookingSuccess(ref);
  }

  return (
    <div className="site-shell">
      <header className="top-nav">
        <div className="brand-wrap">
          <span className="brand-dot" />
          <div>
            <div className="brand">Carental</div>
            <p className="brand-sub">Luxury Mobility</p>
          </div>
        </div>
        <button
          type="button"
          className={mobileNavOpen ? "nav-toggle open" : "nav-toggle"}
          aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
          <span className="visually-hidden">Menu</span>
        </button>
        <nav className={mobileNavOpen ? "open" : ""}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={activeSection === item.id ? "active" : ""}
              onClick={() => setMobileNavOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Premium self-drive rentals</p>
          <h1>Book your next car in under 60 seconds.</h1>
          <p>
            Search real-time availability, compare transparent pricing, and reserve instantly with free cancellation.
          </p>
          <a href="#booking" className="hero-cta">
            Start Booking
          </a>
        </div>
        <div className="hero-panel">
          <h2>Quick Search</h2>
          <div className="grid-two">
            <label>
              Pickup
              <select value={pickup} onChange={(event) => setPickup(event.target.value)}>
                {LOCATIONS.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </label>
            <label>
              Drop-off
              <select value={dropoff} onChange={(event) => setDropoff(event.target.value)}>
                {LOCATIONS.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </label>
            <label>
              Start date
              <input
                type="date"
                min={today}
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </label>
            <label>
              End date
              <input
                type="date"
                min={startDate || today}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </label>
          </div>
        </div>
      </section>

      <section id="fleet" className="section">
        <div className="section-head">
          <h2>Available Fleet</h2>
          <div className="filters">
            <input
              type="text"
              placeholder="Search by model or type"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <select value={carType} onChange={(event) => setCarType(event.target.value as "Any" | CarType)}>
              <option value="Any">All types</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Sedan">Sedan</option>
            </select>
          </div>
        </div>

        <div className="car-grid">
          {filteredCars.map((car) => (
            <article key={car.id} className="car-card">
              <img src={car.image} alt={car.name} />
              <div className="car-card-body">
                <div className="car-title-row">
                  <h3>{car.name}</h3>
                  <span className="rating">{car.rating.toFixed(1)}</span>
                </div>
                <p>
                  {car.type} · {car.seats} seats · {car.transmission} · {car.fuel}
                </p>
                <div className="price-row">
                  <strong>${car.pricePerDay}/day</strong>
                  <button
                    type="button"
                    className={selectedCarId === car.id ? "selected" : ""}
                    onClick={() => {
                      setSelectedCarId(car.id);
                      setBookingSuccess(null);
                    }}
                  >
                    {selectedCarId === car.id ? "Selected" : "Select Car"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredCars.length === 0 && (
          <p className="empty-state">No cars match your filters. Try changing search or car type.</p>
        )}
      </section>

      <section id="booking" className="section booking-wrap">
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <p className="selected-car">{selectedCar.name}</p>
          <p>
            {pickup} to {dropoff}
          </p>
          <p>Duration: {days || 0} day(s)</p>
          <ul>
            <li>Car: ${selectedCar.pricePerDay * days}</li>
            <li>Insurance: ${needInsurance ? 25 * days : 0}</li>
            <li>GPS: ${needGps ? 9 * days : 0}</li>
          </ul>
          <h3>Total: ${total}</h3>
        </div>

        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <h2>Complete Reservation</h2>
          <div className="grid-two">
            <label>
              Full name
              <input
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                required
                autoComplete="tel"
                pattern="[0-9+()\-\s]{7,}"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
          </div>

          <div className="check-row">
            <label>
              <input
                type="checkbox"
                checked={needInsurance}
                onChange={(event) => setNeedInsurance(event.target.checked)}
              />
              Add premium insurance (+$25/day)
            </label>
            <label>
              <input type="checkbox" checked={needGps} onChange={(event) => setNeedGps(event.target.checked)} />
              Add GPS navigation (+$9/day)
            </label>
          </div>

          <button type="submit" className="book-button" disabled={!canSubmit}>
            Confirm Booking
          </button>

          {bookingError && <p className="error-text" role="alert">{bookingError}</p>}
          {bookingSuccess && (
            <p className="success-text" aria-live="polite">Booking confirmed. Your reference is {bookingSuccess}.</p>
          )}
        </form>
      </section>

      <section id="how-it-works" className="section">
        <div className="section-header-fancy">
          <p>Simple process</p>
          <h2>How It Works</h2>
        </div>
        <div className="steps steps-fancy">
          <article>
            <span className="step-badge">01</span>
            <h3>Search</h3>
            <p>Set pickup, drop-off, and dates to find available cars instantly.</p>
          </article>
          <article>
            <span className="step-badge">02</span>
            <h3>Choose</h3>
            <p>Compare specifications and pricing, then select your best-fit vehicle.</p>
          </article>
          <article>
            <span className="step-badge">03</span>
            <h3>Reserve</h3>
            <p>Complete checkout and receive your instant booking reference.</p>
          </article>
        </div>
      </section>

      <section className="section testimonials">
        <div className="section-header-fancy">
          <p>Trusted by drivers</p>
          <h2>What Customers Say</h2>
        </div>
        <div className="steps quote-grid">
          <article>
            <p className="quote-mark">"</p>
            <p>"Smooth process, spotless car, and zero hidden fees."</p>
            <h3>Alex P.</h3>
          </article>
          <article>
            <p className="quote-mark">"</p>
            <p>"Booked in 2 minutes and picked up right on time."</p>
            <h3>Nina R.</h3>
          </article>
          <article>
            <p className="quote-mark">"</p>
            <p>"Best rental UI I have used. Everything is clear and fast."</p>
            <h3>Jordan M.</h3>
          </article>
        </div>
      </section>

      <section className="section faq">
        <div className="section-header-fancy">
          <p>Need help?</p>
          <h2>Frequently Asked Questions</h2>
        </div>
        {FAQS.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>

      <footer id="contact" className="footer">
        <div>
          <h3>Carental</h3>
          <p>support@carental.example</p>
          <p>+1 (800) 555-0147</p>
        </div>
        <div>
          <h3>Service Hours</h3>
          <p>Mon-Sat: 7:00 AM - 10:00 PM</p>
          <p>Sunday: 8:00 AM - 8:00 PM</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
