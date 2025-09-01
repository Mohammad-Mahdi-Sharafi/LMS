import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";


function CourseCard({id, title, featured_image}) {
    return (
        <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 rounded-3 h-100">
                <Link to={`/detail/${id}`}>
                    <img
                        src={featured_image || "/vite.svg"}
                        className="card-img-top rounded-top"
                        style={{width: "100%", height: "200px", objectFit: "cover"}}
                        alt={title || "Course image"}
                    />
                </Link>
                <div className="card-body text-center">
                    <h5 className="card-title">
                        <Link to={`/detail/${id}`} className="text-decoration-none text-dark">
                            {title || "بدون عنوان"}
                        </Link>
                    </h5>
                </div>
            </div>
        </div>
    );
}

function AllCourses() {
    const [courseData, setCourseData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);

    useEffect(() => {
        document.title = "تمام دوره‌ها | LMS";
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${baseUrl}/course`, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                });
                setCourseData(response.data);
                setTotalResult(response.data.length);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">تمام دوره‌ها</h3>
                <span className="text-muted">تعداد: {totalResult}</span>
            </div>

            <div className="row">
                {courseData.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        featured_image={course.featured_image}
                    />
                ))}
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation example" className="mt-4">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" href="#">قبلی</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">بعدی</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AllCourses;


