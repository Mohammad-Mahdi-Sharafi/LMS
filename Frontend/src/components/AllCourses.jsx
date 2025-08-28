import {Link} from "react-router-dom";

function AllCourses() {
    return (
        <div className="container mt-3">
            <h3 className="pb-1 mb-4 mt-5">تمام دوره ها</h3>
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

export default AllCourses;
