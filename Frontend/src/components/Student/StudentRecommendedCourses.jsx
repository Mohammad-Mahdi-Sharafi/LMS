import { Link } from "react-router-dom";
import StudentSidebar from "./StudentSidebar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentRecommendedCourses() {
    const [courseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        document.title = "Student Recommended Courses";
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios
            .get(`${baseUrl}/fetch-recommended-courses/${studentId}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setCourseData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching recommended courses:", error);
            });
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 col-lg-2 mb-4">
                    <StudentSidebar />
                </aside>

                {/* Courses Section */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">✨ دوره‌های پیشنهادی</h5>
                            <span className="badge bg-success px-3 py-2 rounded-pill">
                                {courseData.length} دوره
                            </span>
                        </div>

                        <div className="card-body p-0">
                            {courseData.length === 0 ? (
                                <div className="text-center text-muted py-5">
                                    <h5>دوره پیشنهادی‌ای برای شما یافت نشد.</h5>
                                    <p className="mb-3">
                                        بر اساس علاقه‌مندی‌های شما به‌زودی پیشنهادهایی نمایش داده خواهد شد.
                                    </p>
                                    <Link
                                        to="/course-list"
                                        className="btn btn-outline-success"
                                    >
                                        مشاهده همه دوره‌ها
                                    </Link>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>📷 تصویر</th>
                                                <th>🎓 عنوان</th>
                                                <th>👨‍🏫 مدرس</th>
                                                <th>📂 تکنولوژی‌ها</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courseData.map((course) => (
                                                <tr key={course.id}>
                                                    <td style={{ width: "120px" }}>
                                                        <img
                                                            src={course.featured_image}
                                                            alt={course.title}
                                                            className="img-fluid rounded shadow-sm"
                                                            style={{
                                                                height: "70px",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    </td>
                                                    <td className="fw-semibold">
                                                        <Link
                                                            to={`/detail/${course.id}`}
                                                            className="text-decoration-none"
                                                        >
                                                            {course.title}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/teacher-detail/${course.teacher.id}`}
                                                            className="text-decoration-none fw-medium"
                                                        >
                                                            {course.teacher.full_name}
                                                        </Link>
                                                    </td>
                                                    <td>{course.technologies ?? "—"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default StudentRecommendedCourses;
