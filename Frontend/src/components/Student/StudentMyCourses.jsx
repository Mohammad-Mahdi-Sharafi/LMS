import { Link } from "react-router-dom";
import StudentSidebar from "./StudentSidebar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentMyCourses() {
    const [courseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        document.title = "Student MyCourses";
        fetchCourses();

    }, []);

    const fetchCourses = () => {
        axios
            .get(`${baseUrl}/fetch-enrolled-courses/${studentId}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setCourseData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching enrolled courses:", error);
            });
    };

    const handleUnenroll = (enrollId) => {
        Swal.fire({
            title: "آیا مطمئن هستید؟",
            text: "با حذف، دسترسی شما به این دوره لغو می‌شود.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "بله، حذف کن",
            cancelButtonText: "انصراف",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${baseUrl}/student-unenroll/${enrollId}/`, {
                        headers: {
                            Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                        },
                    })
                    .then(() => {
                        setCourseData((prev) =>
                            prev.filter((c) => c.id !== enrollId)
                        );
                        Swal.fire("حذف شد!", "دوره از لیست شما حذف شد.", "success");
                    })
                    .catch((error) => {
                        console.error("Error unenrolling course:", error);
                        Swal.fire("خطا", "مشکلی در حذف دوره رخ داد.", "error");
                    });
            }
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
                            <h5 className="mb-0 fw-bold">📚 دوره‌های من</h5>
                            <span className="badge bg-success px-3 py-2 rounded-pill">
                                {courseData.length} دوره
                            </span>
                        </div>

                        <div className="card-body p-0">
                            {courseData.length === 0 ? (
                                <div className="text-center text-muted py-5">
                                    <h5>هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید.</h5>
                                    <p className="mb-3">
                                        از بخش دوره‌ها می‌توانید یادگیری خود را شروع کنید!
                                    </p>
                                    <Link
                                        to="/course-list"
                                        className="btn btn-outline-success"
                                    >
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
                                                <th>⏰ تاریخ ثبت‌نام</th>
                                                <th>❌ حذف</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courseData.map((row) => (
                                                <tr key={row.id}>
                                                    <td style={{ width: "120px" }}>
                                                        <img
                                                            src={row.course.featured_image}
                                                            alt={row.course.title}
                                                            className="img-fluid rounded shadow-sm"
                                                            style={{
                                                                height: "70px",
                                                                objectFit: "cover",
                                                            }}
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
                                                            className="text-decoration-none"
                                                        >
                                                            {row.course.teacher.full_name}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {row.course.category?.title ?? "—"}
                                                    </td>
                                                    <td>
                                                      {new Date(row.enrolled_time)
                                                        .toLocaleDateString("fa-IR", {
                                                          year: "numeric",
                                                          month: "2-digit",
                                                          day: "2-digit",
                                                        })
                                                        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))}
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                handleUnenroll(row.id)
                                                            }
                                                        >
                                                            🗑️
                                                        </button>
                                                    </td>
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

export default StudentMyCourses;
