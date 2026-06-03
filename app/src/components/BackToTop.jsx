import "../styles/backToTop.css";
import { useState, useEffect } from "react";

function BackToTop(){

    const [showTopBtn, setShowTopBtn] = useState(false);
    
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowTopBtn(true);
        } else {
          setShowTopBtn(false);
        }
      };
    
      window.addEventListener(
        "scroll",
        handleScroll
      );
    
      return () =>
        window.removeEventListener(
          "scroll",
          handleScroll
        );
    }, []);
    
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    return(
        <>
            <div>
                {/* BACK TO TOP */}
                {showTopBtn && (
                <button
                    className="back-to-top"
                    onClick={scrollToTop}
                >
                    <i className="bi bi-arrow-up"></i>
                </button>
                )}
            </div>
        </>
    )
}

export default BackToTop