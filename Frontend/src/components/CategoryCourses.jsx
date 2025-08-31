import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function CategoryCourses() {
    const [courseData, setCourseData] = useState([]);
    const {category_slug} = useParams();

    useEffect(() => {
        document.title = "Course Category";
        axios
            .get(`${baseUrl}/course?category=${category_slug}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setCourseData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    return (
        <div className="container mt-3">
            <h3 className="pb-1 mb-4 mt-5">{category_slug}</h3>
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

export default CategoryCourses;
