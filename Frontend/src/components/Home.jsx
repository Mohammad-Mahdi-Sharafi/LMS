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
        <>
            {/* Start latest courses */}
            <div className="container mt-4">
                <h3 className="pb-1 mb-4">
                    جدید ترین دوره ها
                    <Link to="all-courses" className="float-start">
                        ادامه
                    </Link>
                </h3>
                {/* latest courses */}
                <div className="row mb-4">
                    {courseData.map((course) => (
                        <div className="col-md-3 mb-4" key={course.id}>
                            <div className="card">
                                <Link to={`/detail/${course.id}`}>
                                    <img
                                        src={course.featured_image || "/vite.svg"}
                                        className="card-img-top"
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            // objectFit: "cover",
                                        }}
                                        alt={course.title || "Course image"}
                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/detail/${course.id}`}>{course.title}</Link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* End latest courses */}
                {/* Popular teachers */}
                <h3 className="pb-1 mb-4 mt-5">
                    مدرسان برتر
                    <Link to="/popular-teachers" className="float-start">
                        ادامه
                    </Link>
                </h3>
                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="card">
                            <a href="#">
                                <img src="../../public/vite.svg" className="card-img-top" alt="..."/>
                            </a>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href="#">نام مدرس</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a href="#">
                                <img src="../../public/vite.svg" className="card-img-top" alt="..."/>
                            </a>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href="#">نام مدرس</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a href="#">
                                <img src="../../public/vite.svg" className="card-img-top" alt="..."/>
                            </a>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href="#">نام مدرس</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a href="#">
                                <img src="../../public/vite.svg" className="card-img-top" alt="..."/>
                            </a>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href="#">نام مدرس</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Popular teachers */}
                {/* Student testimonial */}
                <h3 className="pd-1 mb-4 mt-5">دیدگاه های دانشجویان</h3>
                <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* End Student testimonial*/}
            </div>
        </>
    );
}

export default Home;
