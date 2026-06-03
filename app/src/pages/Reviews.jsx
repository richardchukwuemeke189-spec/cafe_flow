import { useState, useEffect } from "react";
import "../styles/reviews.css";
import Footer from "../components/Footer";

import reviewData from "../data/reviewData";

function Reviews() {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const testimonials =
    reviewData.testimonials;

  /* AUTO SLIDE */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1
          ? 0
          : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? testimonials.length - 1
        : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1
        ? 0
        : prev + 1
    );
  };

  return (
    <div>
      <section className="reviews-section">
        {/* HERO */}
        <div className="reviews-hero">
          <div className="reviews-overlay"></div>

          <div className="reviews-content">
            <h1>What Our Guests Say</h1>

            <p>
              Real people. Real experiences.
            </p>
          </div>
        </div>

        {/* TESTIMONIAL SLIDER */}
        <div className="testimonial-wrapper">
          <button
            className="slider-btn"
            onClick={prevSlide}
          >
            <i className="bi bi-arrow-left-short"></i>
          </button>

          <div className="testimonial-card">
            <i className="bi bi-quote"></i>

            <p style={{color:'black', fontWeight:'600'}}>
              {
                testimonials[currentIndex]
                  .review
              }
            </p>

            <h4>
              —{" "}
              {
                testimonials[currentIndex]
                  .name
              }
            </h4>

            <div className="dots">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={
                    index === currentIndex
                      ? "active-dot"
                      : ""
                  }
                ></span>
              ))}
            </div>
          </div>

          <button
            className="slider-btn"
            onClick={nextSlide}
          >
            <i className="bi bi-arrow-right-short"></i>
          </button>
        </div>

        {/* PLATFORM RATINGS */}
        <div className="platform-grid">
          {reviewData.platforms.map(
            (platform) => (
              <div
                className="platform-card"
                key={platform.id}
              >
                <div className="platform-top">
                  <i
                    className={platform.logo}
                    style={{
                      color: platform.color,
                    }}
                  ></i>

                  <h3 style={{color:'black'}}>
                    {platform.platform}
                  </h3>
                </div>

                <div className="rating">
                  <h2 style={{color:'black'}}>{platform.rating}</h2>

                  <div className="stars">
                    ★★★★★
                  </div>
                </div>

                <p style={{color:'#1f1f1f'}}>
                  Based on{" "}
                  {platform.reviews} reviews
                </p>

                <button>
                  Read all reviews →
                </button>
              </div>
            )
          )}
        </div>

        {/* SMALL REVIEWS */}
        <div className="small-reviews">
          {testimonials
            .slice(1)
            .map((item) => (
              <div
                className="small-review-card"
                key={item.id}
              >
                <div className="review-user">
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <h4 style={{color:'black'}}>{item.name}</h4>

                    <div className="stars">
                      ★★★★★
                    </div>
                  </div>
                </div>

                <p>{item.review}</p>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Reviews;