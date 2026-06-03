import { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/messageLoader.css";

function Contact() {

    const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const [responseMessage, setResponseMessage] = useState("");

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
    setResponseMessage("");

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/contact`,
      formData
    );

    toast.success("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to send message."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
        <section className="contact-page">
        <div className="contact-overlay"></div>

        <div className="contact-container">

            {/* LEFT */}

            <div className="contact-left mt-4">

            <p className="small-heading">
                GET IN TOUCH
            </p>

            <h1>
                We'd Love to
                <br />
                Hear From <span>You</span>
            </h1>

            <div className="heading-line"></div>

            <p className="contact-desc">
                Have a question, feedback, or just
                want to say hello?
                We'd love to hear from you.
            </p>

            <div className="contact-info">

                <div className="info-item">
                <div className="icon-circle">
                    <i className="bi bi-geo-alt"></i>
                </div>

                <div>
                    <h4>Visit Us</h4>
                    <p>
                    123 Coffee Street, Brewville
                    <br />
                    CA 90210, USA
                    </p>
                </div>
                </div>

                <div className="info-item">
                <div className="icon-circle">
                    <i className="bi bi-telephone"></i>
                </div>

                <div>
                    <h4>Call Us</h4>
                    <p>+1 (555) 123-4567</p>
                </div>
                </div>

                <div className="info-item">
                <div className="icon-circle">
                    <i className="bi bi-envelope"></i>
                </div>

                <div>
                    <h4>Email Us</h4>
                    <p>hello@cafeflow.com</p>
                </div>
                </div>

                <div className="info-item">
                <div className="icon-circle">
                    <i className="bi bi-clock"></i>
                </div>

                <div>
                    <h4>Opening Hours</h4>
                    <p>
                    Mon - Fri: 7AM - 10PM
                    <br />
                    Sat - Sun: 8AM - 11PM
                    </p>
                </div>
                </div>

            </div>

            <div className="social-links">
                <i className="bi bi-instagram"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-whatsapp"></i>
            </div>

            </div>

            {/* RIGHT */}

            <div className="contact-right">

            <div className="contact-form-card">

                <div className="form-header">
                <div className="icon-circle">
                    <i className="bi bi-envelope"></i>
                </div>

                <div>
                    <h3>Send Us a Message</h3>

                    <p>
                    We'll get back to you as soon as possible.
                    </p>
                </div>
                </div>

                <form onSubmit={handleSubmit}>

                <div className="form-row">
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    />

                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    />
                </div>

                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                />

                <textarea
                    rows="6"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                ></textarea>

                <button
                type="submit"
                disabled={loading}
                >
                {loading ? <div className="loader"></div> : "Send Message"}

                {!loading && (
                    <i className="bi bi-send"></i>
                )}
                </button>

                </form>

            </div>

            {/* Newsletter */}

            <div className="newsletter-card">

                <i className="bi bi-cup-hot"></i>

                <div style={{color:'black'}}>
                <h4>Love our coffee?</h4>

                <p style={{color:'rgba(37,20,11,.85)'}}>
                    Follow us on social media for updates,
                    special offers, and more!
                </p>
                </div>

            </div>

            </div>

        </div>
        </section>
    </div>
  );
}

export default Contact;