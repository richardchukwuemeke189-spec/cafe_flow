import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar(){

    return(
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">CafeFlow</a>

                    <button
                        className="navbar-toggler custom-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className="collapse navbar-collapse mobile-drawer" id="navbarSupportedContent">
                        <div className="drawer-top">
                        <h2 className="drawer-title">
                            Menu
                        </h2>

                        <button
                            className="close-drawer"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-label="Close menu"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                        <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                            <Link className="reLink" to={'/'}>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page">Home</a>
                                </li>
                            </Link>
                            
                            <Link className="reLink" to={'/menu'}>
                                <li className="nav-item">
                                    <a className="nav-link">Menu</a>
                                </li>
                            </Link>

                            <Link className="reLink" to={'/reservations'}>
                                <li className="nav-item">
                                    <a className="nav-link">Reservation</a>
                                </li>
                            </Link>

                            <Link className="reLink" to={'/about'}>
                                <li className="nav-item">
                                    <a className="nav-link">About</a>
                                </li>
                            </Link>

                            <Link className="reLink" to={'/gallery'}>
                                <li className="nav-item">
                                    <a className="nav-link">Gallery</a>
                                </li>
                            </Link>
                        </ul>
                        <form className="btn">
                            <Link to={'/contact'}>
                                <button className="btn contact-nav-btn" type="submit">Contact</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;