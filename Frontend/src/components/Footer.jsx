function Footer() {
    return (
        <footer className="bg-dark text-light pt-5 mt-5 border-top border-secondary">
            <div className="container">
                {/* Navigation Links */}
                <ul className="nav justify-content-center border-bottom border-secondary pb-3 mb-3">
                    <li className="nav-item">
                        <a href="#" className="nav-link px-3 text-light fw-light">خانه</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-3 text-light fw-light">ویژگی‌ها</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-3 text-light fw-light">قیمت‌گذاری</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-3 text-light fw-light">سوالات متداول</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-3 text-light fw-light">درباره ما</a>
                    </li>
                </ul>

                {/* Brand + Copyright */}
                <p className="text-center text-white-50 mb-0">
                    © 2025 <span className="text-warning fw-semibold">مکتب</span> | تمام حقوق محفوظ است
                </p>
            </div>
        </footer>
    );
}

export default Footer;

