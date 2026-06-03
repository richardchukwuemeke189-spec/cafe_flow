import "../styles/about.css";
import aboutData from "../data/about";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function About() {
  return (
    <div>
        <section className="about-section" style={{marginBottom:'140px'}}>
        {/* HERO */}
        <div className="about-hero">
            <div className="about-overlay"></div>

            <div className="about-hero-content">
            <h1>About Us</h1>

            <h3>Every cup has a story.</h3>

            <p>
                We're more than just a coffee shop.
                We're a community built on passion,
                quality, and meaningful connections.
            </p>

            <button>Visit Us Today</button>
            </div>
        </div>

        {/* STORY SECTION */}
        <div className="story-container">
            <div className="story-image">
            <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop"
                alt="Coffee Shop"
            />
            </div>

            <div className="story-content">
            <span>OUR STORY</span>

            <h2>
                A passion for coffee.
                <br />
                A love for people.
            </h2>

            <p>
                Founded in 2020, our coffee shop
                was born from a simple idea:
                to create a warm space where
                great coffee brings people
                together. We source the finest
                beans, support local artisans,
                and craft every drink with care.
            </p>

            <h4>
                Through coffee, we bring part
                <br />
                of your journey.
            </h4>

            <Link to={'/reviews'} className="reviewWrapBtn">
                <button className="btn reviewBtn">Reviews →</button>
            </Link>
            </div>
        </div>

        {/* PHILOSOPHY */}
        <div className="philosophy-section">
            <h2>Our Philosophy</h2>

            <div className="philosophy-grid">
            <div className="philosophy-card">
                <i className="bi bi-flower1"></i>

                <h3>Ethically Sourced</h3>

                <p>
                We partner with ethical farmers
                and sustainable coffee producers.
                </p>
            </div>

            <div className="philosophy-card">
                <i className="bi bi-cup-hot"></i>

                <h3>Handcrafted Drinks</h3>

                <p>
                Every drink is handcrafted by
                our baristas with precision
                and passion.
                </p>
            </div>

            <div className="philosophy-card">
                <i className="bi bi-people"></i>

                <h3>Community Focused</h3>

                <p>
                We believe in creating memorable
                experiences and lasting
                connections.
                </p>
            </div>
            </div>
        </div>

        {/* TEAM */}
            <div className="team-section">
                <h2>Meet the Team</h2>

                <div className="team-grid">
                    {aboutData.map((member) => (
                    <div
                        className="team-card"
                        key={member.id}
                    >
                        <img
                        src={member.image}
                        alt={member.name}
                        />

                        <h3>{member.name}</h3>

                        <p>{member.role}</p>
                    </div>
                    ))}
                </div>
            </div>
        </section>

        <Footer />
    </div>
    );
}

export default About;