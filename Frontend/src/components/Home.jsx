import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function Home() {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);

    useEffect(() => {
        document.title = "LMS | Home Page";
        axios
            .get(`${baseUrl}/course?result=4`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setCourseData(response.data);
                setTotalResult(response.data.length);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            {/* --- Latest Courses --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark">جدیدترین دوره‌ها</h3>
                <Link to="/all-courses" className="btn btn-sm btn-outline-warning">
                    مشاهده همه
                </Link>
            </div>
            <div className="row">
                {courseData.map((course) => (
                    <div className="col-md-3 mb-4" key={course.id}>
                        <div className="card border-0 shadow-sm rounded-3 h-100">
                            <Link to={`/detail/${course.id}`}>
                                <img
                                    src={course.featured_image || "/vite.svg"}
                                    className="card-img-top rounded-top-3"
                                    style={{height: "200px", objectFit: "cover"}}
                                    alt={course.title || "Course"}
                                />
                            </Link>
                            <div className="card-body">
                                <h6 className="card-title text-truncate">
                                    <Link to={`/detail/${course.id}`}
                                          className="text-decoration-none text-dark fw-semibold">
                                        {course.title}
                                    </Link>
                                </h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Popular Teachers --- */}
            <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                <h3 className="fw-bold text-dark">مدرسان برتر</h3>
                <Link to="/popular-teachers" className="btn btn-sm btn-outline-warning">
                    مشاهده همه
                </Link>
            </div>
            <div className="row">
                {[1, 2, 3, 4].map((n) => (
                    <div className="col-md-3 mb-4" key={n}>
                        <div className="card border-0 shadow-sm rounded-3 h-100">
                            <a href="#">
                                <img
                                    src="/vite.svg"
                                    className="card-img-top rounded-top-3"
                                    style={{height: "200px", objectFit: "cover"}}
                                    alt="Teacher"
                                />
                            </a>
                            <div className="card-body text-center">
                                <h6 className="fw-semibold">
                                    <a href="#" className="text-decoration-none text-dark">
                                        نام مدرس
                                    </a>
                                </h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Student Testimonials --- */}
            <h3 className="fw-bold text-dark mt-5 mb-4">دیدگاه‌های دانشجویان</h3>
            <div id="carouselExampleIndicators" className="carousel slide shadow rounded-3 overflow-hidden">
                <div className="carousel-inner bg-dark text-white py-5">
                    {[1, 2, 3].map((n, i) => (
                        <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={n}>
                            <figure className="text-center px-5">
                                <blockquote className="blockquote">
                                    <p className="fs-5">یک نظر نمونه از دانشجوی دوره...</p>
                                </blockquote>
                                <figcaption className="blockquote-footer text-white-50">
                                    دانشجو شماره {n} در <cite title="Source Title">دوره نمونه</cite>
                                </figcaption>
                            </figure>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">قبلی</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">بعدی</span>
                </button>
            </div>
        </div>
    );
}

export default Home;

