import {Link} from "react-router-dom";
import {useEffect} from "react";

function Home() {
    useEffect(() => {
        document.title = "LMS | Home Page"
    })
    return (
        <>
            <div className="container mt-4">
                <h3 className="pb-1 mb-4">
                    جدید ترین دوره ها
                    <Link to="all-courses" className="float-start">
                        ادامه
                    </Link>
                </h3>
                {/* latest courses */}
                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="card">
                            <Link to="/detail/1">
                                <img src="../../public/vite.svg" className="card-img-top" alt="..."/>
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to="/detail/1">عنوان دوره</Link>
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
                                    <a href="#">عنوان دوره</a>
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
                                    <a href="#">عنوان دوره</a>
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
                                    <a href="#">عنوان دوره</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End latest courses*/}
                {/* popular courses */}
                <h3 className="pb-1 mb-4 mt-5">
                    محبوب ترین دوره ها
                    <Link to="/popular-courses" className="float-start">
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
                                    <a href="#">عنوان دوره</a>
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
                                    <a href="#">عنوان دوره</a>
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
                                    <a href="#">عنوان دوره</a>
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
                                    <a href="#">عنوان دوره</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End popular courses */}
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
