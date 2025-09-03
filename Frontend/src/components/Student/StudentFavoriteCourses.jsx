import { Link } from "react-router-dom";
import StudentSidebar from "./StudentSidebar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentFavoriteCourses() {
    const [courseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        document.title = "Student Favorite Courses";
        axios
            .get(`${baseUrl}/fetch-favorite-course/${studentId}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setCourseData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching favorite courses:", error);
            });
    }, [studentId]);

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 col-lg-2 mb-4">
                    <StudentSidebar />
                </aside>

                {/* Main Section */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">❤️ دوره‌های محبوب من</h5>
                            <span className="badge bg-danger px-3 py-2 rounded-pill">
                                {courseData.length} دوره
                            </span>
                        </div>

                        <div className="card-body p-0">
                            {courseData.length === 0 ? (
                                <div className="text-center text-muted py-5">
                                    <h5>هنوز دوره‌ای به علاقه‌مندی‌ها اضافه نکرده‌اید.</h5>
                                    <p className="mb-3">می‌توانید از لیست دوره‌ها دوره‌ای را به علاقه‌مندی اضافه کنید.</p>
                                    <Link to="/course-list" className="btn btn-outline-danger">
                                        مشاهده دوره‌ها
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
                                                <th>📂 دسته‌بندی</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courseData.map((row, index) => (
                                                <tr key={index}>
                                                    <td style={{ width: "120px" }}>
                                                        <img
                                                            src={row.course.featured_image}
                                                            alt={row.course.title}
                                                            className="img-fluid rounded shadow-sm"
                                                            style={{ height: "70px", objectFit: "cover" }}
                                                        />
                                                    </td>
                                                    <td className="fw-semibold">
                                                        <Link
                                                            to={`/detail/${row.course.id}`}
                                                            className="text-decoration-none"
                                                        >
                                                            {row.course.title}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/teacher-detail/${row.course.teacher.id}`}
                                                            className="text-decoration-none fw-medium"
                                                        >
                                                            {row.course.teacher.full_name}
                                                        </Link>
                                                    </td>
                                                    <td>{row.course.category?.title ?? "—"}</td>
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

export default StudentFavoriteCourses;
