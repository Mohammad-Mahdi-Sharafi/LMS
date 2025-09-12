import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar.jsx";

const baseUrl = "http://127.0.0.1:8000/api";
const TOKEN = "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf";

function isObject(val) {
    return val !== null && typeof val === "object" && !Array.isArray(val);
}

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

    async function fetchCourses() {
        try {
            const res = await axios.get(`${baseUrl}/teacher-courses/${teacherId}`, {
                headers: {Authorization: TOKEN},
            });

            // Support either plain array or paginated response { results: [...] }
            const courses = Array.isArray(res.data) ? res.data : res.data?.results ?? [];

            console.log("teacher-courses list response:", courses);

            // For each course fetch the detail (but keep teacher from list when present)
            const withDetails = await Promise.all(
                courses.map(async (course) => {
                    // keep the teacher object from list if it's an object
                    const teacherFromList = isObject(course.teacher) ? course.teacher : null;

                    try {
                        const detailRes = await axios.get(`${baseUrl}/teacher-course-detail/${course.id}`, {
                            headers: {Authorization: TOKEN},
                        });

                        console.log(`detail for course ${course.id}:`, detailRes.data);

                        // prefer teacherFromList (if it exists). Otherwise use teacher from detail if it is an object.
                        let teacherObj = teacherFromList;
                        if (!teacherObj) {
                            if (detailRes.data && isObject(detailRes.data.teacher)) {
                                teacherObj = detailRes.data.teacher;
                            } else {
                                // fallback: try to coerce teacher id into object so UI can still read id/full_name safely
                                const teacherIdOnly = detailRes.data?.teacher ?? course.teacher;
                                teacherObj = teacherIdOnly
                                    ? {id: teacherIdOnly, full_name: null}
                                    : null;
                            }
                        }

                        const merged = {
                            ...course, // keep original list fields (including featured_image, title, teacher object if present)
                            teacher: teacherObj,
                            total_enrolled_students: detailRes.data?.total_enrolled_students ?? 0,
                            course_rating:
                                detailRes.data?.course_rating !== null &&
                                detailRes.data?.course_rating !== undefined
                                    ? Number(detailRes.data.course_rating)
                                    : null,
                        };

                        console.log("merged course:", merged);
                        return merged;
                    } catch (err) {
                        console.error("detail fetch error for course", course.id, err?.response?.data ?? err.message);
                        // if detail fails, still return the list item but ensure teacher remains from list
                        return {
                            ...course,
                            teacher: teacherFromList ?? (isObject(course.teacher) ? course.teacher : null),
                            total_enrolled_students: 0,
                            course_rating: null,
                        };
                    }
                })
            );

            console.log("final merged course list:", withDetails);

            setCourseData(withDetails);
            setTotalResult(withDetails.length);
        } catch (err) {
            console.error("Error fetching teacher-courses:", err?.response?.data ?? err.message);
            Swal.fire({icon: "error", title: "خطا", text: "خطا در بارگذاری دوره‌ها"});
        }
    }

    const handleDelete = (courseId) => {
        Swal.fire({
            title: "حذف دوره",
            text: "آیا مطمئن هستید که می‌خواهید این دوره را حذف کنید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "بله، حذف شود",
            cancelButtonText: "لغو",
        }).then(async (result) => {
            if (!result.isConfirmed) return;
            try {
                await axios.delete(`${baseUrl}/teacher-course-detail/${courseId}`, {
                    headers: {Authorization: TOKEN},
                });
                setCourseData((prev) => prev.filter((c) => c.id !== courseId));
                setTotalResult((prev) => prev - 1);
                Swal.fire({icon: "success", title: "حذف شد!", text: "دوره با موفقیت حذف شد."});
            } catch (err) {
                console.error("Error deleting course:", err?.response?.data ?? err.message);
                Swal.fire({icon: "error", title: "خطا", text: "حذف دوره انجام نشد"});
            }
        });
    };

    const renderRating = (value) => {
        if (value === null || value === undefined || Number.isNaN(value)) return "—";
        return `⭐ ${Number(value).toFixed(1)}/5`;
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <aside className="col-md-3 col-lg-2 mb-4">
                    <TeacherSidebar/>
                </aside>

                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div
                            className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">📚 دوره‌های من</h5>
                            <span className="badge bg-primary px-3 py-2 rounded-pill">{totalResult} دوره</span>
                        </div>

                        <div className="card-body p-0">
                            {totalResult === 0 ? (
                                <div className="text-center text-muted py-4">هیچ دوره‌ای برای شما وجود ندارد.</div>
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
                                                <td style={{width: "120px"}}>
                                                    <img
                                                        src={course.featured_image}
                                                        alt={course.title}
                                                        className="img-fluid rounded shadow-sm"
                                                        style={{height: "70px", objectFit: "cover"}}
                                                    />
                                                </td>

                                                <td className="fw-semibold">
                                                    <Link to={`/detail/${course.id}`} className="text-decoration-none">
                                                        {course.title}
                                                    </Link>
                                                </td>

                                                <td>
                                                    {course.teacher && course.teacher.full_name ? (
                                                        <Link to={`/teacher-detail/${course.teacher.id}`}
                                                              className="text-decoration-none fw-medium">
                                                            {course.teacher.full_name}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-muted">—</span>
                                                    )}
                                                </td>

                                                <td className="fw-semibold">
                                                    <Link to={`/teacher-enrolled-students/${course.id}`}
                                                          className="text-decoration-none fw-medium">
                                                        {course.total_enrolled_students ?? 0}
                                                    </Link>
                                                </td>

                                                <td className="fw-semibold">{renderRating(course.course_rating)}</td>

                                                <td>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        <button className="btn btn-sm btn-outline-primary"
                                                                onClick={() => navigate(`/teacher-add-chapters/${course.id}`)}>➕
                                                            فصل
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-secondary"
                                                                onClick={() => navigate(`/teacher-all-chapters/${course.id}`)}>✏️
                                                            فصل‌ها
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-dark"
                                                                onClick={() => navigate(`/teacher-edit-course/${course.id}`)}>⚙️
                                                            ویرایش
                                                        </button>
                                                    </div>
                                                </td>

                                                <td>
                                                    <button className="btn btn-sm btn-danger"
                                                            onClick={() => handleDelete(course.id)}>🗑️
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
