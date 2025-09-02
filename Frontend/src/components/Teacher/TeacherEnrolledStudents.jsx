import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar.jsx";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherEnrolledStudents() {
    const {course_id} = useParams();
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        document.title = "Teacher Enrolled Students";
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        axios
            .get(`${baseUrl}/fetch-enrolled-students/${course_id}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setStudentData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 col-lg-2 mb-4">
                    <TeacherSidebar/>
                </aside>

                {/* Students Section */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">👨‍🎓 دانشجویان ثبت‌نام‌شده</h5>
                            <span className="badge bg-primary px-3 py-2 rounded-pill">
                                {studentData.length} نفر
                            </span>
                        </div>

                        <div className="card-body p-0">
                            {studentData.length === 0 ? (
                                <div className="text-center text-muted py-4">
                                    هیچ دانشجویی در این دوره ثبت‌نام نکرده است.
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                        <tr>
                                            <th scope="col">نام</th>
                                            <th scope="col">ایمیل</th>
                                            <th scope="col">نام کاربری</th>
                                            <th scope="col">علاقه مندی ها</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {studentData.map((row, index) => (
                                            <tr key={row.student.id}>
                                                <td>{row.student.full_name}</td>
                                                <td>{row.student.email}</td>
                                                <td>{row.student.user_name}</td>
                                                <td>{row.student.interested_categories}</td>
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

export default TeacherEnrolledStudents;
