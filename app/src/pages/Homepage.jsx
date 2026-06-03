import React from "react";
import "../styles/home.css";
import info_card from "../data/infoCard.js";
import menuData from "../data/menuData.js";
import { Link } from "react-router-dom";
import galleryData from "../data/galleryData.js";
import Footer from "../components/Footer.jsx";

function Homepage(){

    const featuredItems = menuData.slice(0, 3);
    const featuredGallery = galleryData.slice(0, 4);

    return(
        <>
            <section>
                <div className="hero">
                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <h1>
                    Good Coffee.
                    <br />
                    Great Moments.
                    </h1>

                    <p>
                    A cozy neighborhood coffee shop serving
                    <br />
                    quality coffee, good food, and warm smiles.
                    </p>

                    <div className="hero-buttons">
                        <Link to={'/menu'}>
                            <button className="menu-btn">View Menu</button>
                        </Link>
                        <Link to={'/reservations'}>
                            <button className="outline-btn">Reserve a Table</button>
                        </Link>
                    </div>
                </div>

                {/* info */}
                <div className="info-bar">
                {info_card.map((item, index) => (
                    <React.Fragment key={item.id}>
                    <div className="info-card">
                        <i className={item.icon}></i>

                        <div>
                        <h4>{item.header}</h4>

                        <p>{item.details}</p>

                        {item.linkText && (
                        <a href={item.linkUrl} target="_blank" style={{color:'white', textDecoration:'none', borderBottom:'1px solid #d4a373'}}>
                            {item.linkText}
                        </a>
                        )}
                        </div>
                    </div>

                    {index !== info_card.length - 1 && (
                        <div className="divider"></div>
                    )}
                    </React.Fragment>
                ))}
                </div>
                </div>

                {/* MENU */}
                <div className="featured-menu">
                    <div className="section-title">
                        <h2>Signature Favourites</h2>

                        <p>
                        Handcrafted with care. Made to be remembered.
                        </p>
                    </div>

                    <div className="featured-grid">
                        {featuredItems.map((item) => (
                        <div className="featured-card" key={item.id}>
                            <img src={item.image} alt={item.title} />

                            <div className="featured-content">
                            <div className="featured-top">
                                <h3>{item.title}</h3>

                                <span>{item.price}</span>
                            </div>

                            <p>{item.description}</p>

                            <div className="featured-tags">
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

                    <div className="mt-4 center-btn">
                    <Link to={'/menu'}>
                        <button className="btn viewMenuBtn">View Full Menu →</button>
                    </Link>
                    </div>
                </div>

                {/* GALLERY */}
                {/* MADE FOR MOMENTS */}

                <div className="moments-section">

                    <h2>Made for Moments</h2>

                    <p>
                        Whether it's your morning ritual or an afternoon unwind,
                        <br />
                        we've got the perfect setting for you.
                    </p>

                    <div className="moments-gallery">

                        {featuredGallery.map((item) => (
                        <div
                            className="moment-card"
                            key={item.id}
                        >
                            <img
                            src={item.image}
                            alt={item.category}
                            />
                        </div>
                        ))}

                    </div>

                    <Link to="/gallery">
                        <button className="view-photos-btn">
                        View More Photos →
                        </button>
                    </Link>

                </div>

                <Footer />
            </section>
        </>
  );
}

export default Homepage;