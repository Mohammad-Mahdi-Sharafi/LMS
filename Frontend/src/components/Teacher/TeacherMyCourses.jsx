import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
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
    }, []);

    const fetchCourses = () => {
        axios
            .get(`${baseUrl}/teacher-courses/${teacherId}`, {
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
    };

    const handleDelete = (courseId) => {
        if (!window.confirm("آیا مطمئن هستید که می‌خواهید این دوره را حذف کنید؟")) return;

        axios
            .delete(`${baseUrl}/course/${courseId}/`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then(() => {
                // Remove deleted course from state without reloading
                setCourseData((prevData) => prevData.filter((c) => c.id !== courseId));
                setTotalResult((prev) => prev - 1);
            })
            .catch((error) => {
                console.error("Error deleting course:", error);
            });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">دوره های من</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>نام</th>
                                    <th>سازنده</th>
                                    <th>عکس دوره</th>
                                    <th>مدیریت دوره</th>
                                    <th>وضعیت انتشار</th>
                                </tr>
                                </thead>
                                <tbody>
                                {courseData.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.title}</td>
                                        <td>
                                            <Link to={`/teacher-detail/${course.teacher.id}`}>
                                                {course.teacher.full_name}
                                            </Link>
                                        </td>
                                        <td>
                                            <img
                                                src={course.featured_image}
                                                width="88"
                                                className="rounded"
                                                alt={course.title}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-dark active ms-2"
                                                onClick={() => navigate(`/teacher-add-chapters/${course.id}`)}
                                            >
                                                فصل جدید
                                            </button>
                                            <button
                                                className="btn btn-sm btn-dark active ms-2"
                                                onClick={() => navigate(`/teacher-all-chapters/${course.id}`)}
                                            >
                                                ویرایش فصل
                                            </button>
                                            <button
                                                className="btn btn-sm btn-dark active ms-2"
                                                onClick={() => navigate(`/teacher-edit-course/${course.id}`)}
                                            >
                                                ویرایش دوره
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm active"
                                                onClick={() => handleDelete(course.id)}
                                            >
                                                حذف
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {totalResult === 0 && (
                                <div className="text-center text-muted py-3">
                                    هیچ دوره‌ای برای شما وجود ندارد.
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

