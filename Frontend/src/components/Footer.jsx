import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-dark text-light pt-4 mt-5 border-top border-secondary">
            <div className="container">
                {/* Navigation Links */}
                <ul className="nav justify-content-center border-bottom border-secondary pb-3 mb-3">
                    <li className="nav-item">
                        <Link to="/" className="nav-link px-3 text-light fw-light">
                            خانه
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link px-3 text-light fw-light">
                            تماس با ما
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/faq" className="nav-link px-3 text-light fw-light">
                            سوالات متداول
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link px-3 text-light fw-light">
                            درباره ما
                        </Link>
                    </li>
                </ul>

                {/* Brand + Copyright */}
                <div className="text-center">
                    <p className="text-white-50 mb-2">
                        © {new Date().getFullYear()}{" "}
                        <span className="text-warning fw-semibold">مکتب</span> | همه حقوق محفوظ است
                    </p>

                    {/* Social Icons */}
                    <div className="d-flex justify-content-center gap-3">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-white-50"
                        >
                            <i className="bi bi-github fs-5"></i>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-white-50"
                        >
                            <i className="bi bi-linkedin fs-5"></i>
                        </a>
                        <a
                            href="mailto:mohammad.mahdi.sharafi@Znu.ac.ir"
                            className="text-white-50"
                        >
                            <i className="bi bi-envelope fs-5"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
