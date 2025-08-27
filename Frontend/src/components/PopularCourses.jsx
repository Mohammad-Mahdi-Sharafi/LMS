import { Link } from "react-router-dom";
import {useEffect} from "react";

function PopularlCourses() {
        useEffect(() => {
        document.title = "Popular Courses"
    })
  return (
    <div className="container mt-3">
      <h3 className="pb-1 mb-4 mt-5">محبوب ترین دوره ها</h3>
      <div className="row mb-4">
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">عنوان دوره</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
                <span className="float-end">Views: 7555</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">عنوان دوره</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
                <span className="float-end">Views: 7555</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">عنوان دوره</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
                <span className="float-end">Views: 7555</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">عنوان دوره</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
                <span className="float-end">Views: 7555</span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">عنوان دوره</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
                <span className="float-end">Views: 7555</span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">عنوان دوره</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
                <span className="float-end">Views: 7555</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*pagination start*/}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#">
              بعدی
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              قبلی
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PopularlCourses;
