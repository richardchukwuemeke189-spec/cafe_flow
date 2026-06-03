import { useState } from "react";
import "../styles/gallery.css";
import galleryData from "../data/galleryData";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const filters = [
  "All",
  "Interior",
  "Coffee",
  "Food",
  "Workspace",
  "Events",
];

function Gallery() {
  const [activeFilter, setActiveFilter] =
    useState("All");

  const filteredImages =
    activeFilter === "All"
      ? galleryData
      : galleryData.filter(
          (item) =>
            item.category === activeFilter
        );

  return (
    <div>
      <section className="gallery-section">
        {/* HERO */}
        <div className="gallery-hero">
          <div className="gallery-overlay"></div>

          <div className="gallery-hero-content">
            <h1>Gallery</h1>

            <p>
              A glimpse of our space,
              <br />
              our coffee, and our moments.
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="gallery-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "active-filter"
                  : ""
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="gallery-grid">
          {filteredImages.map((item) => (
            <div
              className="gallery-card"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.category}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="gallery-cta">
          <div className="cta-left">
            <i className="bi bi-geo-alt"></i>

            <div>
              <h2>Love what you see?</h2>

              <p>
                Come experience it in person.
              </p>
            </div>
          </div>

          <Link to={'/reservations'}>
          <button>Reserve a Table</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Gallery;