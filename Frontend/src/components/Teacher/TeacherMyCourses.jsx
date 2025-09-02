import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar.jsx";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherMyCourses() {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const teacherId = localStorage.getItem("teacherId");

    useEffect(() => {
        document.title = "Teacher My Courses";
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCourses = () => {
        axios
            .get(`${baseUrl}/teacher-courses/${teacherId}`, {
                headers: { Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf" },
            })
            .then(async (response) => {
                const courses = response.data;

                // 🔹 For each course, fetch detail to get total_enrolled_students + course_rating
                const withDetails = await Promise.all(
                    courses.map(async (course) => {
                        try {
                            const detailRes = await axios.get(
                                `${baseUrl}/teacher-course-detail/${course.id}`,
                                { headers: { Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf" } }
                            );

                            return {
                                ...course,
                                total_enrolled_students: detailRes.data?.total_enrolled_students ?? 0,
                                // 👇 Use the same field your CourseDetail uses
                                course_rating:
                                    detailRes.data?.course_rating !== null &&
                                    detailRes.data?.course_rating !== undefined
                                        ? Number(detailRes.data.course_rating)
                                        : null,
                            };
                        } catch (err) {
                            console.error("Error fetching details for course", course.id, err);
                            return { ...course, total_enrolled_students: 0, course_rating: null };
                        }
                    })
                );

                setCourseData(withDetails);
                setTotalResult(withDetails.length);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
            });
    };

    const handleDelete = (courseId) => {
        if (!window.confirm("آیا مطمئن هستید که می‌خواهید این دوره را حذف کنید؟")) return;

        axios
            .delete(`${baseUrl}/course/${courseId}/`, {
                headers: { Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf" },
            })
            .then(() => {
                setCourseData((prevData) => prevData.filter((c) => c.id !== courseId));
                setTotalResult((prev) => prev - 1);
            })
            .catch((error) => {
                console.error("Error deleting course:", error);
            });
    };

    // Helper: display rating as "⭐ 4.2/5" or "—"
    const renderRating = (value) => {
        if (value === null || value === undefined || Number.isNaN(value)) return "—";
        return `⭐ ${Number(value).toFixed(1)}/5`;
        // Optionally you could render star icons instead
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 col-lg-2 mb-4">
                    <TeacherSidebar />
                </aside>

                {/* Courses Section */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">📚 دوره‌های من</h5>
                            <span className="badge bg-primary px-3 py-2 rounded-pill">
                                {totalResult} دوره
                            </span>
                        </div>

                        <div className="card-body p-0">
                            {totalResult === 0 ? (
                                <div className="text-center text-muted py-4">
                                    هیچ دوره‌ای برای شما وجود ندارد.
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">📷 تصویر</th>
                                                <th scope="col">🎓 عنوان</th>
                                                <th scope="col">👨‍🏫 مدرس</th>
                                                <th scope="col">👥 ثبت‌نامی‌ها</th>
                                                <th scope="col">⭐ امتیاز</th>
                                                <th scope="col">⚙️ مدیریت</th>
                                                <th scope="col">❌ حذف</th>
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
                                                            style={{ height: "70px", objectFit: "cover" }}
                                                        />
                                                    </td>
                                                    <td className="fw-semibold">
                                                        <Link to={`/detail/${course.id}`} className="text-decoration-none">
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
                                                    <td className="fw-semibold">
                                                        <Link
                                                            to={`/teacher-enrolled-students/${course.id}`}
                                                            className="text-decoration-none fw-medium"
                                                        >
                                                            {course.total_enrolled_students ?? 0}
                                                        </Link>
                                                    </td>
                                                    <td className="fw-semibold">
                                                        {renderRating(course.course_rating)}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-wrap gap-2">
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() =>
                                                                    navigate(`/teacher-add-chapters/${course.id}`)
                                                                }
                                                            >
                                                                ➕ فصل
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-secondary"
                                                                onClick={() =>
                                                                    navigate(`/teacher-all-chapters/${course.id}`)
                                                                }
                                                            >
                                                                ✏️ فصل‌ها
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-dark"
                                                                onClick={() =>
                                                                    navigate(`/teacher-edit-course/${course.id}`)
                                                                }
                                                            >
                                                                ⚙️ ویرایش
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDelete(course.id)}
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

export default TeacherMyCourses;
