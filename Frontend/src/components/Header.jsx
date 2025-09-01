import { Link } from "react-router-dom";

function Header() {
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4 text-warning" to="/">
          مکتب
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">

            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">خانه</Link>
            </li>

            {/* Courses */}
            <li className="nav-item">
              <Link className="nav-link px-3" to="/all-courses">دوره‌ها</Link>
            </li>

            {/* Teacher Menu */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle px-3"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                مدرس
              </span>
              <ul className="dropdown-menu dropdown-menu-dark shadow">
                {teacherLoginStatus !== "true" && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/teacher-login">
                        ورود
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/teacher-register">
                        ثبت نام
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                <li>
                  <Link className="dropdown-item" to="/teacher-dashboard">داشبورد</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/teacher-logout">خروج</Link>
                </li>
              </ul>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">درباره ما</Link>
            </li>

            {/* Student Menu */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle px-3"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                دانشجو
              </span>
              <ul className="dropdown-menu dropdown-menu-dark shadow">
                {studentLoginStatus !== "true" && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/student-login">
                        ورود
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/student-register">
                        ثبت نام
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                <li>
                  <Link className="dropdown-item" to="/student-dashboard">داشبورد</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/student-logout">خروج</Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex ms-lg-3 mt-3 mt-lg-0">
            <input
              className="form-control form-control-sm bg-light border-0 rounded-pill px-3 me-2"
              type="search"
              placeholder="جستجو..."
              aria-label="Search"
            />
            <button className="btn btn-sm btn-warning rounded-pill px-3" type="submit">
              جستجو
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;

