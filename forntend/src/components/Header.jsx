import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            مکتب
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  خانه
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  دوره ها
                </a>
              </li>
<li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  مدرس
                </a>
                <ul className="dropdown-menu">
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
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/teacher-dashboard">
                      داشبورد
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/teacher-login">
                      خروج
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  درباره ما
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  دانشجو
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/user-login">
                      ورود
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user-register">
                      ثبت نام
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user-dashboard">
                      داشبورد
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user-login">
                      خروج
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="جستجو"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                جستجو
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
