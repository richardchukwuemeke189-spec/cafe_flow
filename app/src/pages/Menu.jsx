import "../styles/menu.css";
import { useState, useEffect } from "react";
import menuData from "../data/menuData";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";

const categories = [
  "All",
  "Espresso Bar",
  "Pastries",
  "Cakes",
];

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMenu = activeCategory === "All"
    ? menuData
    : menuData.filter(
      (item) => item.category === activeCategory
  );

  

  return (
    <div>
      <section className="menu-section">
        {/* HERO */}
        <div className="menu-hero">
          <div className="overlay"></div>

          <div className="menu-hero-content">
            <h1>Our Menu</h1>

            <p>
              Carefully crafted drinks and dishes
              <br />
              made with the finest ingredients.
            </p>
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="menu-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "active-filter"
                  : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* MENU GRID */}
          <div className="menu-grid">
              {filteredMenu.map((item) => (
                  <div className="menu-card" key={item.id}>
                      <img src={item.image} alt={item.title} />

                      <div className="menu-info">
                      <div className="menu-top">
                          <h3>{item.title}</h3>
                          <span>{item.price}</span>
                      </div>

                      <p>{item.description}</p>

                      <div className="tags">
                          {item.tags.includes("vegan") && (
                              <small className="vegan">
                                  Vegan
                              </small>
                              )}

                              {item.tags.includes(
                              "house-special"
                              ) && (
                              <small className="special">
                                  House Special
                              </small>
                              )}

                              {item.tags.includes("new") && (
                              <small className="new">
                                  New
                              </small>
                          )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>

        {/* SPECIAL BANNER */}
        <div className="daily-special">
          <div className="special-overlay"></div>

          <div className="special-content">
            <h2>Daily Brew Special</h2>

            <p>
              Ask our barista about today's
              special brew.
            </p>

            <button>See Today's Special</button>
          </div>
        </div>

        <BackToTop />
      </section>

      <Footer />
    </div>
  );
}

export default Menu;