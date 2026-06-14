import { useState } from "react";
import "../styles/reservations.css";
import "../styles/messageLoader.css";
import "../styles/navbar.css";
import Footer from "../components/Footer";
import axios from "axios";
import api from "../api/api";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";


function Reservations() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    specialRequest: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setMessage("");

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/reservations`,
      formData
    );

    toast.success("Reservation request sent successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      partySize: "",
      specialRequest: "",
    });

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to send reservation."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <Navbar />
      <section className="reservation-section">
        {/* HERO */}
        <div className="reservation-hero">
          <div className="reservation-overlay"></div>

          <div className="reservation-hero-content">
            <h1>Reserve a Table</h1>
            <p>We'll save you a seat.</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="reservation-container">
          {/* FORM */}
          <div className="reservation-form">
            <h2>Reservation Form</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="080 1234 5678"
                  required
                />
              </div>

              <div className="date-time">
                <div className="input-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                   />
                </div>

                <div className="input-group">
                  <label>Time</label>
                  <input 
                  type="time" 
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Party Size</label>

                <select
                  name="partySize"
                  value={formData.partySize}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select size
                  </option>

                  <option value="1 Person">
                    1 Person
                  </option>

                  <option value="2 People">
                    2 People
                  </option>

                  <option value="3 People">
                    3 People
                  </option>

                  <option value="4+ People">
                    4+ People
                  </option>
                </select>
              </div>

              <div className="input-group">
                <label>Special Request (Optional)</label>

                <textarea 
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                placeholder="Any special request?" 
                />
              </div>

              <button
                className="submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? <div className="loader"></div>
                  : "Send Reservation"}
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="contact-info">
            <h2>Contact Information</h2>

            <div className="contact-item">
              <i className="bi bi-geo-alt"></i>

              <div>
                <h4>Address</h4>

                <p>
                  123 Coffee Street,
                  <br />
                  Lagos, NG
                </p>

                <span>View on Maps</span>
              </div>
            </div>

            <div className="contact-item">
              <i className="bi bi-telephone"></i>

              <div>
                <h4>Phone</h4>
                <p>+234 801 234 5678</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="bi bi-envelope"></i>

              <div>
                <h4>Email</h4>
                <p>hello@coffeeshop.com</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="bi bi-clock"></i>

              <div>
                <h4>Hours</h4>

                <p>
                  Mon - Fri: 7:00 AM - 9:00 PM
                </p>

                <p>
                  Sat - Sun: 8:00 AM - 10:00 PM
                </p>
              </div>
            </div>

            {/* MAP */}
            <div className="map-container">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126871.74345125018!2d3.294573743359371!3d6.601838500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b91bde2b8f0cf%3A0x47e98d5933170fb7!2sCoffee%20Shop!5e0!3m2!1sen!2sng!4v1726675321260!5m2!1sen!2sng"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="reservation-features">
          <div className="feature-card">
            <i className="bi bi-calendar-check"></i>

            <div>
              <h4>Reservations Recommended</h4>

              <p>
                Walk-ins welcome based on
                availability.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <i className="bi bi-people"></i>

            <div>
              <h4>Group Bookings</h4>

              <p>
                For groups of 8 or more,
                please call us directly.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <i className="bi bi-patch-check"></i>

            <div>
              <h4>We'll Confirm</h4>

              <p>
                You'll receive a confirmation
                via text or email.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Reservations;