import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">
          <div className="footer-logo">
            <i className="bi bi-cup-hot"></i>
            <div>
              <h3>COFFEE</h3>
              <h3>SHOP</h3>
            </div>
          </div>

          <p>
            A cozy neighborhood coffee shop
            serving quality coffee, good food,
            and warm smiles.
          </p>

          <div className="footer-socials">
            <i className="bi bi-instagram"></i>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter-x"></i>
            <i className="bi bi-whatsapp"></i>
          </div>
        </div>

        {/* Quick Links */}

        <div className="footer-column">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Information */}

        <div className="footer-column">
          <h4>Information</h4>

          <Link to="/about">About Us</Link>
          <Link to="/menu">Our Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/gallery">Gallery</Link>
        </div>

        {/* Contact */}

        <div className="footer-column">
          <h4>Contact</h4>

          <div className="contact-item">
            <i className="bi bi-geo-alt"></i>

            <span>
              123 Coffee Street,
              <br />
              Lagos, NG
            </span>
          </div>

          <div className="contact-item">
            <i className="bi bi-telephone"></i>

            <span>
              +234 801 234 5678
            </span>
          </div>

          <div className="contact-item">
            <i className="bi bi-envelope"></i>

            <span>
              hello@coffeeshop.com
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}

      <div className="footer-bottom">
        <p>
          © 2024 Coffee Shop. All rights reserved.
        </p>

        <p>
          Concept website for demo purposes.
        </p>
      </div>

    </footer>
  );
}

export default Footer;